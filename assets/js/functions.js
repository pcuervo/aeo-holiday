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
        outlook     : {show:true, text:"Outlook Calendar"},
        google      : {show:true, text:"Google Calendar"},
        yahoo       : {show:false, text:"Yahoo Calendar"},
        ical        : {show:true, text:"iCal Calendar"},
        hotmail     : {show:false, text:"Hotmail Calendar"},
        facebook    : {show:false, text:"Facebook Calendar"}
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
    $('body').css('padding-bottom', footerHeight );
}

/**
* Form Validation
* @return void
**/
function formValidation(forma){
    console.log(forma);
    $(forma).validate({
        submitHandler:function(){
            switch(forma){
                case '.j_edit_group_form':
                    editExchangeGroup();
                    break;
                case '.j-send-email':
                    send_coupon_email();
                    break;
                case '.j-send-message-form':
                    send_message_form();
                    break
                case '.j_group_form':
                    console.log('j_group_form');
                    createExchangeGroup();
                    break
            }
        },
        invalidHandler: function(event, validator) {
            console.log('invalid');
            console.log(event);
            console.log(validator);
        }
    });
}

function setLimitDateDesktop(){
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#fecha-intercambio.j-datepicker').datepicker({minDate: '+1d', dateFormat: 'yy-mm-dd'});
    $('#fecha-limite.j-datepicker').datepicker({minDate: '0', dateFormat: 'yy-mm-dd'});
    $('#fecha-intercambio').on('change', function(){
        var intercambioDate = new Date( $(this).val() );
        var limitDate = new Date(intercambioDate);
        limitDate.setDate(limitDate.getDate() - 1);
        $('#fecha-limite').attr('max', limitDate);
        $('#fecha-limite.j-datepicker').datepicker( "option", "maxDate", new Date( limitDate ) );
    });
}

function setLimitDateMobile(){
    $('#fecha-intercambio').on('change', function(){
        var date = $(this).val();
        var date = date.split('-');
        var year = date[0];
        var month = date[1];
        var day = date[2];
        var day = day-1;
        var fechaLimite = year+'-'+month+'-'+day;
        $('#fecha-limite').attr('max', fechaLimite);
    });
    var now = new Date();
    var hoy = ( now.getFullYear()+'-'+(now.getMonth()+ 1)+'-'+now.getDate() );
    var manana = ( now.getFullYear()+'-'+(now.getMonth()+ 1)+'-'+(now.getDate()+1) );
    $('#fecha-limite').attr('min', hoy);
    $('#fecha-intercambio').attr('min', manana);
}

//Datepicker
function runDatepicker(){
    if( $('.j-datepicker').length > 0 ){
        console.log(' datepicker! ');
        //$('.j-datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    }
}

//Isotope filtering
// init Isotope
function runIstitope(){
    var $container = $('.isotope').imagesLoaded( function() {
        $container.isotope({
            layoutMode: 'fitRows',
            itemSelector: '.j-item'
        });
    });
    var filters = {};
    $('#filters').on( 'click', '.btn', function() {
        var $this = $(this);
        // get group key
        var $buttonGroup = $this.parents('.button-group');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[ filterGroup ] = $this.attr('data-filter');
        // combine filters
        var filterValue = '';
        for ( var prop in filters ) {
          filterValue += filters[ prop ];
        }
        // set filter for Isotope
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
        });
    });
}

//Bootstrap Lightbox
function lightbox(){
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
}

//Eliminar Bootstrap Lightbox para desktop
function noLightbox(){
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
    });
}

//Eliminar talla 34 de largo para hombres si es escogen talla 38 de jeans
function quitarOption(){
    $('.male.talla-jeans').on('change', function(){
        if ( $(this).val() == '18' ){
            $('select.largo-jeans option[value="21"]').remove();
        }
    });
}

function showSubmit(){
    $('.j-mobile-video-input').on('change', function(event) {
        event.preventDefault();
        if ( $(this).val() != '' ){
            $('.j-mobile-video-button').show();
            showLoaderSubmitVideo();
        }
    });
}

function showLoaderSubmitVideo(){
    $('.j-mobile-video-button').on('click', function(event) {
        $('.loader-lightbox, .loader-lightbox .loader').show();
        console.log('loading...');
    });
}

