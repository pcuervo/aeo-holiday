<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Secret_friend extends CI_Controller {

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
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		// Set up general variables for view
		$data['current_view'] = 'secret_friend';

		$this->load->view('header', $data);
		$this->load->view('secret_friend', $data);
		$this->load->view('footer', $data);
	}// index

}// class Secret_friend
