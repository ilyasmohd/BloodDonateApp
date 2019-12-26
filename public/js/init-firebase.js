const firebaseConfig = {
    apiKey: "AIzaSyASCzZKt9FvwV6PBJZRQa-OCtf8USpLNsg",
    authDomain: "donateblood-donatelife.firebaseapp.com",
    databaseURL: "https://donateblood-donatelife.firebaseio.com",
    projectId: "donateblood-donatelife",
    storageBucket: "donateblood-donatelife.appspot.com",
    messagingSenderId: "417215519552",
    appId: "1:417215519552:web:08cd0e52ac6d5422f378a5",
    measurementId: "G-FTKM58R37X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var donorReferenceID = "0";

function FireBaseSearchDonors(donor) {
    // [START get_all]
    // document.getElementById('searchFormLoading').style.display = 'block';
    $('#searchFormLoading').css('display', 'block');
    $('#unavailableError').css('display', 'none');
    console.log("searching donors....");
    //console.log(donor.donorDetails.State, donor.donorDetails.City, donor.donorDetails.BloodGroup); return;
    let query = db.collection('Donors')
        .where('State', '==', donor.donorDetails.State)
        .where('City', '==', donor.donorDetails.City)
        .where('BloodGroup', '==', donor.donorDetails.BloodGroup);
    let index = 0;
    query.get()
        .then(snapshot => {
            //console.log('total data', snapshot.docs.length);
            if (snapshot.docs.length <= 0) {
                $('#DonorsTable').css('display', 'none');
                $('#noDonorsFound').css('display', 'block');
            } else {
                $('#DonorsTable').css('display', 'block');
                $('#noDonorsFound').css('display', 'none');
                $('#DonorsTable tbody').empty();
                snapshot.forEach(function (doc) {
                    //console.log(doc.id, '=>', doc.data());
                    $('#DonorsTable > tbody:last-child').append(`
                            <tr>
                            <td>${++index}</td>
                            <td>${doc.data().BloodGroup}</td>
                            <td>${doc.data().DonorName}</td>
                            <td>${doc.data().State}, ${doc.data().City}</td>
                            <td>${doc.data().ContactNo}</td>
                            <td>${doc.data().Email}</td>
                            <td>${new Date((doc.data().LastDonatedDate)).toDateString()}</td>
                            <td>Yes</td>
                            </tr>`);
                });
            }
            //document.getElementById('searchFormLoading').style.display = 'none';
            $('#searchFormLoading').css('display', 'none');
        })
        .catch(err => {
            console.log('Error getting documents', err);
            $('#unavailableError').html(err.message);
            $('#unavailableError').css('display', 'block');
            alert(err.message);
        });
}

function FireBaseRegisterDonor(donor) {
    $('#unavailableError').css('display', 'none');
    var donorName = $("#donorName").val();
    var donorContactNo = $("#donorContactNo").val();
    var donorEmail = $("#donorEmail").val();
    // var bloodGroup = $("#bloodGroup").val(); 
    var states = $("#states").val();
    var cities = $("#cities").val();
    var bloodGroup = $("#bloodGroup option:selected").text();
    var donationOn = $("#donationOn").val();
    /*if (donorContactNo.length != 10) {
        alert("Mobile number should be 10 digits");
        return false;
    }*/
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(donorEmail)) {
        alert("Please enter valid email id");
        return false;
    }
    if (states == "--Select State--") {
        alert("Please select any one State");
        return false;
    }
    if (states == "--Select City--") {
        alert("Please select any one City");
        return false;
    }
    if (bloodGroup == "-Select-") {
        alert("Please select any one blood group");
        return false;
    }


    $('#donorContactNo').bind('keyup paste', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    console.log('searching for donor id:', donorReferenceID);
    var docRef = db.collection("Donors").doc(donorReferenceID);
    //var o = {};
    docRef.get().then(function (thisDoc) {
        if (thisDoc.exists) {
            console.log('user exisits, updating now....', donor);
            docRef.update(donor.donorDetails).then(function () {
                alert('You have successfully updated your details');
                window.location = './searchDonors.html';
            })
        } else {
            console.log('created new user');
            //docRef.set(donor.donorDetails);
            db.collection("Donors").add(donor.donorDetails).then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    //alert('You have successfully registerd as donor');
                    window.location = './searchDonors.html';
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    $('#unavailableError').css('display', 'block');
                    $('#unavailableError').html(error.message);
                    alert(error.message);
                });
        }
    }).catch(function (error) {
        console.log(error.message);
        $('#unavailableError').css('display', 'block');
        $('#unavailableError').html(error.message);
        alert(error.message);
    });
}

function CheckDonorExists(donor) {
    console.log("searching donors....");
    document.getElementById('registerFormLoading').style.display = 'block';
    $('#unavailableError').css('display', 'none');
    //console.log(donor.donorDetails.State, donor.donorDetails.City, donor.donorDetails.BloodGroup); return;
    let query = db.collection('Donors');

    if (donor.donorDetails.ContactNo != null) {
        query = query.where('ContactNo', '==', donor.donorDetails.ContactNo);
    }
    if (donor.donorDetails.DonorName != null) {
        query = query.where('DonorName', '==', donor.donorDetails.DonorName);
    }
    if (donor.donorDetails.Email != null) {
        query = query.where('Email', '==', donor.donorDetails.Email);
    }

    let index = 0;
    query.get()
        .then(snapshot => {
            // console.log("searched donors length:", snapshot.docs.length);
            // console.log("searched donors first element:", snapshot.docs[0]);
            if (snapshot.docs.length === 0) {
                PopulateDonorUIDetails(donor.donorDetails.DonorName,
                    null,
                    null,
                    donor.donorDetails.ContactNo,
                    donor.donorDetails.Email,
                    null,
                    null
                );
                document.getElementById('registerFormLoading').style.display = 'none';
            } else {
                snapshot.forEach(function (doc) {
                    console.log("id from firestore", doc.id);
                    donorReferenceID = doc.id;
                    donor.RegisterDonor();
                    //console.log('LastDonatedDate:', doc.data().LastDonatedDate);
                    PopulateDonorUIDetails(doc.data().DonorName.trim(),
                        doc.data().State.trim(),
                        doc.data().City.trim(),
                        doc.data().ContactNo.trim(),
                        doc.data().Email.trim(),
                        doc.data().BloodGroup.trim(),
                        (doc.data().LastDonatedDate)
                    );
                    document.getElementById('registerFormLoading').style.display = 'none';
                });
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
            alert(err.message);
            $('#unavailableError').css('display', 'block');
            $('#unavailableError').html(err.message);
        });
}