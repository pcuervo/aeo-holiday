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
	 * This controller takes care of the catalog
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		if(! isset($_SESSION['username']))
			redirect('/cms');

		// Cargar vista login
		$this->load->view('cms/header');
		$this->load->view('cms/catalog');
		$this->load->view('cms/footer');
	}// index
}// Catalog
