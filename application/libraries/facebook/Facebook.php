<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( session_status() == PHP_SESSION_NONE ) {
  session_start();
}

// Autoload the required files
require_once( APPPATH . 'libraries/facebook/vendor/autoload.php' );

use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookCanvasLoginHelper;
use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\GraphUser;


class Facebook {
    var $ci;
    var $helper;
    var $session;
    var $permissions;

    /**
     * Facebook constructor
     **/
    public function __construct() {
        $this->ci =& get_instance();
        $this->permissions = $this->ci->config->item('permissions', 'facebook');

        // Initialize the SDK
        FacebookSession::setDefaultApplication( $this->ci->config->item('api_id', 'facebook'), $this->ci->config->item('app_secret', 'facebook') );

        // Create the login helper and replace REDIRECT_URI with your URL
        $this->helper = new FacebookRedirectLoginHelper( $this->ci->config->item('redirect_url', 'facebook') );
        //$this->helper = new FacebookCanvasLoginHelper();

        //var_dump($this->helper);
        if ( $this->ci->session->userdata('fb_token') ) {
            $this->session = new FacebookSession( $this->ci->session->userdata('fb_token') );
            // Validate the access_token to make sure it's still valid
            try {
                if ( ! $this->session->validate() ) {
                  $this->session = null;
                }
            } catch ( Exception $e ) {
                // Catch any exceptions
                // $this->session = null;
                $this->session = $this->helper->getSessionFromRedirect();
            }
        } else {
            // No session exists
            try {
                $this->session = $this->helper->getSessionFromRedirect();
            } catch( FacebookRequestException $ex ) {
                // When Facebook returns an error
            } catch( Exception $ex ) {
                // When validation fails or other local issues
            }// try
        }

        if ( $this->session ) {
            $this->ci->session->set_userdata( 'fb_token', $this->session->getToken() );
            $this->session = new FacebookSession( $this->session->getToken() );
        } else {

        }
    }// constructor

    /**
    * Returns the login URL.
    */
    public function login_url() {
        return $this->helper->getLoginUrl( $this->permissions );
    }// login_url

    /**
    * Returns the current user's info as an array.
    * @return mixed $user or error
    */
    public function get_user() {
        if ( $this->session ) {
            // Graph API to request user data
            $request = ( new FacebookRequest( $this->session, 'GET', '/me' ) )->execute();

            // Get response as an array
            $user = $request->getGraphObject()->asArray();

            return $user;
        }
        return false;
    }// get_user

    /**
    * Returns the a Facebook user
    * @param string $fb_user_id
    * @return mixed $user or error
    */
    public function get_user_by_id($fb_user_id) {
        if ( $this->session ) {
            // Graph API to request user data
            $request = ( new FacebookRequest( $this->session, 'GET', '/'.$fb_user_id ) )->execute();

            // Get response as an array
            $user = $request->getGraphObject()->asArray();

            return $user;
        }

        return FALSE;
    }// get_user

    /**
    * Returns the URL of the current user's profile picture
    * @param string $url or false
    */
    public function get_user_profile_pic() {
        if ( $this->session ) {
            // Graph API to request user data
            $request = ( new FacebookRequest( $this->session, 'GET', '/me/picture?redirect=false&height=350&type=square&width=350' ) )->execute();

            // Get response as an array
            $user = $request->getGraphObject()->asArray();

            return $user['url'];
        }

        return FALSE;
    }// get_user

    /**
    * Returns the URL of a user's profile picture
    * @param string $url or false
    */
    public function get_user_profile_pic_by_id($fb_user_id) {
        if ( $this->session ) {
            // Graph API to request user data
            $request = ( new FacebookRequest( $this->session, 'GET', '/'.$fb_user_id.'/picture?redirect=false&height=350&type=square&width=350' ) )->execute();

            // Get response as an array
            $user = $request->getGraphObject()->asArray();

            return $user['url'];
        }

        return FALSE;
    }// get_user

    /**
    * Send Facebook notification to a user with a video url
    * @param string $fb_user_id, int $to_group_friend_id
    */
    public function send_video_notification($fb_user_id, $to_group_friend_id) {
        $session = FacebookSession::newAppSession();
        if ( $session ) {
            $response = ( new FacebookRequest($session, 'POST', '/'.$fb_user_id.'/notifications',  array(
                    'template' => 'Tu amigo secreto te envió un video.',
                    'access_token' => '723683944395366|2961c8a6e6af8194d36a8c9b56825b49'
                ) ) )->execute();

            return $response;
        }

    }// send_video_notification

    /**
    * Send Facebook notification to a user with a video url
    * @param string $fb_user_id, int $to_group_friend_id
    */
    public function send_message_notification($fb_user_id) {
        $session = FacebookSession::newAppSession();
        if ( $session ) {
            $response = ( new FacebookRequest($session, 'POST', '/'.$fb_user_id.'/notifications',  array(
                    'template' => 'Tu amigo secreto te ha enviado un mensaje.',
                    'access_token' => '723683944395366|2961c8a6e6af8194d36a8c9b56825b49'
                ) ) )->execute();

            return $response;
        }

    }// send_message_notification

    /**
    * Send Facebook notification to all members of a closed group
    * @param array $fb_user_id
    */
    public function send_group_notification($fb_user_id) {
        $session = FacebookSession::newAppSession();
        if ( $session ) {
            $response = ( new FacebookRequest($session, 'POST', '/'.$fb_user_id.'/notifications',  array(
                'template' => 'Descubre quién es tu amigo secreto dando click.',
                'access_token' => '723683944395366|2961c8a6e6af8194d36a8c9b56825b49'
            ) ) )->execute();
            return 1;
        }
        return 0;
    }// send_group_notification

    /**
    * Send Facebook notification to admin when an invited friend accepts/rejects notification.
    * @param array $fb_user_id
    */
    public function send_invitation_status_notification($fb_user_id, $friend, $action, $group) {
        $session = FacebookSession::newAppSession();
        if ( $session ) {
            $response = ( new FacebookRequest($session, 'POST', '/'.$fb_user_id.'/notifications',  array(
                'template' => $friend.' ha '.$action.' tu invitación al grupo '.$group,
                'access_token' => '723683944395366|2961c8a6e6af8194d36a8c9b56825b49'
            ) ) )->execute();
            return 1;
        }
        return 0;
    }// send_group_notification

    /**
    * Send Facebook notification to remind user about their invitations
    * @param mixed $fb_user_id
    */
    public function send_remainder_notification($fb_user_id) {
        $session = FacebookSession::newAppSession();

        if ( $session ) {
            try {
                $response = ( new FacebookRequest($session, 'POST', '/'.$fb_user_id.'/notifications',  array(
                        'template' => 'Algunos de tus amigos no han aceptado el intercambio y se están perdiendo el 20% de descuento. ¡Recuérdaselos!',
                        'access_token' => '723683944395366|2961c8a6e6af8194d36a8c9b56825b49'
                    ) ) )->execute();
            } catch (FacebookRequestException $ex) {
              // Session not valid, Graph API returned an exception with the reason.
              return 0;
            } catch (\Exception $ex) {
              // Graph API returned info, but it may mismatch the current app or have expired.
              return 0;
            }
            return $response;
        }

    }// send_remainder_notification

    public function get_signed_request(){
        $session = FacebookSession::newAppSession();

        $signed_request = $session->getSignedRequest();
        error_log(print_r($session, true));
        return $signed_request;
    }

}// Facebook