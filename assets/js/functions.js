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
        outlook   : {show:true, text:"Outlook Calendar"},
        google    : {show:true, text:"Google Calendar"},
        ical      : {show:true, text:"iCal Calendar"},
        facebook  : {show:false, text:"Facebook Event"},
        dropdown  : {order:"google,ical,outlook"},
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
    $('body').css('padding-bottom', footerHeight );
}

/**
* Form Validation
* @return void
**/
function formValidation(forma){
    $(forma).validate({
        submitHandler:function(){
            switch(forma){
                case '.j_group_form':
                    createExchangeGroup();
                    break;
                case '.j_edit_group_form':
                    editExchangeGroup();
                    break;
            }
        }
    });
}

function setLimitDate(){
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
}

//Datepicker
function runDatepicker(){
    $('.j-datepicker').datepicker();
}

//Isotope filtering
// init Isotope
function runIstitope(){
    var $container = $('.isotope').imagesLoaded( function() {
        $container.isotope({
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

function dateRange(){
    $('.j-start_date').datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      dateFormat: 'yy-mm-dd',
      onClose: function( selectedDate ) {
        $('.j-end_date').datepicker( "option", "minDate", selectedDate );
      }
    });
    $('.j-end_date').datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      dateFormat: 'yy-mm-dd',
      onClose: function( selectedDate ) {
        $('j-start_date').datepicker( "option", "maxDate", selectedDate );
      }
    });
}

function total_accepted_invitations(){
    console.log('total_accepted_invitations');
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Usuarios vs tiempo",
                fillColor: "rgba(162, 43, 56, 0.2)",
                strokeColor: "rgba(162, 43, 56, 1)",
                pointColor: "rgba(162, 43, 56, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(162, 43, 56, 1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    var ctx = $('#total_accepted_invitations').get(0).getContext('2d');
    new Chart(ctx).Bar(data);
}


/*****************************
	AJAX functions
 *****************************/
 /**
 * Send coupon by email to current user using AJAX
 * @return void
 */
function send_coupon_email(){

    $('.j-send-email a').on('click', function(e){
        e.preventDefault();
        var email_data = {};
        email_data['email'] = $('.j-send-email input').val();
        var url = '/dashboard/send_coupon_by_email';
        $.post(
            url,
            email_data,
            function(response){
                $('<p>Se ha enviado tu correo</p>').appendTo('.j-send-email');
                //var coupon_url = localStorage.getItem('base_url') + 'dashboard/view_coupon/ng';
                //window.location = coupon_url;
            }// response
        );
        ga('send', 'event', 'cupón', 'click', 'enviarCorreo');
    });
}// send_coupon_email

/**
 * Create exchange group using AJAX
 * @return void
 */
function createExchangeGroup(){
    var hidden_guests = $('.hidden_guest').length;
    if(hidden_guests == 0){
        $('.j_invite_friends').after('<p class="[ j_invite_friends error ]">Debes invitar al menos a un amigo para crear un grupo</p>');
        return;
    }
    var group_data = $('.j_group_form').serialize();
    var url = localStorage.getItem('base_url') + 'dashboard/create_exchange_group';
    $('.loader-lightbox, .loader').show();
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
    var group_data = $('.j_edit_group_form').serialize();
    var url = localStorage.getItem('base_url') + 'dashboard/edit_exchange_group';

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

        console.log(perfect_fit_data);
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
    $('.actividad-grupo .loader').show();
    $.get(
        url,
        function(response){
            $('.actividad-grupo .loader').hide();
            var mensajes_json = $.parseJSON(response);
            var url_mensajes = localStorage.getItem('base_url') + 'secret_friends/view_messages/';
            $.each(mensajes_json, function(i, val){
                var html_mensaje = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                    html_mensaje += '<p class="[ text-center ]">Tienes un mensaje de tu amigo secreto del grupo ' + val.group_name + '</p>';
                    html_mensaje += '<div class="[ text-center ]"><a class="[ btn btn-primary btn-go ]" href="' + url_mensajes + '"><span>Ver mensaje</span></a></div>';
                    html_mensaje += '</div>';
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
                        html_activity += '</div>'
                        break;
                    case '2':
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="'+activity.friend_pic+'" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]">' + activity.friend_name + ' se ha unido a tu grupo: ' + activity.group_name + '</p>';
                        html_activity += '</div>'
                        break;
                    case '3':
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<img class="[ one-quarter-width ] [ img-circle user-photo ] [ inline-block middle ]" src="'+activity.friend_pic+'" alt="" class="[ user-photo ]"><p class="[ three-quarter-width ] [ inline-block middle ]">' + activity.friend_name + ' ha rechazado la invitactión al grupo: ' + activity.group_name + '</p>';
                        html_activity += '</div>'
                        break;
                    case '5':
                        html_activity = '<div class="[ margin-bottom ] [ actividad-aviso ]">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<p class="[ text-center ]">Tienes un video de tu amigo secreto.</p>';
                        html_activity += '</div>'
                        break;
                }
                $(html_activity).appendTo('.actividad-grupo');
            });
        }// response
    );
}// getUserActiviy

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
        //console.log(group_data);
        $.post(
            url,
            group_data,
            function(response){
                // Agregar feedback
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
        e.preventDefault();

        var group_friend_data = {};
        var url = localStorage.getItem('base_url') + 'dashboard/remove_group_friend';

        group_friend_data['group_id'] = $(this).data('group');
        group_friend_data['fb_friend_id'] = $(this).data('friend_id');

        console.log(group_friend_data);
        $.post(
            url,
            group_friend_data,
            function(response){
                console.log(response);
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

        var invited_friend_data = {};
        var url = localStorage.getItem('base_url') + 'dashboard/remove_invited_friend';

        invited_friend_data['group_id'] = $(this).data('group');
        invited_friend_data['invited_fb_user_id'] = $(this).data('fb-user');

        console.log(invited_friend_data);
        $.post(
            url,
            invited_friend_data,
            function(response){
                console.log(response);
            }// response
        );
    });
}// removeInvitedFriend

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

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '293571087508858',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });
        FB.Canvas.setSize({height:600});
        setTimeout("FB.Canvas.setAutoGrow()",500);
    };
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
            $.each(response.to, function(i, friend_id){
                $(form).append('<input type="hidden" class="hidden_guest" name="invited_friends[]" value="' + friend_id + '">');
                getInvitedFriendData(friend_id);
            });
            $('.j_invite_friends.error').remove();
        });
    });
}// inviteFriends

