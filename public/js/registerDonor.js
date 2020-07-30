$(document).ready(function () {
    if (new URLSearchParams(window.location.search).has('mobileUser') == true) {
        $('.WebUser').css('display', 'none');
        $('.MobileUser').css('display', 'block');
    } else {
        $('.WebUser').css('display', 'block');
        $('.MobileUser').css('display', 'none');
    }
    let stateElement = document.getElementById("states");
    let cityElement = document.getElementById("cities");
    state_arr.forEach((element, index) => {
        stateElement.options[stateElement.options.length] = new Option(element.trim(), index);
    });

    $('#states').on('change', function (value, index) {
        $('#cities').empty();
        let selectedStateCities = city_arr[$('#states :selected').val()].split("|"); //select all the cities of selected state
        selectedStateCities.forEach((element, index) => {
            cityElement.options[cityElement.options.length] = new Option(element.trim(), index);
        });
    });

    $('#cities').on('change', function (value, index) {
        registerDonorObj.donorDetails.State = $('#states :selected').val();
        registerDonorObj.donorDetails.City = $('#cities :selected').val();
    });

    $('#bloodGroup').on('change', function (value, index) {
        registerDonorObj.donorDetails.BloodGroup = $('#bloodGroup :selected').text();
    });

    $("#gridRadios2").change(function () {
        if ($('#gridRadios2')[0].checked === true) {
            $("#donationOn").attr("disabled", false);
        } else {
            $("#donationOn").attr("disabled", true);
        }
    });

    $("#gridRadios1").change(function () {
        $("#donationOn").attr("disabled", true);
        // if ($('#gridRadios2')[0].checked === true) {
        //     $("#donationOn").attr("disabled", false);
        // } else {
        //     $("#donationOn").attr("disabled", true);
        // }
    });

    $("#gridRadios3").change(function () {
        $("#donationOn").attr("disabled", true);
        // if ($('#gridRadios2')[0].checked === true) {
        //     $("#donationOn").attr("disabled", false);
        // } else {
        //     $("#donationOn").attr("disabled", true);
        // }
    });

    $('#registerDonor').on('submit', function (e) {
        e.preventDefault();
        //var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        //check Validation Errors
        registerDonorObj.donorDetails.DonorName = $('#donorName').val();
        registerDonorObj.donorDetails.ContactNo = $('#donorContactNo').val();
        registerDonorObj.donorDetails.Email = '';
        registerDonorObj.donorDetails.State = +$('#states :selected').val();
        registerDonorObj.donorDetails.City = +$('#cities :selected').val();
        //registerDonorObj.donorDetails.State = +registerDonorObj.donorDetails.State;
        //registerDonorObj.donorDetails.City = +registerDonorObj.donorDetails.City;
        registerDonorObj.donorDetails.BloodGroup = $('#bloodGroup :selected').text();
        //registerDonorObj.donorDetails.NeverDonated = $('#gridRadios1')[0].checked;
        //registerDonorObj.donorDetails.LastDonatedDate = ($('#gridRadios2')[0].checked === true) ? $('#donationOn').val() : '1900-01-01';

        if ($('#gridRadios1')[0].checked === true) {
            registerDonorObj.donorDetails.BloodDonationOption = 'NeverDonated';
            registerDonorObj.donorDetails.LastDonatedDate = '1900-01-01';
        }
        else if ($('#gridRadios2')[0].checked === true) {
            registerDonorObj.donorDetails.BloodDonationOption = 'LastDonatedOn';
            registerDonorObj.donorDetails.LastDonatedDate = $('#donationOn').val();
        }
        else if ($('#gridRadios3')[0].checked === true) {
            registerDonorObj.donorDetails.BloodDonationOption = 'NoDonationWish';
            registerDonorObj.donorDetails.LastDonatedDate = '1900-01-01';
        }

        //console.log(registerDonorObj.donorDetails);
        if (registerDonorObj.donorDetails.DonorName.length <= 4) {
            let bG = document.getElementById("snackbarName");
            bG.className = "show";
            setTimeout(function () {
                bG.className = bG.className.replace("show", "");
            }, 3000);
            return false;
        }
        if (registerDonorObj.donorDetails.ContactNo.length <= 5) {
            let x = document.getElementById("snackbarMb");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
            return false;
        }
        /*
        if (!emailRegex.test(registerDonorObj.donorDetails.Email)) {
            let ei = document.getElementById("snackbarEi");
            ei.className = "show";
            setTimeout(function () {
                ei.className = ei.className.replace("show", "");
            }, 3000);
            return false;
        }
        */
        if (registerDonorObj.donorDetails.State === "--Select State--") {
            let bG = document.getElementById("snackbarState");
            bG.className = "show";
            setTimeout(function () {
                bG.className = bG.className.replace("show", "");
            }, 3000);
            return false;
        }
        if (registerDonorObj.donorDetails.City === "--Select City--") {
            //alert("Please select any one City");
            let bG = document.getElementById("snackbarCity");
            bG.className = "show";
            setTimeout(function () {
                bG.className = bG.className.replace("show", "");
            }, 3000);
            return false;
        }
        if (registerDonorObj.donorDetails.BloodGroup === "--Select Blood Group--") {
            let bG = document.getElementById("snackbarbG");
            bG.className = "show";
            setTimeout(function () {
                bG.className = bG.className.replace("show", "");
            }, 3000);
            return false;
        }
        if (registerDonorObj.donorDetails.NeverDonated == true || registerDonorObj.donorDetails.LastDonatedDate != '' || registerDonorObj.donorDetails.DontDonate == true) {
            //validation success
        } else {
            let bG = document.getElementById("snackbarDonateDetails");
            bG.className = "show";
            setTimeout(function () {
                bG.className = bG.className.replace("show", "");
            }, 3000);
            return false;
        }
        //document.getElementById('registerFormLoading').style.display = 'block';
        // return false;
        console.log('regisgtring donor:', registerDonorObj);
        FireBaseRegisterDonor(registerDonorObj);

    });

});

