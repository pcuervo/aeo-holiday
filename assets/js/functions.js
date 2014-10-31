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
            	// TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta
            	alert('!Grupo de intercambio creado!');
                var dashboard_url = localStorage.getItem('base_url') + 'index.php/dashboard/index/';
        		window.location = dashboard_url;
            }// response
        );
    });
}// createExchangeGroup

function add_hidden_input(form, name, value){
	$(form).append('<input type="hidden" name="' + name + '" value="' + value + '"');
}// add_hidden_input


/*****************************
	Facebook API functions
 *****************************/
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
 * Invite friends to the app using Facebook
 * @return void
 */
function inviteFriends(){
    loadFacebookSdk();

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '293592524173381',
            cookie     : true,  
            xfbml      : true,  
            version    : 'v2.1' 
        });
    };

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