function getInvitedFriendData(fb_id){
    var user_data = {};
    FB.api('/'+ fb_id + '?access_token=293571087508858|21d0205237f8a0afec65c14533565773', function(response) {
        console.log(response);
        if(response.id){
            var name = response.first_name + ' ' + response.last_name;
            $('.j_invite_friends').after('<p>Se agregó: ' + name + ' al intercambio.</p>');
        }

    });

}// getInvitedFriendName

function getInvitedFriendPic(fb_id){
    FB.api('/'+ fb_id + '/picture?access_token=293571087508858|21d0205237f8a0afec65c14533565773', function(response) {
        if(response){
            return response.url;
        }
    });
}// getInvitedFriendName

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
        stopRecording();
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
            console.log(response);
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
    console.log('getAppReports ready...');

    $('.j-get-reports button').on('click', function(e){
        e.preventDefault();

        var dates = {}
        // TODO: Meter validación fechas
        dates['start_date'] = $('input[name="start_date"]').val();
        dates['end_date'] = $('input[name="end_date"]').val();

        console.log(dates);
        getAcceptedInvitations(dates);

    });
}// getAppReports

function getAcceptedInvitations(dates){
    var url = '/cms/get_accepted_invitations_by_date';
    $.post(
        url,
        dates,
        function(response){

            console.log(response);

        }
    );
}// getAcceptedInvitations