/*****************************
	AJAX functions
 *****************************/
 /**
 * Send coupon by email to current user using AJAX
 * @return void
 */
function send_coupon_email(){
    var email_data = {};
    email_data['email'] = $('.j-send-email input').val();
    var url = '/dashboard/send_coupon_by_email';
    $.post(
        url,
        email_data,
        function(response){
            $('.j-send-email-notice').html('');
            $('.j-send-email-notice').html('Se ha enviado tu correo');
        }// response
    );
    ga('send', 'event', 'cupón', 'click', 'enviarCorreo');
}// send_coupon_email

 /**
 * Send message to secret friend
 * @return void
 */
function send_message_form(){
    var data = {};
    data['secret_friend_id'] = $('.j-secret_friend_id').val();
    data['message'] = $('.j-send-message-form textarea').val();
    data['group_friend_id'] = $('.j-group_friend_id').val();

    var url = '/secret_friends/send_message';
    $.post(
        url,
        data,
        function(response){
            window.location = '/secret_friends/view/' + data['group_friend_id'];
            $('.j-send-message-notice').html('');
            $('.j-send-message-notice').html('Se ha enviado tu mensaje');
        }// response
    );
    ga('send', 'event', 'cupón', 'click', 'enviarMsj');
}// send_coupon_email

/**
 * Create exchange group using AJAX
 * @return void
 */
function createExchangeGroup(){
    console.log('s');
    var hidden_guests = $('.hidden_guest').length;
    if(hidden_guests == 0){
        $('.j_invite_friends-notice').html('');
        $('.j_invite_friends-notice').html('Debes invitar al menos a un amigo para crear un grupo');
        return;
    }
    var group_data = $('.j_group_form').serialize();
    var url = localStorage.getItem('base_url') + 'dashboard/create_exchange_group';
    $('.loader-lightbox, .loader-lightbox .loader').show();
    $.post(
        url,
        group_data,
        function(response){
            console.log(response);
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
    var group_data = $('.j_edit_group_form').serialize();
    var url = localStorage.getItem('base_url') + 'dashboard/edit_exchange_group';
    $('.loader-lightbox, .loader-lightbox .loader').show();
    $.post(
        url,
        group_data,
        function(response){
            // TODO: Mostrar mensaje de que se guardó el grupo que reemplace alerta

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
                    var friend_url = localStorage.getItem('base_url') + 'secret_friends/create_message/' + friend.group_friend_id;
                    $('.j-modal ul').empty();
                    var secret_friend_html = '<li>';
                        secret_friend_html += '<a href="' + friend_url + '">';
                        secret_friend_html += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="' + friend.friend_picture + '" /><div class="[ three-quarter-width ] [ inline-block middle ]">';
                        secret_friend_html += '<p>' + friend.name + '</p>';
                        secret_friend_html += '<p>' + friend.group + '</p>';
                        secret_friend_html += '</div>';
                        secret_friend_html += '</a>';
                        secret_friend_html += '</li>';
                    $(secret_friend_html).appendTo('.j-modal ul');
                });
                $('.j-modal').show();
            }// response
        );
    });
}// showSecretFriends

 /**
 * Send notification to group administrators with pending friends
 * @return void
 */
function sendReminder(){
    $('.j-send-reminder').on('click', function(e){
        e.preventDefault();
        console.log('click');
        var url = '/cms/send_invitation_reminder';
        $.get(
            url,
            function(response){
                console.log(response);
            }// response
        );
    });
}// sendReminder

/**
 * Send Zencoder POST
 * @return void
 */
function videoPost(url){
    if(url.indexOf('https:') > -1){
        var html_video = '<video controls><source src="' + url + '" type="video/mp4"></video>';
        $(html_video).appendTo('.j-video');
        $('video').after('<div class="[ text-center ]"><a class="[ btn btn-primary btn-no ]" href="/dashboard"><span>Regresar</span></a></div>');
        return;
    }
    var request = {
        input: url
    }
    $.ajax({
        type: 'POST',
        url: 'https://app.zencoder.com/api/v2/jobs',
        headers:{ 'Zencoder-Api-Key' : '72d3c165590c75ac744e019d23cc22e1'},
        dataType: 'json',
        data: JSON.stringify(request),
        success: function(response) {
            var html_video = '<video controls><source src="' + response.outputs[0].url + '" type="video/mp4"></video>';
            $(html_video).appendTo('.j-video');
        },
        error: function(response){
            //console.log(response);
        }
    });
}// videoPost

