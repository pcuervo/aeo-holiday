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
		session_start();
		$this->load->library('facebook');
		$this->load->model('facebook_user');
	}// constructor

	/**
	 * This controller takes care of the user's Dashboard
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		// Set up general variables for view
		$data['base_url'] = base_url();
		$data['current_view'] = 'dashboard';
		//$data['fb_user_id'] = $_SESSION['fb_user_id'];

		// Get user data and insert to database if it doesn't exist
		$current_fb_user = $this->facebook->get_user();
		if(!$this->facebook_user->exists($current_fb_user['id']))
			$this->facebook_user->create_user($current_fb_user);

		$data['fb_user'] = $this->facebook_user->get_by_fb_id($current_fb_user['id']);
		$data['fb_user_pic'] = $this->facebook->get_user_profile_pic();

		// Get user's groups
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($current_fb_user['id']);

		// TODO: Get user's pending invitations
		$data['pending_invitations'] = $this->exchange_group->get_pending_invitation_by_user($current_fb_user['id']);

		var_dump($data['pending_invitations']);

		// TODO: Get user's activity

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
		$data['fb_user_id'] = $_SESSION['fb_user_id'];

		$this->load->view('header', $data);
		$this->load->view('new_exchange_group', $data);
		$this->load->view('footer', $data);
		
	}// new_exchange_group

	/**
	 * Let's the user create a new exchange group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_exchange_group()
	{
		// Set up general variables for view
		// Create a facebook user
		$this->load->model('exchange_group');

		// Get user data
		$group_data = array();
		$group_data['name'] = $_POST['name'];
		$group_data['description'] = $_POST['description'];
		$group_data['exchange_date'] = $_POST['exchange_date'];
		$group_data['join_deadline'] = $_POST['join_deadline'];
		$group_data['place'] = $_POST['place'];
		$group_data['budget'] = $_POST['budget'];
		$group_data['admin_id'] = $_POST['admin_id'];
		$group_data['invited_friends'] = $_POST['invited_friends'];

		$this->exchange_group->create_group($group_data);
		
	}// create_group

}// class Dashboard
