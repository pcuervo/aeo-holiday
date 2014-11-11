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
                case 'editExchangeGroup':
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

    // store filter for each group
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


/*****************************
	AJAX functions
 *****************************/
/**
 * Create exchange group using AJAX
 * @return void
 */
function createExchangeGroup(){
    
    var hidden_guests = $('.hidden_guest').length;
    if(hidden_guests == 0){
        $('.j_invite_friends').after('<p class="error">Debes invitar al menos a un amigo para crear un grupo</p>');
        return;
    }
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
                    case '5':
                        html_activity = '<div class="margin-bottom">';
                        html_activity += '<h4 class="[ text-center ]">' + activity.action + '</h4>';
                        html_activity += '<p class="[ text-center ]">Tienes un video de tu amigo secreto.</p>';
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

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '293571087508858',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });
        FB.Canvas.setAutoGrow(3000);
    };
}

/**
 * Invite friends to the app using Facebook
 * @return void
 */
function inviteFriends(form){
    
	//console.log('invite friends ready');
    $(form + ' .j_invite_friends').on('click', function(){
        FB.ui({method: 'apprequests',
            message: 'Te invito a formar parte del intercambio navideño y recibir un descuento en tus compras.'
        }, function(response){
            $.each(response.to, function(i, friend_id){
                $(form).append('<input type="hidden" class="hidden_guest" name="invited_friends[]" value="' + friend_id + '">');
                getInvitedFriendData(friend_id);
            });            
        });
    });
}// inviteFriends

function getInvitedFriendData(fb_id){
    var user_data = {};
    FB.api('/'+ fb_id + '?access_token=CAAELAFhjJXoBANJxcwb0RxZAOgkni7WNhvT6qpxSmFG4vntMnI5H8ese9whs8SkgYzGt9jA1Wlt3YnhO6PjPaA67oLM3WBXVSFWSNHfHgsHXQaqPXCVgcHyCoY52ssKJ7QLinGicNyA2SPZBr1EtrnrbQizZAm4hMeCeyNeB4ICFlI4FJZBVFpWDMh5pC6AYJ0JAsAWtCPyOiTk9HZC5L', function(response) {

        console.log(response);
        if(response.id){
            var name = response.first_name + ' ' + response.last_name;
            $('.j_invite_friends').after('<p>Se agregó: ' + name + ' al intercambio.</p>');
        }
        
    });

}// getInvitedFriendName

function getInvitedFriendPic(fb_id){
    FB.api('/'+ fb_id + '/picture?access_token=CAAELAFhjJXoBANJxcwb0RxZAOgkni7WNhvT6qpxSmFG4vntMnI5H8ese9whs8SkgYzGt9jA1Wlt3YnhO6PjPaA67oLM3WBXVSFWSNHfHgsHXQaqPXCVgcHyCoY52ssKJ7QLinGicNyA2SPZBr1EtrnrbQizZAm4hMeCeyNeB4ICFlI4FJZBVFpWDMh5pC6AYJ0JAsAWtCPyOiTk9HZC5L', function(response) {
        if(response){
            return response.url;
        }
    });
}// getInvitedFriendName



