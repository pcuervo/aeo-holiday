<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Login extends CI_Controller {

	/**
	 * Login constructor
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function __construct(){
		parent::__construct();
		session_start();
		$this->load->library('facebook');
	}// constructor

	/**
	 * This controller takes care of login
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		$current_fb_user = $this->facebook->get_user();
		if(!empty($current_fb_user))
			redirect('/dashboard');

		/*$signed_request = $this->facebook->get_signed_request();
		if( ($signed_request && isset($signed_request['app_data']) && $signed_request['app_data'] == 'dashboard') ){
			redirect('/dashboard');
		}*/

		$data['base_url'] = base_url();
		$data['current_view'] = 'login';

		// Get Facebook login URL
		$this->load->library('facebook');
		$login_url = $this->facebook->login_url();
		$data['fb_login_url'] = $login_url;

		$this->load->view('header', $data);
		$this->load->view('login', $data);
		$this->load->view('footer', $data);
	}// index

	/**
	 * This controller takes care of login
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function set_access_token()
	{
		$this->ci =& get_instance();
		$access_token = $_POST['access_token'];
		$this->ci->session->set_userdata( 'fb_token', $access_token );
		echo $access_token;
	}// index
}// Login
