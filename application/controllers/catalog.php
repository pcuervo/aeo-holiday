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
		$this->load->view('header');
		$this->load->view('catalog');
		$this->load->view('footer');
	}// index
}// Catalog