/**
 * Get user's activity
 * @return void
 */
function getUserActivity(){
    var url = localStorage.getItem('base_url') + 'dashboard/get_user_activity/';
    $('.actividad-mensajes .loader').show();
    $.get(
        url,
        function(response){
            $('.actividad-mensajes .loader').hide();
            var activity_json = $.parseJSON(response);
            $.each(activity_json, function(i, activity){
                var html_activity;
                switch(activity.activity_type){
                    case '1':
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<p class="[ text-center ]">Has creado el grupo: ' + activity.group_name + '</p>';
                        html_activity += '</div>';
                        break;
                    case '2':
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="'+activity.friend_pic+'" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]">' + activity.friend_name + ' se ha unido a tu grupo: ' + activity.group_name + '</p>';
                        html_activity += '</div>';
                        break;
                    case '3':
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="'+activity.friend_pic+'" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]">' + activity.friend_name + ' ha rechazado la invitactión al grupo: ' + activity.group_name + '</p>';
                        html_activity += '</div>';
                        break;
                    case '5':
                        console.log(activity);
                        var url_video = localStorage.getItem('base_url') + 'secret_friends/view_video/'+activity.group_friend_id;
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<p class="[ text-center ]">Tienes un video de tu amigo secreto.</p>';
                        html_activity += '<div class="[ text-center ]"><a class="[ btn btn-primary btn-go ]" href="' +url_video+ '"><span>Ver video</span></a></div>';
                        html_activity += '</div>';
                        break;
                }
                $(html_activity).appendTo('.actividad-grupo');
            });
        }// response
    );
}// getUserActivity

/**
 * Accepts a group invitation
 * @return void
 */
function acceptGroupInvitation(){
    $('.j-accept-invitation').on('click', function(e){
        e.preventDefault();
        var invitacion = $(this).closest('.invitacion-intercambio');
        var loader = $(this).closest('.invitacion-intercambio').find('.loader');
        loader.show();
        var group_data = {};
        var url = localStorage.getItem('base_url') + 'dashboard/accept_invitation';
        group_data['group_id'] = $(this).data('group');
        $.post(
            url,
            group_data,
            function(response){
                // Agregar feedback
                window.location = 'dashboard/view_group/'+group_data['group_id'];
                $(invitacion).after('<p class="[ text-center ]">Has aceptado la invitación.</p>');
                invitacion.remove();
            }// response
        );
        ga('send', 'event', 'solicitudes', 'click', 'aceptarIntercambio');
    });
}// acceptGroupInvitation

/**
 * Declines a group invitation
 * @return void
 */
function declineGroupInvitation(){
    $('.j-decline-invitation').on('click', function(e){
        e.preventDefault();
        var invitacion = $(this).closest('.invitacion-intercambio');
        var loader = $(this).closest('.invitacion-intercambio').find('.loader');
        var group_data = {};
        var url = localStorage.getItem('base_url') + 'dashboard/decline_invitation';
        group_data['group_id'] = $(this).data('group');
        group_data['invited_fb_user_id'] = $(this).data('friend');
        console.log('group_data');
        $.post(
            url,
            group_data,
            function(response){
                // Agregar feedback
                console.log(response);
                $(invitacion).after('<p class="[ text-center ]">Has rechazado la invitación.</p>');
                invitacion.remove();
            }// response
        );
        ga('send', 'event', 'solicitudes', 'click', 'rechazarIntercambio');
    });
}// declineGroupInvitation

/**
 * Remove a friend from group
 * @return void
 */
