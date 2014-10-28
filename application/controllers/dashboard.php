<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	/**
	 * Dashboard constructor
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function __construct(){
		parent::__construct();
	}// constructor

	/**
	 * This controller takes care of the user's Dashboard
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index($user_id)
	{
		// Get user info 
		$this->load->model('facebook_user');
		
		// Set up variables for view
		$data['base_url'] = base_url();
		$data['current_view'] = 'dashboard';

		$this->load->view('header');
		$this->load->view('dashboard');
		$this->load->view('footer', $data);
	}// index
}// class Dashboard
