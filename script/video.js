// The JavaScript necessary for our video.html page.

// Setup the page's UI elements (header, sidebar, search bar, thumbnails, carousels, etc).
// Allow the user to post comments.
$(document).ready(function() {
  checkForUser();
  setupSearch();
  setupSidebar();
  setupThumbnails();
  setupProfilePicture();
  setupCarousel(".video-content");
  setupComments();
  setupPostComment();
});

// Allow the "Show Comments" button to toggle between that text and "Hide Comments".
function setupComments() {
  $(".show-comments").click(function() {
    // We trim the button's text, to ensure that whitespace does not fool our comparison.
    if ($.trim($(this).text()) == "Show Comments") {
      $(this).text("Hide Comments");
    }
    else {
      $(this).text("Show Comments");
    }
  });
}

// Generate an HTML comment and insert it in our comment container.
// These comments follow the HTML structure of the ones found in video.html.
// Clear comment form.
function setupPostComment() {
  $(".comment-form").submit(function (e) {
    e.preventDefault();
    if ($("#comment-draft").val() != "") {
      // Create the comment if the comment to be posted is not empty.
      var comment = '<div class="comment">\
      <div class="comment-image-container">\
      <img src="images/profiles/16.jpg" alt="' + myName + '">\
      </div>\
      <div class="comment-text">\
      <span class="comment-author">' + myName + '</span>\
      <p>' + $("#comment-draft").val() + '</p>\
      </div>\
      </div>';
      $(comment).insertAfter($(".comment-container"));
      // Clear comment form.
      $("#comment-draft").val("");
    }
  });
}
