// The JavaScript code for our homepage, home.html.

// Loads UI elements (sidebar, header, thumbnails, carousels).
// All of the methods called are in common.js, because they are common to the other HTML pages.
$(document).ready(function() {
  checkForUser();
  setupSearch();
  setupSidebar();
  setupThumbnails();
  setupProfilePicture();
  setupCarouselResponsive(".member-content", 4);
  setupCarousel(".video-content");
});
