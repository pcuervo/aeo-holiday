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

function addGroupToCalendar(){
    addthisevent.settings({
        license   : "al7dliedlzlnbpbh0mbm",
        mouse     : false,
        css       : false,
        outlook   : {show:false, text:"Outlook Calendar"},
        google    : {show:true, text:"Google Calendar"},
        ical      : {show:true, text:"iCal Calendar"},
        facebook  : {show:false, text:"Facebook Event"},
        dropdown  : {order:"google,ical"},
        callback  : ""
    });
}

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

function footerBottom(){
    var alturaFooter = $('footer').height();
    $('.container').css('padding-bottom', alturaFooter );
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
                swal("OK", "!Grupo de intercambio creado!", "success");
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
                var dashboard_url = localStorage.getItem('base_url') + 'dashboard/index/';
                window.location = dashboard_url;
            }// response
        );
    });
}// updatePerfectFit

/**
 * Show all secret friends for the current user
 * @return void
 */
function showSecretFriends(){
    $('a.j-secret-friends').on('click', function(e){
        e.preventDefault();

        var url = localStorage.getItem('base_url') + 'secret_friends/get_secret_friends/';

        $.get(
            url,
            function(response){
                var secret_friends_json = $.parseJSON(response);
                $.each(secret_friends_json, function(i, friend){
                    console.log(friend);
                    var friend_url = localStorage.getItem('base_url') + 'secret_friends/create_message/' + friend.group_friend_id;
                    var secret_friend_html = '<a href="' + friend_url + '">';
                    secret_friend_html += '<img src="' + friend.friend_picture + '" />';
                    secret_friend_html += '<p>' + friend.name + '</p>';
                    secret_friend_html += '<p>' + friend.group + '</p>';
                    secret_friend_html += '</a>';
                    $(secret_friend_html).appendTo('.j-modal');
                });
            }// response
        );
    });
}// showSecretFriends

/**
 * Send Zencoder POST
 * @return void
 */
function videoPost(){

    console.log("videoPost");

    var request = {
        input: 's3://zencodertesting/test.mov'
    }

    $.ajax({
        type: 'POST',
        url: 'https://app.zencoder.com/api/v2/jobs',
        headers:{ 'Zencoder-Api-Key' : '83521e9cb52b9f31f41856b28de4c3b1'},
        dataType: 'json',
        data: JSON.stringify(request),
        success: function(response) {
            console.log(response);
        },
        error: function(response){
            console.log(response);
        }
    });
}// videoPost

/**
 * Get unread messages for current user
 * @return void
 */
function getUnreadMessages(){
    var url = localStorage.getItem('base_url') + 'dashboard/get_unread_messages/';
    $.get(
        url,
        function(response){
            var mensajes_json = $.parseJSON(response);
            var url_mensajes = localStorage.getItem('base_url') + 'secret_friends/view_messages/';
            $.each(mensajes_json, function(i, val){
                var html_mensaje = '<p>Tienes un <a href="' + url_mensajes + '>mensaje</a> de un amigo secreto en el grupo </p>';
                $('.actividad-mensajes')
            });
        }// response
    );
}// getUnreadMessages

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

	//console.log('invite friends ready');
    $(form + ' .j_invite_friends').on('click', function(){
        FB.ui({method: 'apprequests',
            message: 'Participa en nuestro grupo de intercambio.'
        }, function(response){

            $.each(response.to, function(i, friend_id){
                $(form).append('<input type="hidden" name="invited_friends[]" value="' + friend_id + '">');
            });
            $('.j_invite_friends').after('<p>Se han agregado amigos al grupo</p>');
        });
    });
}// inviteFriends

function getInvitedFriendData(fb_id){
    var user_data = {};
    FB.api('/'+ fb_id + '?access_token=CAAEO6PCDwsIBAOCpWHhPxQ8pSfTz973A1y0nZB4oG0lbe4bPHDNkbVR1YWHzbPWZBAylkqGpUTqr0LGZBllJGmefEB535Ime0c9yN8OZBp4s45QLDCrwuZBrTdUoRuY3j7EnaBLAgiVj6bud1i51x194zr8ccm0eLa3t4oF76qABB18oCTOZCrhkpxCh2ECbfQiPBZAtW0mP3tZAFg4EUj7R', function(response) {

        if(response.id){
            var name = response.first_name + response.last_name;
        }
        console.log(name);
        return name;
    });

}// getInvitedFriendName

function getInvitedFriendPic(fb_id){
    FB.api('/'+ fb_id + '/picture?access_token=CAAEO6PCDwsIBAOCpWHhPxQ8pSfTz973A1y0nZB4oG0lbe4bPHDNkbVR1YWHzbPWZBAylkqGpUTqr0LGZBllJGmefEB535Ime0c9yN8OZBp4s45QLDCrwuZBrTdUoRuY3j7EnaBLAgiVj6bud1i51x194zr8ccm0eLa3t4oF76qABB18oCTOZCrhkpxCh2ECbfQiPBZAtW0mP3tZAFg4EUj7R', function(response) {
        if(response){
            return response.url;
        }
    });
}// getInvitedFriendName

// Analytics
function insertGoogleAnalytics(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-43305108-4', 'auto');ga('send', 'pageview');
}// insertGoogleAnalytics



