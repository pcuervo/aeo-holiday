/*****************************
	UI functions
 *****************************/
/**
 * Toggles on/off main menu
 * @return void
 */
function toggleMainMenu() {
    $("#menu-toggle, #menu-toggle2").click(function(e) {
		e.preventDefault();
		$(".wrapper").toggleClass("toggled");
	});
}// toggleMainMenu

/*****************************
	AJAX functions
 *****************************/
/**
 * Create exchange group using AJAX
 * @return void
 */
function createExchangeGroup(){
    $('.j_group_form button').on('click', function(e){
        e.preventDefault();
        console.log('creating group....');

        var group_data = $('.j_group_form').serialize();
        var url = localStorage.getItem('base_url') + 'index.php/dashboard/create_exchange_group';

        $.post(
            url,
            group_data,
            function(response){
                console.log(response);
            }// response
        );
    });
}// createExchangeGroup

/*****************************
	Facebook API functions
 *****************************/
/**
 * Initialize Facebook SDK
 * @return void
 */
function facebookInit(){
	console.log('Facebook initializing...');
	loadFacebookSdk();

 	window.fbAsyncInit = function() {
		FB.init({
			appId      : '293592524173381',
			cookie     : true,  
			xfbml      : true,  
			version    : 'v2.1' 
		});

		// Now that we've initialized the JavaScript SDK, we call 
		// FB.getLoginStatus() to get 1 of 3 states of the
		// person visiting 
		//
		// 1. Logged into your app ('connected')
		// 2. Logged into Facebook, but not your app ('not_authorized')
		// 3. Not logged into Facebook and can't tell if they are logged into
		//    your app or not.
		//
		// These three cases are handled in the callback function.

		// FB.getLoginStatus(function(response) {
		// 	statusChangeCallback(response);
		// });
		checkLoginState();
	};
}// facebookInit

/**
 * Load the SDK asynchronously
 * @return void
 */
function loadFacebookSdk(){
	console.log('loading FB SDK async...');
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}
            
 /**
 * This is called with the results from FB.getLoginStatus().
 * @param JSON object response
 * @return void
 */
function statusChangeCallback(response) {
	console.log('Checking user connected status');

    if (response.status === 'connected') {
        console.log('User is connected to app.');

        // Redirect to dashboard if already logged in 
        if(localStorage.getItem('current_view') == 'login'){
        	var dashboard_url = localStorage.getItem('base_url') + 'index.php/dashboard/index/' + response.authResponse.userID;
        	window.location = dashboard_url;
        }
        
        //getUserData(response.authResponse.userID, response.authResponse.accessToken);
    } 

    if (response.status === 'not_authorized') {
        console.log('User is connected to Facebook but not to app.');
        if(localStorage.getItem('current_view') != 'login'){
	        var login_url = localStorage.getItem('base_url');
	        window.location = login_url;
	    }
    } 

    if (response.status === 'unknown') {
        // The person is not logged into Facebook.
        console.log('User is not connected to Facebook.');
        if(localStorage.getItem('current_view') != 'login'){
	        var login_url = localStorage.getItem('base_url');
	        window.location = login_url;
	    }
    }

}// statusChangeCallback

 /**
 * This function is called when someone finishes with the Login Button.  
 * @return void
 */
function checkLoginState() {
	console.log('Checking login state...');
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}// checkLoginState

/**
 * Get facebook user data using Graph API
 * @param {string} fb_user_id 
 * @param {string} access_token 
 */
function getUserData(fb_user_id, access_token) {
    var fb_user_data = {};
    FB.api(fb_user_id, function(response) {
        if(response.id){
            fb_user_data['id'] = response.id;
            fb_user_data['first_name'] = response.first_name;
            fb_user_data['last_name'] = response.last_name;
            fb_user_data['email'] = response.email;
            fb_user_data['gender'] = response.gender;
            fb_user_data['access_token'] = access_token;

            addFacebookUser(fb_user_data);
        }
    });
}// getUserData

/**
 * Add Facebook user to database using AJAX
 * @param {array} user_data
 * @return void 
 */
function addFacebookUser(user_data){
    var url = localStorage.getItem('base_url') + 'index.php/iteration_1_test/save_fb_user';

    $.post(
        url,
        user_data,
        function(response){
            console.log(response);
        }// response
    );
}// addFacebookUser

/**
 * Invite friends to the app using Facebook
 * @return void
 */
function inviteFriends(){
	console.log('invite friends ready');
    $('.j_invite_friends').on('click', function(){
        FB.ui({method: 'apprequests',
            message: 'Participa en nuestro grupo de intercambio.'
        }, function(response){

            $.each(response.to, function(i, friend_id){
                $('.j_group_form').append('<input type="hidden" name="invited_friends[]" value="' + friend_id + '">');
            });
        });
    });
}// inviteFriends




// PENDING TESTS - Do not use.
/**
 * Add Facebook user to database using AJAX
 * @param {array} data 
 */
function saveInvitation(friends){
    var url = localStorage.getItem('base_url') + 'index.php/iteration_1_test/save_invited_friends';

    $.post(
        url,
        friends,
        function(response){
            console.log(response);
        }// response
    );
}// addFacebookUser