class RegisterDonor {
    constructor() {
        this.donorDetails = {
            //State: '',
            //City: '',
            //BloodGroup: '',
            //DonorName: '',
            //ContactNo: '',
            //Email: '',
            //NeverDonated: '',
            //LastDonatedDate: '',
            //DontDonate: '',

            //donorReferenceID: '',
            //BloodDonationOption:''

            donorReferenceID: '',
            BloodDonationOption: '',
            BloodGroup: '',
            City: 0,
            ContactNo: '',
            DonorName: '',
            Email: '',
            LastDonatedDate: '',
            State: 0,
            isRegisteredDonor: false,
        };
    }
    IsRegisteredDonor() {
        return this.donorDetails.isRegisteredDonor;
    }
    RegisterDonor() {
        this.donorDetails.isRegisteredDonor = true;
    }

};

var registerDonorObj = new RegisterDonor();
//console.log('register donor:-', registerDonorObj);

CheckDonor = function (email, displayName, phoneNumber) {
    registerDonorObj.donorDetails.ContactNo = phoneNumber != null ? phoneNumber.trim() : null;
    registerDonorObj.donorDetails.DonorName = displayName != null ? displayName.trim() : null;
    registerDonorObj.donorDetails.Email = email != null ? email.trim() : null;
    CheckDonorExists(registerDonorObj);
    // $('#register')
};

