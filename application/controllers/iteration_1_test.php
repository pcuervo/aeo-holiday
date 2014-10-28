<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Iteration_1_test extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	/**
	 * Tests container
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		$data['base_url'] = base_url();

		$this->load->view('header');
		// $this->load->view('login_test');    PASSED
		$this->load->view('invite_friends');
		$this->load->view('footer', $data);
	}

	/**
	 * Tests to save a Facebook user into DB
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save_fb_user()
	{
		// Create a facebook user
		$this->load->model('facebook_user');

		// Get user data
		$user_data['id'] = $_POST['id'];
		$user_data['first_name'] = $_POST['first_name'];
		$user_data['last_name'] = $_POST['last_name'];
		$user_data['email'] = $_POST['email'];
		$user_data['gender'] = $_POST['gender'];
		$user_data['access_token'] = $_POST['access_token'];

		echo $this->facebook_user->create_user($user_data);
	}// save_fb_user

	/**
	 * Creates an exchange group 
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_exchange_group()
	{
		// Create a facebook user
		$this->load->model('exchange_group');

		// Get user data
		$group_data['name'] = $_POST['name'];
		$group_data['description'] = $_POST['description'];
		$group_data['exchange_date'] = $_POST['exchange_date'];
		$group_data['join_deadline'] = $_POST['join_deadline'];
		$group_data['place'] = $_POST['place'];
		$group_data['budget'] = $_POST['budget'];
		$group_data['invited_friends'] = $_POST['invited_friends'];

		$this->exchange_group->create_group($group_data);
	}// save_invited_friends

	/**
	 * Tests to save a Facebook user into DB
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save_invited_friends()
	{
		// Create a facebook user
		$this->load->model('facebook_user');

		// Get user data
		$user_data['id'] = $_POST['id'];
		$user_data['first_name'] = $_POST['first_name'];
		$user_data['last_name'] = $_POST['last_name'];
		$user_data['email'] = $_POST['email'];
		$user_data['gender'] = $_POST['gender'];
		$user_data['access_token'] = $_POST['access_token'];

		echo $this->facebook_user->create_user($user_data);
	}// save_invited_friends

}// Iteration_1_test
