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

		$this->load->view('header', $data);
		$this->load->view('secret_friend', $data);
		$this->load->view('footer', $data);
	}// index

}// class Secret_friend
