/* This JavaScript file contains methods and variables used by all (or most) of Yomba's pages.
Including all these methods in one file reduces code duplication. */

// These first names are used to generate random names.
var males = ["Tyrell", "Cyrus", "Nash", "Eric", "Juan", "Dario", "Spencer", "Alessandro", "Christian", "Alonzo", "Stanley", "Marc"];
var females = ["Mira", "Ann", "Tori", "Rosa", "Ella", "Matilda", "Kate", "Sydney", "Salma", "Lillie", "Sierra", "Ivy"];

// These search tags are used for our autocomplete function in our search bar.
var searchTags = [
  "The Theater of the Absurd",
  "Samuel Beckett: A Short Biography",
  "An Interview with Eugène Ionesco",
  "A Day with Albert Camus",
  "Camus's Plague and its Symbols",
  "A Representation of Ionesco's Rhinoceros",
  "La Leçon, by Ionesco",
  "Mastroanni in the Stranger"
];

// This is a variable corresponding to the user's name. Used to post messages and comments.
// Note: we have this variable so that the messages and comments work even if the user isn't logged in.
var myName = "Roger K.";

// Cookie creating function.
// The use of "path=/;" is key for making the cookies function across several files.
function createCookie(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=Thu, 6 Dec 2018 12:00:00 UTC; path=/"
}

// Method designed to split the cookie string.
// Adapted and modified from https://www.w3schools.com/js/js_cookies.asp.
function getCookie(cname) {
  var name = cname + "=";
  var cookie = decodeURIComponent(document.cookie).split(";");
  for (var i = 0; i < cookie.length; i++) {
    var c = cookie[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Helper function for login. Simplifies login mechanism for all callers.
function login() {
  createCookie("logged-in", "1");
  window.location.href = "./home.html";
}

// Helper function for logout. Simplifies logout mechanism for all callers.
function logout() {
  createCookie("logged-in", "0");
  location.reload();
}

// Returns a boolean indicating whether the user is logged in.
function loggedIn() {
  return getCookie("logged-in") == "1";
}

// Modifies header based on whether user has logged in.
function checkForUser() {
  // The user is logged in.
  if (loggedIn()) {
    $("#show-login").hide();
  }
  // No user is logged in.
  else {
    $("#show-user").hide();
    $("#show-notifications").hide();
  }
}

// Modifies our search bar to allow autocomplete and change its placeholder on focus.
function setupSearch() {
  $('#search').focus(function() {
    $(this).attr('placeholder', 'Communities, users, videos');
  }).blur(function() {
    $(this).attr('placeholder', 'Search');
  })
  $("#search").autocomplete({
    source: searchTags
  });
}

// Link from all our thumbnails to our video page.
function setupClickThumbnails() {
  $(document).on('click', '.thumbnail', function() {
    window.location.href = "./video.html";
  });
}

// Setup our sidebar toggle system.
// Column classes are toggled to make the sidebar disappear and to increase the real estate alloted to the content.
function setupSidebar() {
  $("#more").click(function() {
    $(".sidebar").toggle();
    $("#content-container").toggleClass("col-md-12 col-lg-12 col-md-9 col-lg-10");
  });
}

// Loads profile picture from localstorage if the user is logged in.
// As Firefox (verified with version 57) is the only browser to support localstorage locally, the profile picture will only appear in that browser.
function setupProfilePicture() {
  if (loggedIn && localStorage.getItem("profile")) {
    $("#profile").attr("src", localStorage.getItem("profile"));
  }
}

// Setup our thumbnail carousel.
function setupCarousel(className) {
  $(className).slick({
    infinite: true,
    variableWidth: true,
    centerMode: true
  });
}

// Setup our responsive thumbnail carousel.
// This version seeks to always show a certain number of thumbnails, regardless of the exact size.
// Used for our members carousel.
function setupCarouselResponsive(className, toShow) {
  $(className).slick({
    infinite: true,
    slidesToShow: toShow,
    slidesToScroll: toShow,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: toShow - 1,
          slidesToScroll: toShow - 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: toShow - 2,
          slidesToScroll: toShow - 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: toShow - 3,
          slidesToScroll: toShow - 3
        }
      }
    ]
  });
}

// A shuffling mechanism for our thumbnails.
// Adds life to our simulation, because it gives the impression different videos are available, in a different order.
function setupThumbnails() {
  setupClickThumbnails();
  $(".video-content").each(function() {
    var divs = $(this).find('div');
    for (var i = 0; i < divs.length; i++) {
      $(divs[i]).remove();
    }
    divs = shuffle(divs);
    for (var i = 0; i < divs.length; i++) {
      $(divs[i]).appendTo(this);
    }
  });
}

// Generates a random (24 hour) time.
function getRandomTime() {
  var hours = Math.floor(Math.random() * 24);
  var minutes = Math.floor(Math.random() * 60);
  hours = hours < 10 ? "0" + String(hours) : String(hours);
  minutes = minutes < 10 ? "0" + String(minutes) : String(minutes);
  return hours + ":" + minutes;
}

// Generates a random name.
function getRandomName(isFemale) {
  var firsts = isFemale ? females : males;
  var index = Math.floor(Math.random() * firsts.length);
  var first = firsts[index];
  firsts = firsts.splice(index, 1);
  var last = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return first + " " + last + ".";
}

// A function that implements the Knuth shuffle algorithm.
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
