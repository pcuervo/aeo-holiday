/*****************************
	UI functions
 *****************************/
/**
* Toggles on/off main menu
* @return void
**/
function toggleMainMenu() {
    $('#menu-toggle, #menu-toggle2').click(function(e) {
		e.preventDefault();
		$("#sidebar-wrapper").toggleClass("toggled");
	});
}// toggleMainMenu

/**
* Toggles disabled button
* @return void
**/
function toggleButton(){
    $('.js-acepto').on('change', function(){
        if ( $('.js-login').hasClass('js-disabled') ){
            $('.js-login').removeAttr('disabled').removeClass('js-disabled').addClass('js-enabled');
        } else if ( $('.js-login').hasClass('js-enabled') ){
            $('.js-login').attr('disabled', 'disabled').removeClass('js-enabled').addClass('js-disabled');
        }
    });
}


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
        var url = localStorage.getItem('base_url') + 'dashboard/create_exchange_group';
        console.log(group_data);
        $.post(
            url,
            group_data,
            function(response){
            	// TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta
            	alert('!Grupo de intercambio creado!');
                var dashboard_url = localStorage.getItem('base_url') + 'dashboard/index/';
        		window.location = dashboard_url;
            }// response
        );
    });
}// createExchangeGroup

/**
 * Edit exchange group using AJAX
 * @return void
 */
function editExchangeGroup(){
    $('.j_edit_group_form button').on('click', function(e){
        e.preventDefault();
        console.log('editing group....');

        var group_data = $('.j_edit_group_form').serialize();
        var url = localStorage.getItem('base_url') + 'dashboard/edit_exchange_group';

        $.post(
            url,
            group_data,
            function(response){
                // TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta
                console.log(response);
                alert('!Grupo de intercambio editado!');
                var dashboard_url = localStorage.getItem('base_url') + 'dashboard/index/';
                window.location = dashboard_url;
            }// response
        );
    });
}// editExchangeGroup

/**
 * Updates user's perfect fit using AJAX
 * @return void
 */
function updatePerfectFit(){
    $('.j_update_perfect_fit button').on('click', function(e){
        e.preventDefault();

        var perfect_fit_data = $('.j_update_perfect_fit').serialize();
        var url = localStorage.getItem('base_url') + 'dashboard/create_perfect_fit';

        $.post(
            url,
            perfect_fit_data,
            function(response){
                // TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta
                console.log(response);
                alert(1);
                var dashboard_url = localStorage.getItem('base_url') + 'dashboard/index/';
                window.location = dashboard_url;
            }// response
        );
    });
}// updatePerfectFit

/**
 * Show all secret friends
 * @return void
 */
function showSecretFriends(){
    $('a.j-secret-friends').on('click', function(e){
        e.preventDefault();

        var user_id = $(this).data('user-id');
       /* var perfect_fit_data = $('.j_update_perfect_fit').serialize();
        var url = localStorage.getItem('base_url') + 'dashboard/create_perfect_fit';

        $.post(
            url,
            perfect_fit_data,
            function(response){
                // TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta
                console.log(response);
                alert(1);
                var dashboard_url = localStorage.getItem('base_url') + 'dashboard/index/';
                window.location = dashboard_url;
            }// response
        );*/
    });
}// showSecretFriends

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
function inviteFriends(form){
    loadFacebookSdk();

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '297868607079106',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });
    };

	console.log('invite friends ready');
    $(form + ' .j_invite_friends').on('click', function(){
        FB.ui({method: 'apprequests',
            message: 'Participa en nuestro grupo de intercambio.'
        }, function(response){

            $.each(response.to, function(i, friend_id){
                $(form).append('<input type="hidden" name="invited_friends[]" value="' + friend_id + '">');
            });
        });
    });
}// inviteFriends


