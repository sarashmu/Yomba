// The JavaScript necessary for our login.html page.

// A global variable used to store the current "saved" state of the account creation form.
// Used to restore the form properly.
var defaults = {};
// A global variable used to store and save the encoded profile picture.
var encodedProfile = "";

// Initial setup. Called when window loads.
// From here, we setup our buttons, fields, and header.
// We also hide the account creation form, and show the sign up form.
$(document).ready(function() {
  setupButtons();
  setupField("#signinEmail");
  setupField("#signinPassword");
  setupSearch();
  checkForUser();
  setupProfilePicture();
  $("#newAccount").hide();
  $("#accountLogin").show();
});

// Used to associate certain functions to certain buttons.
function setupButtons() {
  $("#restore").click(restore);
  $("#createAccount").click(createAccount);
  overrideSubmit("#login-form", checkCredentials);
  overrideSubmit("#account-form", save);
}

// Used to prevent the forms from reloading the page when they are submitted.
// Instead, we call functions within this JavaScript file.
function overrideSubmit(formId, onSubmit) {
  $(formId).submit(function(e) {
    onSubmit();
    e.preventDefault();
    return false;
  });
}

// When changes are made to the email or password fields, the incorrect password warning is hidden.
function setupField(fieldId) {
  $(fieldId).on('input', function(e) {
    $("#incorrect-password").hide();
  });
}

// Check whether the inputted credentials correspond to the saved ones in the cookie.
// If they do not correspond, show incorrect password or email warning.
function checkCredentials() {
  var email = $('#signinEmail').val();
  var password = $('#signinPassword').val();
  var savedEmail = getCookie("email");
  var savedPassword = getCookie("password");
  if (email == savedEmail && password == savedPassword) {
    login();
  }
  else {
    $("#incorrect-password").show();
  }
}

// When the user presses the create account button, we make UI changes.
// The sign in form is hidden and the create account form is shown.
// We also update the user's information, in the event s/he is logged in already.
function createAccount() {
  setupRequiredPaymentFields();
  setupPickProfile();
  $("#accountLogin").hide();
  $("#newAccount").show();
  $("#credit-div").show();
  $("#bank-div").hide();
  updateInformation();
}

// A function that makes a payment field required if it is visible.
// For example, banking fields will not be required if credit card fields are visible.
function setupRequiredPaymentFields() {
  $("#account-form .required").prop("required", function() {
    return $(this).is(":visible");
  });
}

// Display the appropriate payment method.
function paymentMethod() {
  var element = $("#payment");
  $("#credit-div").hide();
  $("#bank-div").hide();
  if (element.val() == "credit") {
    $("#credit-div").show();
  }
  else if (element.val() == "bank") {
    $("#bank-div").show();
  }
  setupRequiredPaymentFields();
}

// A method to setup the picking of profile pictures.
// The profile picture is saved (as a base64 string) in the variable encodeProfile for storage.
// Eventually, the image is shown to the user through a thumbnail.
function setupPickProfile() {
  $("#select-profile").change(function() {
    if (this.files) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#profile-login').attr('src', e.target.result);
      }
      reader.onloadend = function() {
        encodedProfile = reader.result;
      }
      reader.readAsDataURL(this.files[0]);
    }
  });
}

// Called on loading of the create account form.
// If the user has a cookie set, the fields are loaded automatically using a for loop.
// Likewise, the profile picture is retrieved from local storage.
function updateInformation() {
  if (loggedIn()) {
    // Retrieve values for fields.
    var $inputs = $('#account-form :input');
    $inputs.each(function() {
      if (this.id != "select-profile") {
        $(this).val(getCookie(this.id));
      }
    });
    // Retrieve profile picture.
    if (localStorage.getItem("profile")) {
      encodedProfile = localStorage.getItem("profile");
      $("#profile").attr("src", encodedProfile);
    }
  }
  // Update the user's payment method.
  paymentMethod();
  // Set new values to be returned to, in the event the user presses "restore".
  setDefaults();
}

// Save the fields to a cookie.
// Save our profile picture.
// Login.
function save() {
  var $inputs = $('#account-form :input');
  $inputs.each(function() {
    createCookie(this.id, $(this).val(), 365);
  });
  saveImage();
  login();
}

// Save our profile picture to localStorage.
function saveImage() {
  localStorage.setItem("profile", encodedProfile);
}

// Restore the fields to their original state.
// This uses the defaults dictionary we have been constructing.
function restore() {
  var $inputs = $('#account-form :input');
  $inputs.each(function() {
    if (this.id != "select-profile") {
      $(this).val(defaults[this.id]);
    }
  });
}

// Record the original values of the fields.
// Used to later determine which changes were made and to restore the form to its original state.
function setDefaults() {
  var $inputs = $('#account-form :input');
  $inputs.each(function() {
    if (this.id != "select-profile") {
      defaults[this.id] = $(this).val();
    }
  });
}