function removeGroupFriend(){
    $('.j-remove-friend').on('click', function(e){
        var este = $(this);
        e.preventDefault();
        var group_friend_data = {};
        var url = localStorage.getItem('base_url') + 'dashboard/remove_group_friend';
        group_friend_data['group_id'] = $(this).data('group');
        group_friend_data['invited_fb_user_id'] = $(this).data('friend');
        console.log(group_friend_data);
        $.post(
            url,
            group_friend_data,
            function(response){
                 var msg = response;
                console.log(msg);

                if(msg.redirect != "0")
                    window.location = '/dashboard/view_group/'+invited_friend_data['group_id'];

                este.closest('li').after('<p>Se eliminó del intercambio.</p>');
                este.closest('li').remove();
            }// response
        );
    });
}// removeGroupFriend

/**
 * Remove an invited friend from group
 * @return void
 */
function removeInvitedFriend(){
    $('.j-remove-invitation').on('click', function(e){
        e.preventDefault();
        var este = $(this);
        var invited_friend_data = {};
        var url = localStorage.getItem('base_url') + 'dashboard/remove_invited_friend';

        invited_friend_data['group_id'] = $(this).data('group');
        invited_friend_data['invited_fb_user_id'] = $(this).data('friend');
        console.log(invited_friend_data);
        $.post(
            url,
            invited_friend_data,
            function(response){
                var msg = response;

                if(msg.redirect != "0")
                    window.location = '/dashboard/view_group/'+invited_friend_data['group_id'];

                este.closest('li').after('<p>Se eliminó del intercambio.</p>');
                este.closest('li').remove();
            }// response
        );
    });
}// removeInvitedFriend

function setAccessToken(access_token){
    var user = {};
    user['access_token'] = access_token;
    var url = '/login/set_access_token';
    $.post(
        url,
        user,
        function(response){
           window.location = '/dashboard';
           console.log(response);
        }// response
    );
}// setAccessToken

/*****************************
	Facebook API functions
 *****************************/
/**
 * Load the SDK asynchronously
 * @return void
 */
function loadFacebookSdk(){
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '723683944395366',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });
        FB.Canvas.setSize({height:600});
        setTimeout("FB.Canvas.setAutoGrow()",500);

        if(localStorage.getItem('current_view') == 'login')
            checkLoginStatus();
    };

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
    $(form + ' .j_invite_friends').on('click', function(){
        FB.ui({method: 'apprequests',
            message: 'Te invito a formar parte del intercambio navideño y recibir un descuento en tus compras.'
        }, function(response){
            $('.j_invite_friends.error').remove();
            $.each(response.to, function(i, friend_id){
                console.log(response.to);
                var friend = $('input[value="'+friend_id+'"]');
                if ( $(friend).length == 0 ){
                    $(form).append('<input type="hidden" class="hidden_guest" name="invited_friends[]" value="' + friend_id + '">');
                    getInvitedFriendData(friend_id);
                }
            })
        });
    });
}// inviteFriends

/**
 * Invite friends to the app using Facebook
 * @return void
 */
function reinviteFriends(friend_ids){
    $('.j-resend-invitations').on('click', function(e){
        e.preventDefault();
        console.log('click');
        FB.ui({method: 'apprequests',
            message: 'Te invito a formar parte del intercambio navideño y recibir un descuento en tus compras.',
            to: friend_ids,
        }, function(response){

        });
    });
}// inviteFriends

function getInvitedFriendData(fb_id){
    var user_data = {};
    FB.api('/'+ fb_id + '?access_token=723683944395366|2961c8a6e6af8194d36a8c9b56825b49', function(response) {
        //console.log(response);
        var invited_friends = [];
        var flag = false;
        if(response.id){

            var name = response.first_name + ' ' + response.last_name;

            if(invited_friends.indexOf(name) > -1){
                flag = true;
            } else {
                invited_friends.push(name);
            }

            if ( ! flag ){
                $('.j_invite_friends').after('<p class="[ agregado ]">Se agregó: ' + name + ' al intercambio.</p>');
                $('.j_invite_friends-notice').html('');
                $('#modalCrearIntercambio').modal('show');
            }
        }
    });
}// getInvitedFriendName

function getInvitedFriendPic(fb_id){
    FB.api('/'+ fb_id + '/picture?access_token=723683944395366|2961c8a6e6af8194d36a8c9b56825b49', function(response) {
        if(response){
            return response.url;
        }
    });
}// getInvitedFriendName

function shareFB(){
    $('.share-button').on('click', function(event) {
        event.preventDefault();
        FB.ui({
          method: 'share',
          href:'https://dev-aeo-holiday.flockos.com/',
        }, function(response){});
    });
}

