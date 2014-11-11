<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Catalog extends CI_Controller {

	/**
	 * Login constructor
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
	 * This controller takes care of login
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		$data['current_view'] = 'catalog';

		$this->load->library('user_agent');
		$data['is_mobile'] = FALSE;
		if($this->agent->is_mobile())
			$data['is_mobile'] = TRUE;

		$current_fb_user = $this->facebook->get_user();
		if($current_fb_user == NULL)
			redirect('/login');

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($current_fb_user['id']);

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		$this->load->view('header', $data);
		$this->load->view('catalog', $data);
		$this->load->view('footer', $data);
	}// index
}// Catalog
