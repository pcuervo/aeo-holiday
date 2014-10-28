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

		$this->load->view('header');
		$this->load->view('login');
		$this->load->view('footer', $data);
	}// index
}// Login