function checkLoginStatus(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire

            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            setAccessToken(accessToken);

        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            // but has not authenticated your app
            $('.j-checking-login-status').hide();
            $('.j-login-form').show();

        } else {
            // the user isn't logged in to Facebook.
            $('.j-checking-login-status').hide();
            $('.j-login-form').show();
        }
        console.log(response);
    });
}

//
function initWebCam(){
    $("#webcam").scriptcam({
        path:  localStorage.getItem('base_url') + 'assets/scriptcam/',
        fileReady:fileReady,
        cornerRadius:0,
        cornerColor:'e3e5e2',
        onError:onError,
        showMicrophoneErrors:false,
        showDebug:true,
        onWebcamReady:onWebcamReady,
        fileName:'demo549066',
        connected:showRecord
    });
    function remaining(value) {
        $('.j-timer').html(value);
    }
    function showRecord() {
        $( "#recordStartButton" ).attr( "disabled", false );
    }
    function startRecording() {
        $( "#recordStartButton" ).attr( "disabled", true );
        $( "#recordStopButton" ).attr( "disabled", false );
        $( "#recordPauseResumeButton" ).attr( "disabled", false );
        $.scriptcam.startRecording();
        //stopRecording();
    }
    function closeCamera() {
        $("#recordStopButton" ).attr( "disabled", true );
        $.scriptcam.closeCamera();
        $('#message').html('Espera un momento, estamos convirtiendo tu video...');
    }
    function fileReady(fileName) {
        $('#recorder').hide();
        fileName2=fileName.replace('mp4','gif');
        $('#message').html('Gracias por grabar un video para tu amigo secreto.');
        var fileNameNoExtension=fileName.replace(".mp4", "");
        convertWebcamVideo(fileName);
    }
    function onError(errorId,errorMsg) {
        alert(errorMsg);
    }
    function onWebcamReady(cameraNames,camera,microphoneNames,microphone,volume) {
        console.log(cameraNames);
        console.log(camera);
        console.log(microphoneNames);
        console.log(microphone);
        console.log(volume);
        $( "#slider" ).slider( "option", "disabled", false );
        $( "#slider" ).slider( "option", "value", volume );
        $.each(cameraNames, function(index, text) {
            $('#cameraNames').append( $('<option></option>').val(index).html(text) )
        });
        $('#cameraNames').val(camera);
        $.each(microphoneNames, function(index, text) {
            $('#microphoneNames').append( $('<option></option>').val(index).html(text) )
        });
        $('#microphoneNames').val(microphone);
    }

    $('#recordStartButton').click(function(){
        startRecording();
    });

    $('#recordStopButton').click(function(){
        closeCamera();
    });
    //Timer para detener el video después de X Segundos
    function stopRecording(){
        var myVar = setInterval(function(){timer()}, 1000);
        var segundos = 15;
        function timer() {
            segundos--;
            $('.j-timer').html(segundos);
            if ( segundos == 0){
                closeCamera();
                myStopFunction();
            }
        }
        function myStopFunction() {
            clearInterval(myVar);
        }
    }
}

/**
 * Send Zencoder POST and convert video url
 * @return void
 */
function convertWebcamVideo(url){
    var request = {
        input: url
    }

    $.ajax({
        type: 'POST',
        url: 'https://app.zencoder.com/api/v2/jobs',
        headers:{ 'Zencoder-Api-Key' : '72d3c165590c75ac744e019d23cc22e1'},
        dataType: 'json',
        data: JSON.stringify(request),
        success: function(response) {
            saveWebcamVideo(response.outputs[0]['url']);
            // GUARDAR ESTA URL VIDEO EN EL SERVIDOR

        },
        error: function(response){
            //console.log(response);
        }
    });
}// convertWebcamVideo

/**
 * Send Zencoder POST and save webcam video
 * @return void
 */
