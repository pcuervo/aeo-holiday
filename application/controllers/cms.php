<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This class will be used for the Content Management System.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Cms extends CI_Controller {

	/**
	 * Cms constructor
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function __construct(){
		parent::__construct();
		session_start();
	}// constructor

	/**
	 * 
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		if(isset($_SESSION['username']))
			redirect('/cms/dashboard');

		$data['current_view'] = 'cms_login';

		if(isset($_POST['user']) && isset($_POST['user'])){
			$user = $_POST['user'];
			$password = $_POST['password'];
			$this->load->model('cms_user');
			$cms_user = $this->cms_user->validate($user, $password);

			if($cms_user){
				$_SESSION['username'] = $cms_user['username'];
				$this->dashboard();
			}
		}
		
		$this->load->view('header');
		$this->load->view('cms/login', $data);
		$this->load->view('footer');
	}// index

	/**
	 * 
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function dashboard()
	{

		if(! isset($_SESSION['username']))
			$this->index();
	
		// Cargar todos los datos totales
		$this->load->model('cms_report');
		$data['total_accepted_invitations'] = $this->cms_report->total_accepted_invitations();


		// Cargar busqueda (si existe) con datos por fecha

		// Cargar vista login
		$this->load->view('header');
		$this->load->view('cms/dashboard', $data);
		$this->load->view('footer');
	}// index


}// class Cms
