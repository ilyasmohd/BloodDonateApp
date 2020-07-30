/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */

/**
 * @return {!Object} The FirebaseUI config.
 */

function getSignInMethods() {
    if (new URLSearchParams(window.location.search).has('mobileUser') == false) {
        //console.log('dint found mobile users');
        return [
            // TODO(developer): Remove the providers you don't need for your app.
            //{
            //    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //    // Required to enable this provider in One-Tap Sign-up.
            //    authMethod: 'https://accounts.google.com',
            //    // Required to enable ID token credentials for this provider.
            //    clientId: CLIENT_ID
            //}, //,
            //{
            //     provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //     // Whether the display name should be displayed in Sign Up page.
            //     requireDisplayName: true,
            //     signInMethod: getEmailSignInMethod()
            // },
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    size: getRecaptchaMode()
                }
            }
        ];
    } else {
        //console.log('found mobile users');
        return [{
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
                size: getRecaptchaMode()
            }
        }]
    }
}

function getUiConfig() {
    return {
        'callbacks': {
            // Called when the user has been successfully signed in.
            'signInSuccessWithAuthResult': function (authResult, redirectUrl) {
                if (authResult.user) {
                    handleSignedInUser(authResult.user);
                }
                if (authResult.additionalUserInfo) {
                    //document.getElementById('is-new-user').textContent =
                    //    authResult.additionalUserInfo.isNewUser ?
                    //    'New User' : 'Existing User';
                }
                // Do not redirect.
                return false;
            }
        },
        // Opens IDP Providers sign-in flow in a popup.
        'signInOptions': getSignInMethods(),
        // Terms of service url.
        'tosUrl': 'https://www.google.com',
        // Privacy policy url.
        'privacyPolicyUrl': 'https://www.google.com',
        'credentialHelper': CLIENT_ID && CLIENT_ID != '417215519552-tjefg6l1h20qj7c2gho82m5dirogb6jk.apps.googleusercontent.com' ?
            firebaseui.auth.CredentialHelper.GOOGLE_YOLO : firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Disable auto-sign in.
ui.disableAutoSignIn();


/**
 * @return {string} The URL of the FirebaseUI standalone widget.
 */
function getWidgetUrl() {
    return '/widget.html#recaptcha=' + getRecaptchaMode() + '&emailSignInMethod=' +
        getEmailSignInMethod();
}


/**
 * Redirects to the FirebaseUI widget.
 */
var signInWithRedirect = function () {
    window.location.assign(getWidgetUrl());
};


/**
 * Open a popup with the FirebaseUI widget.
 */
var signInWithPopup = function () {
    window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
};


/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function (user) {
    console.log('user logged in.....');
    CheckDonor(user.email, user.displayName, user.phoneNumber);
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('register-donor').style.display = 'block';
    //console.log('user email:', user.email, 'displayName', user.displayName, 'phoneNumber', user.phoneNumber);

};


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function () {
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    document.getElementById('register-donor').style.display = 'none';
    ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function (user) {
    //console.log('auth changes onAuthStateChanged...');
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';
    user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
var deleteAccount = function () {
    firebase.auth().currentUser.delete().catch(function (error) {
        if (error.code == 'auth/requires-recent-login') {
            // The user's credential is too old. She needs to sign in again.
            firebase.auth().signOut().then(function () {
                // The timeout allows the message to be displayed after the UI has
                // changed to the signed out state.
                setTimeout(function () {
                    alert('Please sign in again to delete your account.');
                }, 1);
            });
        }
    });
};


/**
 * Handles when the user changes the reCAPTCHA or email signInMethod config.
 */
function handleConfigChange() {
    var newRecaptchaValue = document.querySelector(
        'input[name="recaptcha"]:checked').value;
    var newEmailSignInMethodValue = document.querySelector(
        'input[name="emailSignInMethod"]:checked').value;
    location.replace(
        location.pathname + '#recaptcha=' + newRecaptchaValue +
        '&emailSignInMethod=' + newEmailSignInMethodValue);

    // Reset the inline widget so the config changes are reflected.
    ui.reset();
    ui.start('#firebaseui-container', getUiConfig());
}


/**
 * Initializes the app.
 */
var initApp = function () {
    console.log('starting logging...');
    //document.getElementById('sign-out').addEventListener('click', function () {
    //    firebase.auth().signOut();
    // });
};



// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
// var CLIENT_ID = 'YOUR_OAUTH_CLIENT_ID';
var CLIENT_ID = '417215519552-tjefg6l1h20qj7c2gho82m5dirogb6jk.apps.googleusercontent.com';

window.addEventListener('load', initApp);