function saveWebcamVideo(video_url){
    var secret_friend_data = {};
    var url = localStorage.getItem('base_url') + 'secret_friends/save_webcam_video';
    secret_friend_data['secret_friend_id'] = $('input[name="secret_friend_id"]').val();
    secret_friend_data['group_friend_id'] = $('input[name="group_friend_id"]').val();
    secret_friend_data['video_url'] = video_url;

    $.post(
        url,
        secret_friend_data,
        function(response){
            var secret_friend_url = localStorage.getItem('base_url') + 'secret_friends/view/' + secret_friend_data['group_friend_id'] ;
            var url = '/secret_friends/view/'+secret_friend_data['group_friend_id'];
            $('#message').html('<div class="[ text-center ]"><a class="[ btn btn-primary btn-no ]" href="'+url+'"><span>regresar</span></a></div>');
        }// response
    );

}// saveWebcamVideo


/*****************************
    Functions for CMS
 *****************************/

 /**
 * Gets reports in a given range of dates
 * @return void
 */
function getAppReports(){

    $('.j-get-reports button').on('click', function(e){
        e.preventDefault();

        var dates = {}
        // TODO: Meter validación fechas
        dates['start_date'] = $('input[name="start_date"]').val();
        dates['end_date'] = $('input[name="end_date"]').val();

        getAcceptedInvitations(dates);
        getPendingInvitations(dates);
        getRejectedInvitations(dates);
        getSentMessages(dates);
        getUsers(dates);

    });
}// getAppReports

 /**
 * Fetch accepted invitations by date
 * array dates
 * @return void
 */
function getAcceptedInvitations(dates){
    var url = '/cms/get_accepted_invitations_by_date';
    $('.j-invitaciones-aceptadas').html('');
    $.post(
        url,
        dates,
        function(response){
            if(response == 0){
                $('.j-invitaciones-aceptadas').html('Sin resultados');
                return;
            }

            var invitationsJson = $.parseJSON(response);
            var dates = [];
            var num_invitations = []
            $.each(invitationsJson, function(i, val){
                dates.push(val.date);
                num_invitations.push(val.num_invitations);
            });

            display_accepted_invitations_per_date(dates, num_invitations);

        }
    );
}// getAcceptedInvitations

/**
 * Fetch pending invitations by date
 * array dates
 * @return void
 */
function getPendingInvitations(dates){
    var url = '/cms/get_pending_invitations_by_date';
    $('.j-invitaciones-pendientes').html('');
    $.post(
        url,
        dates,
        function(response){
            if(response == 0){
                $('.j-invitaciones-pendientes').html('Sin resultados');
                return;
            }

            var invitationsJson = $.parseJSON(response);
            var dates = [];
            var num_invitations = []
            $.each(invitationsJson, function(i, val){
                dates.push(val.date);
                num_invitations.push(val.num_invitations);
            });

            display_pending_invitations_per_date(dates, num_invitations);

        }
    );
}// getPendingInvitations

/**
 * Fetch rejected invitations by date
 * array dates
 * @return void
 */
function getRejectedInvitations(dates){
    var url = '/cms/get_rejected_invitations_by_date';
    $('.j-invitaciones-rechazadas').html('');
    $.post(
        url,
        dates,
        function(response){
            if(response == 0){
                $('.j-invitaciones-rechazadas').html('Sin resultados');
                return;
            }

            var invitationsJson = $.parseJSON(response);
            var dates = [];
            var num_invitations = []
            $.each(invitationsJson, function(i, val){
                dates.push(val.date);
                num_invitations.push(val.num_invitations);
            });

            display_rejected_invitations_per_date(dates, num_invitations);

        }
    );
}// getRejectedInvitations

/**
 * Fetch sent messages by date
 * array dates
 * @return void
 */
function getSentMessages(dates){
    var url = '/cms/get_sent_messages_by_date';
    $('.j-mensajes-enviados').html('');
    $.post(
        url,
        dates,
        function(response){
            if(response == 0){
                $('.j-mensajes-enviados').html('Sin resultados');
                return;
            }
            var messagesJson = $.parseJSON(response);
            var dates = [];
            var sent_messages = []
            $.each(messagesJson, function(i, val){
                dates.push(val.date);
                sent_messages.push(val.sent_messages);
            });

            display_sent_messages_per_date(dates, sent_messages);

        }
    );
}// getSentMessages

/**
 * Fetch users by date
 * array dates
 * @return void
 */
