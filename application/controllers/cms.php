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
	 * Login or redirect CMS users to dashboard
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
				redirect('cms/dashboard');
			}
		}

		$this->load->view('cms/header');
		$this->load->view('cms/login', $data);
		$this->load->view('cms/footer');
	}// index

	/**
	 * Data report dasbhoard
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function dashboard()
	{

		if(! isset($_SESSION['username']))
			redirect('/cms');

		// Cargar todos los datos totales
		$this->load->model('cms_report');
		$data['total_accepted_invitations'] = $this->cms_report->total_accepted_invitations();
		$data['total_pending_invitations'] = $this->cms_report->total_pending_invitations();
		$data['total_rejected_invitations'] = $this->cms_report->total_rejected_invitations();
		$data['total_exchange_groups'] = $this->cms_report->total_exchange_groups();
		$data['total_fb_users'] = $this->cms_report->total_fb_users();	
		$data['total_sent_messages'] = $this->cms_report->total_sent_messages();	
		$data['total_closed_exchange_groups'] = $this->cms_report->total_closed_exchanges();	
		$data['average_users_per_group'] = $this->cms_report->average_users_per_group();		
		$data['total_invitations'] = $data['total_accepted_invitations'] + $data['total_pending_invitations'] + $data['total_rejected_invitations'];

		// Cargar busqueda (si existe) con datos por fecha

		// Cargar vista login
		$this->load->view('cms/header');
		$this->load->view('cms/dashboard', $data);
		$this->load->view('cms/footer');
	}// dashboard

	/**
	 * Listed reports by group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function report_by_group()
	{
		$data['current_view'] = 'group_reports';

		$this->load->model('cms_report');
		$data['group_info'] = $this->cms_report->get_group_information();

		$this->load->view('cms/header');
		$this->load->view('cms/group_reports', $data);
		$this->load->view('cms/footer');
	}// report_by_group

	/**
	 * Data report dasbhoard
	 *
	 * @return $num_accepted_invitations
	 * @author Miguel Cabral
	 **/
	public function get_accepted_invitations_by_date()
	{
		$start_date = $_POST['start_date'];
		$end_date = $_POST['end_date'];
	
		$this->load->model('cms_report');
		$num_accepted_invitations = $this->cms_report->accepted_invitations_by_date($start_date, $end_date);
		
		echo json_encode($num_accepted_invitations);

	}// get_accepted_invitations_by_date

	/**
	 * Data report dasbhoard
	 *
	 * @return $num_pending_invitations
	 * @author Miguel Cabral
	 **/
	public function get_pending_invitations_by_date()
	{
		$start_date = $_POST['start_date'];
		$end_date = $_POST['end_date'];
	
		$this->load->model('cms_report');
		$num_pending_invitations = $this->cms_report->pending_invitations_by_date($start_date, $end_date);
		
		echo json_encode($num_pending_invitations);

	}// get_accepted_invitations_by_date


	/**
	 * Data report dasbhoard
	 *
	 * @return $num_rejected_invitations
	 * @author Zurol
	 **/
	public function get_rejected_invitations_by_date()
	{
		$start_date = $_POST['start_date'];
		$end_date = $_POST['end_date'];
	
		$this->load->model('cms_report');
		$num_rejected_invitations = $this->cms_report->rejected_invitations_by_date($start_date, $end_date);
		
		echo json_encode($num_rejected_invitations);

	}// get_accepted_invitations_by_date

	/**
	 * Data report dasbhoard
	 *
	 * @return $num_sent_messages
	 * @author Zurol
	 **/
	public function get_sent_messages_by_date()
	{
		$start_date = $_POST['start_date'];
		$end_date = $_POST['end_date'];
	
		$this->load->model('cms_report');
		$num_sent_messages = $this->cms_report->sent_messages_by_date($start_date, $end_date);
		
		echo json_encode($num_sent_messages);

	}// get_accepted_invitations_by_date

	/**
	 * Data report dasbhoard
	 *
	 * @return $users_by_date
	 * @author Zurol
	 **/
	public function get_users_by_date()
	{
		$start_date = $_POST['start_date'];
		$end_date = $_POST['end_date'];
	
		$this->load->model('cms_report');
		$users_by_date = $this->cms_report->users_by_date($start_date, $end_date);
		
		echo json_encode($users_by_date);

	}// get_users_by_date


	/**
	 * Data report dasbhoard
	 *
	 * @return $users_per_exchange_by_date
	 * @author Zurol
	 **/
	public function get_users_per_exchange_by_date()
	{
		$start_date = $_POST['start_date'];
		$end_date = $_POST['end_date'];
	
		$this->load->model('cms_report');
		$users_per_exchange_by_date = $this->cms_report->members_per_exchange_by_date($start_date, $end_date);
		
		echo json_encode($users_per_exchange_by_date);

	}// get_users_per_exchange_by_date



}// class Cms