This is a README for Yomba, written by Anya Bali, Elliott Bolzan, Carrie Mittl, and Sara Shmueli. Here are some notes concerning our project:

1. Firefox (version > 57) was used to develop Yomba. As a consequence, we recommend testing Yomba on the newest releases of Firefox for a few reasons.
 
	1.1. Firefox is the only major browser that supports HTML5 localstorage locally, so using Firefox will allow you to use the profile picture option we have added to Yomba. 
	1.2. Google Chrome supports must of Yomba's features, with the exception of localstorage.
	1.3. Safari supports neither localstorage nor slick, a JavaScript carousel plugin we used in Yomba. We don't recommend using Safari to test Yomba.

2. While our HTML pages all pass W3C validation, our CSS page has a few warnings we'd like to address here.
	
	2.1. The validator claims that position:sticky is not a valid option. We recognize this is a relatively new option, but we tested it in Chrome, Firefox, and Safari, and decided to retain the code as it functioned properly and looked good.
	2.2. The validator claims that input:invalid is not a valid option. However, we used this piece of CSS to remove aesthetically displeasing input borders added by Firefox automatically to required form fields.

3. Finally, we wanted to make clear that this is only a simulation.

	3.1. Passwords are stored unencrypted as cookies, which should never be done on a live, hosted website.
	3.2. Certain features, like chatting and posting comments, should only be available to registered users, but we chose to make them available to unregistered users as well. In this way, any user can rapidly test Yomba and see what we developed, without going through the process of creating an account.
	3.3. In Firefox, local cookies are treated as session cookies. Hence, if a new tab or window is opened, the cookies will not be retained and the user will be logged out. This is not a limitation of Yomba's – it is simply how web browsers function for security reasons.