function getUsers(dates){
    var url = '/cms/get_users_by_date';
    $('.j-usuarios').html('');
    $.post(
        url,
        dates,
        function(response){
            if(response == 0){
                $('.j-usuarios').html('Sin resultados');
                return;
            }

            var usersJson = $.parseJSON(response);
            var dates = [];
            var num_users = []
            $.each(usersJson, function(i, val){
                dates.push(val.date);
                num_users.push(val.num_users);
            });

            display_users_per_date(dates, num_users);

        }
    );
}// getUsers

 /**
 * Displays accepted invitations by date
 * array dates
 * @return void
 */
function display_accepted_invitations_per_date(dates, invitations){
    var data = {
        labels: dates,
        datasets: [
            {
                label: "Usuarios vs tiempo",
                fillColor: "rgba(255, 255, 255, 0.5)",
                strokeColor: "rgba(255, 255, 255, 1)",
                pointColor: "rgba(255, 255, 255, 0.8)",
                data: invitations
            }
        ]
    };
    var ctx = $('#accepted_invitations_per_date').get(0).getContext('2d');
    new Chart(ctx).Bar(data);
}// display_accepted_invitations_per_date

 /**
 * Displays pending invitations by date
 * array dates
 * @return void
 */
function display_pending_invitations_per_date(dates, invitations){
    var data = {
        labels: dates,
        datasets: [
            {
                label: "Usuarios vs tiempo",
                fillColor: "rgba(255, 255, 255, 0.5)",
                strokeColor: "rgba(255, 255, 255, 1)",
                pointColor: "rgba(255, 255, 255, 0.8)",
                data: invitations
            }
        ]
    };
    var ctx = $('#pending_invitations_per_date').get(0).getContext('2d');
    new Chart(ctx).Bar(data);
}// display_pending_invitations_per_date

 /**
 * Displays rejected invitations by date
 * array dates
 * @return void
 */
function display_rejected_invitations_per_date(dates, invitations){
    var data = {
        labels: dates,
        datasets: [
            {
                label: "Usuarios vs tiempo",
                fillColor: "rgba(255, 255, 255, 0.5)",
                strokeColor: "rgba(255, 255, 255, 1)",
                pointColor: "rgba(255, 255, 255, 0.8)",
                data: invitations
            }
        ]
    };
    var ctx = $('#rejected_invitations_per_date').get(0).getContext('2d');
    new Chart(ctx).Bar(data);
}// display_rejected_invitations_per_date

 /**
 * Displays sent messages by date
 * array dates
 * @return void
 */
function display_sent_messages_per_date(dates, invitations){
    var data = {
        labels: dates,
        datasets: [
            {
                label: "Usuarios vs tiempo",
                fillColor: "rgba(255, 255, 255, 0.5)",
                strokeColor: "rgba(255, 255, 255, 1)",
                pointColor: "rgba(255, 255, 255, 0.8)",
                data: invitations
            }
        ]
    };
    var ctx = $('#sent_messages_per_date').get(0).getContext('2d');
    new Chart(ctx).Bar(data);
}// display_sent_messages_per_date

 /**
 * Displays accepted invitations by date
 * array dates
 * @return void
 */
function display_users_per_date(dates, invitations){
    var data = {
        labels: dates,
        datasets: [
            {
                label: "Usuarios vs tiempo",
                fillColor: "rgba(255, 255, 255, 0.5)",
                strokeColor: "rgba(255, 255, 255, 1)",
                pointColor: "rgba(255, 255, 255, 0.8)",
                data: invitations
            }
        ]
    };
    var ctx = $('#users_per_date').get(0).getContext('2d');
    new Chart(ctx).Bar(data);
}// display_users_per_date

function dateRange(){
    $('.j-start_date').datepicker({
      changeMonth: true,
      numberOfMonths: 1,
      dateFormat: 'yy-mm-dd',
      onClose: function( selectedDate ) {
        $('.j-end_date').datepicker( "option", "minDate", selectedDate );
      }
    });
    $('.j-end_date').datepicker({
      changeMonth: true,
      numberOfMonths: 3,
      dateFormat: 'yy-mm-dd',
      onClose: function( selectedDate ) {
        $('j-start_date').datepicker( "option", "maxDate", selectedDate );
      }
    });
}// dateRange







