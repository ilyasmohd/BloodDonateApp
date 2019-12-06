$(document).ready(function () {

    let states = state_arr;
    let cities = city_arr;
    let stateElement = document.getElementById("states");
    let cityElement = document.getElementById("cities");
    states.forEach((element, index) => {
        stateElement.options[stateElement.options.length] = new Option(element.trim(), index);
    });

    $('#states').on('change', function (value, index) {
        $('#cities').empty();
        let selectedStateCities = cities[$('#states :selected').val()].split("|"); //select all the cities of selected state
        console.log('states changed called, selected state cities object as floowows', selectedStateCities);
        selectedStateCities.forEach((element, index) => {
            //console.log(index);
            cityElement.options[cityElement.options.length] = new Option(element.trim(), index);
        });
    });

    $('#cities').on('change', function (value, index) {
        // console.log($('#cities :selected').text());
        registerDonorObj.donorDetails.State = $('#states :selected').text();
        registerDonorObj.donorDetails.City = $('#cities :selected').text();
        // console.log(registerDonorObj.donorDetails.State);
        // console.log(searchDonorObj.donorDetails.City);
    });

    $('#bloodGroup').on('change', function (value, index) {
        registerDonorObj.donorDetails.BloodGroup = $('#bloodGroup :selected').text();
    });

    $('#registerDonor').on('submit', function (e) {
        e.preventDefault();
        registerDonorObj.donorDetails.ContactNo = $('#donorContactNo').val();
        registerDonorObj.donorDetails.DonorName = $('#donorName').val();
        registerDonorObj.donorDetails.Email = $('#donorEmail').val();
        registerDonorObj.donorDetails.LastDonatedDate = $('#donationOn').val();
        FireBaseRegisterDonor(registerDonorObj);
    });

});

class RegisterDonor {
    constructor() {
        this.donorDetails = {
            State: '',
            City: '',
            BloodGroup: '',
            DonorName: '',
            ContactNo: '',
            Email: '',
            LastDonatedDate: '',
            isRegisteredDonor: false
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

PopulateDonorUIDetails = function (DonorName, State, City, ContactNo, Email, BloodGroup, BloodDonationDate) {
    let disableRegisterButton = false;
    let stateIndex = 0;
    let cityIndex = 0;
    console.log("DonorName:", DonorName, ",State:", State, ",City:", City, ",ContactNo:", ContactNo, ",Email:", Email, ",BloodGroup:", BloodGroup, ",BloodDonationDate:", BloodDonationDate);

    if (DonorName != null) {
        $('#donorName').attr('readonly', true);
        $('#donorName').val(DonorName);
    } else {
        disableRegisterButton = true;
    }

    if (ContactNo != null) {
        $('#donorContactNo').attr('readonly', true);
        $('#donorContactNo').val(ContactNo);
    } else {
        disableRegisterButton = true;
    }

    if (Email != null) {
        $('#donorEmail').attr('readonly', true);
        $('#donorEmail').val(Email);
    } else {
        disableRegisterButton = true;
    }

    if (State != null) {
        stateIndex = state_arr.indexOf(State);
        //$('#states').val(stateIndex);
        $('#states option')[stateIndex].selected = true;
        $('#states').attr('readonly', true);

    } else {
        disableRegisterButton = true;
    }

    if (City != null) {
        cityIndex = city_arr[stateIndex].indexOf(City);
        //$('#cities option')[cityIndex].selected = true;
        //$('#cities').attr('readonly', true);
        //$('#cities').val(City).change();
    } else {
        disableRegisterButton = true;
    }

    if (BloodGroup != null) {
        $('#bloodGroup').attr('readonly', true);
        //$('#bloodGroup').val(BloodGroup).change();
    } else {
        disableRegisterButton = true;
    }

    if (BloodDonationDate != null) {
        $('#donationOn').attr('readonly', true);
        $('#donationOn').val(BloodDonationDate);
    } else {
        disableRegisterButton = true;
    }

    if (disableRegisterButton == true) {
        $('#register').attr('readonly', false);
    } else {
        $('#register').attr('readonly', true);
    }
};
/*
var x = document.getElementById("mySelect").selectedIndex;
var y = document.getElementById("mySelect").options;
alert("Index: " + y[x].index + " is " + y[x].text);
*/