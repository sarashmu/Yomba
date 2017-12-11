// The JavaScript code for our communities.html page.

// Loads various UI components (carousels, sidebars, thumbnails).
// Also scrolls our messages tab to the top, so that the user may see the most recent messages.
$(document).ready(function() {
  checkForUser();
  setupMemberProfiles();
  setupSearch();
  setupSidebar();
  setupThumbnails();
  setupProfilePicture();
  setupCarouselResponsive(".member-content", 4);
  setupCarousel(".video-content");
  setupRandomTimes();
  setupPostMessage();
  $(".messages").scrollTop($(".messages").height());
});

// Generates 16 members and places them in a carousel randomly.
// The member names and profile pictures are generated randomly.
// Men's names are associated with men's pictures, and women's names are associated with women's pictures.
function setupMemberProfiles() {
  var indices = [];
  for (i = 1; i <= 16; i++) {
    indices[i - 1] = i;
  }
  indices = shuffle(indices);
  for (i = 0; i < 16; i++) {
    // Generate random name.
    var name = getRandomName(indices[i] <= 8);
    // Name is added to searchable / autocomplete tags.
    searchTags.push(name);
    var member = '<div class="member">\
    <img src="images/profiles/' + String(indices[i]) + '.jpg"></img>\
    <span class="member-name">' + name + '</span>\
    </div>';
    $(".member-content").append(member);
  }
}

// Associates random authors and times to chat messages.
// To give more life to our simulation.
// Messages look different whether they are written by other users, or the "current user" (a fictive simulated user, that is).
function setupRandomTimes() {
  $(".other-message").each(function( index ) {
    $('<span class="message-author text-center">' + getRandomName(true) + ' at ' + getRandomTime() + '.</span>').insertAfter(this);
  });
  $('<span class="message-author text-center">' + myName + ' at ' + getRandomTime() + '.</span>').insertAfter(".my-message");
}

// Allows the user to be able to post messages.
// HTML content is generated and inserted into the message container.
// A random time is associated to the message, as long as the default, fictive user's name.
function setupPostMessage() {
  $(".post").submit(function (e) {
    e.preventDefault();
    if ($("#message-draft").val() != "") {
      $(".messages").append('<p class="message my-message">' + $("#message-draft").val() + '</p>');
      $(".messages").append('<span class="message-author text-center">' + myName + ' at ' + getRandomTime() + '.</span>');
      $("#message-draft").val("");
      $(".messages").scrollTop($(".messages").height());
    }
  });
}
