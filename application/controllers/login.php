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
	}// constructor

	/**
	 * This controller takes care of login
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
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
}// Login
