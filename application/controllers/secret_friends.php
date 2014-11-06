<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Secret_friends extends CI_Controller {

	/**
	 * Secret_friend constructor
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
	 * This controller takes care of a user's secret friends
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function view($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'secret_friend';

		// Get secret friend's data
		$this->load->model('group_friend');
		$data['friend_info'] = $this->group_friend->get_group_friend($group_friend_id);
		$this->load->model('exchange_group');
		$data['group'] = $this->exchange_group->get_group_details($data['friend_info']['group_id']);

		// Check if user completed his/her "perfect fit"
		$this->load->model('user_perfect_fit');
		$data['has_perfect_fit'] = FALSE;
		if($this->user_perfect_fit->has_perfect_fit($data['friend_info']['fb_user_id']))
			$data['has_perfect_fit'] = TRUE;

		$data['group_friend_id'] = $group_friend_id;
		$this->load->view('header', $data);
		$this->load->view('secret_friend', $data);
		$this->load->view('footer', $data);
	}// view


	public function view_perfect_fit($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'show_perfect_fit';

		// Get secret friend's data
		$this->load->model('group_friend');
		$data['group_friend'] = $this->group_friend->get_group_friend($group_friend_id);

		$this->load->model('exchange_group');
		$data['group'] = $this->exchange_group->get_group_details($data['group_friend']['group_id']);

		// Get user's "perfect fit"
		$this->load->model('user_perfect_fit');
		
		$data['user_answers']= $this->user_perfect_fit->get_perfect_fit_by_user($data['group_friend']['fb_user_id']);
		$data['group_friend_id'] = $group_friend_id;
		
		$this->load->view('header', $data);
		$this->load->view('show_perfect_fit', $data);
		$this->load->view('footer', $data);
	}// view



}// class Secret_friend
