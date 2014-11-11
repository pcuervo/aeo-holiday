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

/**
* Footer space
* @return void
**/
function footerBottom(){
    var footerHeight = $('footer').outerHeight();
    $('.wrapper').css('padding-bottom', footerHeight );
}

/**
* Form Validation
* @return void
**/
function formValidation(forma){
    $(forma).validate({
        invalidHandler: function(event, validator) {
        // 'this' refers to the form
        var errors = validator.numberOfInvalids();
        console.log(errors);
        if (errors) {
          var message = errors == 1
            ? 'You missed 1 field. It has been highlighted'
            : 'You missed ' + errors + ' fields. They have been highlighted';
          $("div.error span").html(message);
          $("div.error").show();
        } else {
          $("div.error").hide();
        }
      },
        submitHandler:function(){
            switch(forma){
                case '.j_group_form':
                    createExchangeGroup();
                    break;
                case 'editExchangeGroup':
                    editExchangeGroup();
                    break;
            }
        }
    });
}

function setLimitDate(){
    $('#fecha-intercambio').on('change', function(){
        var val = $(this).val();
        var date = new Date(val);
        var newdate = new Date(date);
        newdate.setDate(newdate.getDate() - 1);
        var nd = new Date(newdate);
        //console.log(nd);
        $('#fecha-limite').attr('max', nd);
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
    var group_data = $('.j_group_form').serialize();
    var url = localStorage.getItem('base_url') + 'dashboard/create_exchange_group';
    console.log(group_data);
    $.post(
        url,
        group_data,
        function(response){
            var coupon_url = localStorage.getItem('base_url') + 'dashboard/view_coupon/ng';
            window.location = coupon_url;
        }// response
    );
}// createExchangeGroup

/**
 * Edit exchange group using AJAX
 * @return void
 */
function editExchangeGroup(){
    console.log('editing group....');
    var group_data = $('.j_edit_group_form').serialize();
    var url = localStorage.getItem('base_url') + 'dashboard/edit_exchange_group';

    $.post(
        url,
        group_data,
        function(response){
            // TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta
            console.log(response);
            var dashboard_url = localStorage.getItem('base_url') + 'dashboard/index/';
            window.location = dashboard_url;
        }// response
    );
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
function videoPost(url){
    
    var request = {
        input: url
    }

    $.ajax({
        type: 'POST',
        url: 'https://app.zencoder.com/api/v2/jobs',
        headers:{ 'Zencoder-Api-Key' : '83521e9cb52b9f31f41856b28de4c3b1'},
        dataType: 'json',
        data: JSON.stringify(request),
        success: function(response) {
            console.log(response.outputs[0]);
            var html_video = '<video controls><source src="' + response.outputs[0].url + '" type="video/mp4"></video>';
            $(html_video).appendTo('.j-video');
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
                var html_mensaje = '<p>Tienes un <a href="' + url_mensajes + '"> mensaje</a> de tu amigo secreto del grupo ' + val.group_name + '</p>';
                $(html_mensaje).appendTo('.actividad-mensajes');
            });
        }// response
    );
}// getUnreadMessages

/**
 * Get user's activity
 * @return void
 */
function getUserActiviy(){
    var url = localStorage.getItem('base_url') + 'dashboard/get_user_activity/';
    $.get(
        url,
        function(response){
            var activity_json = $.parseJSON(response);
            $.each(activity_json, function(i, activity){
                var html_activity;
                switch(activity.activity_type){
                    case '1':
                        html_activity = '<div class="margin-bottom">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<p class="[ text-center ]">Has creado el grupo: ' + activity.group_name + '</p>';
                        html_activity += '<hr class="[ margin-bottom ]">';
                        html_activity += '</div>'
                        break;
                    case '2':
                        html_activity = '<div class="margin-bottom">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="'+activity.friend_pic+'" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]">' + activity.friend_name + ' se ha unido a tu grupo: ' + activity.group_name + '</p>';
                        html_activity += '<hr class="[ margin-bottom ]">';
                        html_activity += '</div>'
                        break;
                    case '3':
                        html_activity = '<div class="margin-bottom">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="'+activity.friend_pic+'" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]">' + activity.friend_name + ' se ha unido a tu grupo: ' + activity.group_name + '</p>';
                        html_activity += '<hr class="[ margin-bottom ]">';
                        html_activity += '</div>'
                        break;
                }
                $(html_activity).appendTo('.actividad-grupo');
            });
        }// response
    );
}// getUserActiviy

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
            appId      : '293571087508858',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });
    };

	//console.log('invite friends ready');
    $(form + ' .j_invite_friends').on('click', function(){
        FB.ui({method: 'apprequests',
            message: 'te invitó a formar parte del intercambio navideño y recibir un descuento en tus compras.'
        }, function(response){
            $.each(response.to, function(i, friend_id){
                $(form).append('<input type="hidden" class="hidden_guest" name="invited_friends[]" value="' + friend_id + '">');
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



