$(document).ready(function () {
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
        registerDonorObj.donorDetails.State = $('#states :selected').text();
        registerDonorObj.donorDetails.City = $('#cities :selected').text();
    });

    $('#bloodGroup').on('change', function (value, index) {
        registerDonorObj.donorDetails.BloodGroup = $('#bloodGroup :selected').text();
    });

    $('#registerDonor').on('submit', function (e) {
        e.preventDefault();
        document.getElementById('registerFormLoading').style.display = 'block';
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
    //console.log("DonorName:", DonorName, ",State:", State, ",City:", City, ",ContactNo:", ContactNo, ",Email:", Email, ",BloodGroup:", BloodGroup, ",BloodDonationDate:", BloodDonationDate);

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

    if (State != null && State != "") {
        //console.log('State:', State);
        registerDonorObj.donorDetails.State = State;
        stateIndex = state_arr.indexOf(State);
        let stateElement = document.getElementById("states");
        stateElement.selectedIndex = stateIndex;
        $(stateElement).attr('disabled', true);
    } else {
        disableRegisterButton = true;
    }

    if (City != null && City != "") {
        registerDonorObj.donorDetails.City = City;
        let cityElement = document.getElementById("cities");
        //console.log('state index:', stateIndex); 
        let selectedStateCities = city_arr[stateIndex].split("|"); //select all the cities of selected state
        selectedStateCities.forEach((element, index) => {
            cityElement.options[cityElement.options.length] = new Option(element.trim(), index);
            if (City.trim() == element.trim()) {
                cityIndex = index;
            }
        });
        cityElement.selectedIndex = cityIndex;
        $(cityElement).attr('disabled', true);
    } else {
        disableRegisterButton = true;
    }

    if (BloodGroup != null && BloodGroup != "") {
        $('#bloodGroup').val(BloodGroup).change();
        $('#bloodGroup').attr('disabled', true);
        registerDonorObj.donorDetails.BloodGroup = BloodGroup;
    } else {
        disableRegisterButton = true;
    }

    if (BloodDonationDate != null && BloodDonationDate != "") {
        $('#donationOn').val(BloodDonationDate);
        registerDonorObj.donorDetails.LastDonatedDate = BloodDonationDate;
    } else {
        disableRegisterButton = true;
    }

    if (disableRegisterButton == true) {
        $('#register').attr('disabled', false);
    } else {
        document.getElementById("register").value = "Update Previous Blood Donated Date";
        document.getElementById("register").innerHTML = "Update Previous Blood Donated Date";
        document.getElementById("register").innerText = "Update Previous Blood Donated Date";
    }
};