PopulateDonorUIDetails = function (donorRefID, DonorName, State, City, ContactNo, Email, BloodGroup, BloodDonationOption, LastDonatedDate) {
    let stateIndex = 0;
    let cityIndex = 0;
    //console.log("DonorName:", DonorName, ",State:", State, ",City:", City, ",ContactNo:", ContactNo, ",Email:", Email, ",BloodGroup:", BloodGroup, ",BloodDonationDate:", LastDonatedDate);

    if (DonorName != null && DonorName != '') {
        $('#donorName').attr('readonly', true);
        $('#donorName').val(DonorName);
        registerDonorObj.donorDetails.DonorName = DonorName;
    }

    if (ContactNo != null && ContactNo != '') {
        $('#donorContactNo').attr('readonly', true);
        $('#donorContactNo').val(ContactNo);
        registerDonorObj.donorDetails.ContactNo = ContactNo;
    }

    if (Email != null && Email != '') {
        $('#donorEmail').attr('readonly', true);
        $('#donorEmail').val(Email);
        registerDonorObj.donorDetails.Email = Email;
    }

    if (State != null && State != "") {
        //console.log('State:', State);
        registerDonorObj.donorDetails.State = State;
        //stateIndex = state_arr.indexOf(State);
        //stateIndex = state_arr[State];
        let stateElement = document.getElementById("states");
        stateElement.selectedIndex = State;
        $(stateElement).attr('disabled', true);
    }

    if (City != null && City != "") {
        registerDonorObj.donorDetails.City = City;
        let cityElement = document.getElementById("cities");
        //console.log('city array:', city_arr);
        //console.log('city selected:', city_arr[State]);
        let selectedStateCities = city_arr[State].split("|"); //select all the cities of selected state
        selectedStateCities.forEach((element, index) => {
            cityElement.options[cityElement.options.length] = new Option(element.trim(), index);
            /*
            if (City == element.trim()) {
                cityIndex = index;
            }
            */
        });
        cityElement.selectedIndex = City;
        $(cityElement).attr('disabled', true);
        registerDonorObj.donorDetails.City = City;
    }

    if (BloodGroup != null && BloodGroup != "") {
        $('#bloodGroup').val(BloodGroup).change();
        $('#bloodGroup').attr('disabled', true);
        registerDonorObj.donorDetails.BloodGroup = BloodGroup;
    }
    //console.log('NeverDonated:',NeverDonated);
    /*
    if (NeverDonated != null && NeverDonated != "" && NeverDonated == true) {
        $('#gridRadios1')[0].checked = true;
    } else {
        $('#gridRadios1')[0].checked = false;
    }

    if (BloodDonationDate != null && BloodDonationDate != "" && BloodDonationDate != '1900-01-01') {
        $('#donationOn').val(BloodDonationDate);
        $('#gridRadios2')[0].checked = true;
        $('#donationOn').attr('readonly', false);
        $("#donationOn").attr("disabled", false);
        registerDonorObj.donorDetails.LastDonatedDate = BloodDonationDate;
    }
    //console.log('DontDonate:',DontDonate);
    if (DontDonate != null && DontDonate != "" && DontDonate == true) {
        $('#gridRadios3')[0].checked = true;
    } else {
        $('#gridRadios3')[0].checked = false;
    }
    */
    registerDonorObj.donorDetails.LastDonatedDate = LastDonatedDate;
    $('#donationOn').val(registerDonorObj.donorDetails.LastDonatedDate);

    if (BloodDonationOption != '' && BloodDonationOption != null) {
        BloodDonationOption = BloodDonationOption.trim();
    }
    else{
        $('#gridRadios1')[0].checked = true;
    }
    if (BloodDonationOption == 'NeverDonated') {
        $('#gridRadios1')[0].checked = true;
        $('#donationOn').attr('readonly', true);
        $("#donationOn").attr("disabled", true);
    }
    else if (BloodDonationOption == 'LastDonatedOn') {
        $('#gridRadios2')[0].checked = true;
        $('#donationOn').attr('readonly', false);
        $("#donationOn").attr("disabled", false);

    }
    else if (BloodDonationOption == 'NoDonationWish') {
        $('#gridRadios3')[0].checked = true;
        $('#donationOn').attr('readonly', true);
        $("#donationOn").attr("disabled", true);
    }

    if (donorRefID != '0') {
        document.getElementById("register").value = "You can update only your Blood Donation Details";
        document.getElementById("register").innerHTML = "You can update only your Blood Donation Details";
        document.getElementById("register").innerText = "You can update only your Blood Donation Details";
    }
};