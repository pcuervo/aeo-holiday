<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Perfect_fit extends CI_Controller {
	/**
	 * Secret_friend constructor
	 *
	 * @return void
	 * @author Zurol
	 **/
	function __construct(){
		parent::__construct();
		session_start();
		$this->load->library('facebook');
	}// constructor


	/**
	 * This controller takes perfect_fit_answers
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Zurol
	 **/
	public function view_perfect_fit($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'perfect_fit';

		// Get secret friend's data
		$this->load->model('group_friend');
		$data['friend_info'] = $this->group_friend->get_group_friend($group_friend_id);
		$this->load->model('exchange_group');
		$data['group'] = $this->exchange_group->get_group_details($data['friend_info']['group_id']);

		// Check if user completed his/her "perfect fit"
//		$this->load->model('user_perfect_fit');

		$this->load->view('header', $data);
		$this->load->view('secret_friend', $data);
		$this->load->view('footer', $data);
	}// index

}// class Perfect_fit
