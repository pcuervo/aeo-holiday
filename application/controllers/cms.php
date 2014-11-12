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

		$this->load->view('cms/header');
		$this->load->view('cms/login', $data);
		$this->load->view('cms/footer');
	}// index

	/**
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
		$data['total_pending_invitations'] = $this->cms_report->total_pending_invitations();
		$data['total_exchange_groups'] = $this->cms_report->total_exchange_groups();
		$data['total_fb_users'] = $this->cms_report->total_fb_users();
		$data['total_sent_messages'] = $this->cms_report->total_sent_messages();

		// Cargar busqueda (si existe) con datos por fecha

		// Cargar vista login
		$this->load->view('cms/header');
		$this->load->view('cms/dashboard', $data);
		$this->load->view('cms/footer');
	}// dashboard

}// class Cms
