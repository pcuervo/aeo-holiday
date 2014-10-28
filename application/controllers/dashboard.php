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
		// Set up general variables for view
		$data['base_url'] = base_url();
		$data['current_view'] = 'dashboard';

		// Get user data
		$this->load->model('facebook_user');
		$data['fb_user'] = $this->facebook_user->get_fb_user($user_id);

		$this->load->view('header', $data);
		$this->load->view('dashboard', $data);
		$this->load->view('footer', $data);
	}// index

	/**
	 * Let's the user create a new exchange group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function new_exchange_group()
	{
		// Set up general variables for view
		$data['base_url'] = base_url();
		$data['current_view'] = 'new_exchange_group';

		$this->load->view('header', $data);
		$this->load->view('new_exchange_group', $data);
		$this->load->view('footer', $data);
		
	}// new_exchange_group
}// class Dashboard
