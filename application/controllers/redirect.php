<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Redirect extends CI_Controller {

	/**
	 * Redirect constructor
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function __construct(){
		parent::__construct();
		session_start();
		$this->load->library('facebook');
		//$current_fb_user = $this->facebook->get_user();
	}// constructor

	/**
	 * This controller takes care of the user's Redirect
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		$this->load->view('redirect');
	}// index

	/**
	 * This controller takes care of the user's Redirect
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function login()
	{
		$this->load->library('user_agent');
		if($this->agent->is_mobile()){	
			redirect('/dashboard');
		} else {
			$url = $this->config->item('app_url').'?app_data=dashboard';
			redirect($url);
		}
	}// index

}// class Redirect
