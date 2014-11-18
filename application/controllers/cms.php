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
	 * Login or redirect CMS users to CMS' home
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		if(isset($_SESSION['username']))
			redirect('/cms/home');

		$data['current_view'] = 'cms_login';

		if(isset($_POST['user']) && isset($_POST['password'])){
			$user = $_POST['user'];
			$password = $_POST['password'];
			$this->load->model('cms_user');
			$cms_user = $this->cms_user->validate($user, $password);

			if($cms_user){
				$_SESSION['cms_user_id'] = $cms_user['id'];
				$_SESSION['username'] = $cms_user['username'];
				redirect('cms/home');
			}
		}

		$this->load->view('cms/header');
		$this->load->view('cms/login', $data);
		$this->load->view('cms/footer');
	}// index

	/**
	 * CMS homepage
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function home()
	{
		if(! isset($_SESSION['username']))
			redirect('/cms');

		$this->load->view('cms/header');
		$this->load->view('cms/home');
		$this->load->view('cms/footer');
	}// home

	/**
	 * Catalog
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function catalog()
	{

		if(! isset($_SESSION['username']))
			redirect('/cms');

		$this->load->view('cms/header');
		$this->load->view('cms/catalog');
		$this->load->view('cms/footer');
	}// catalog

	/**
	 * Catalog
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function view()
	{

		if(! isset($_SESSION['username']))
			redirect('/cms');

		$this->load->view('cms/header');
		$this->load->view('cms/view');
		$this->load->view('cms/footer');
	}// catalog

	/**
	 * Form to add a product to the catalog
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function add()
	{
		if(! isset($_SESSION['username']))
			redirect('/cms');

		$this->load->helper('form');

		$this->load->view('cms/header');
		$this->load->view('cms/add');
		$this->load->view('cms/footer');
	}// add

	/**
	 * Insert a product to database
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function insert_product()
	{
		if(! isset($_SESSION['username']))
			redirect('/cms');


		// CAMBIAR A CONSTANTE
		$config['upload_path'] =  './uploads/';

		// file upload constraints
		$config['allowed_types'] = 'mp4|mpeg|mov';
		$config['max_size']	= '30000';
		$config['max_width'] = '';
		$config['max_height'] = '';

		// upload file!
		$this->load->library('upload', $config);
		$this->upload->initialize($config);
		if ( ! $this->upload->do_upload())
		{
			// There's been an error
			$data['error'] = $this->upload->display_errors();
		}
		else
		{
			// Save video in server
			$data['upload'] = $this->upload->data();

			// relative video upload path
			$video_url = explode('/', $data['upload']['full_path']);

			// inserta anuncio a bd
			$this->load->model('secret_friend_video');
			$video_id = $this->secret_friend_video->save_video($video_url[count($video_url)-1], $secret_friend_id);
		}

		// return to secret friend's home
		$this->view($group_friend_id);




		redirect('/add')
	}// insert_product

	/**
	 * Data report dasbhoard
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function reports()
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
		$this->load->view('cms/reports', $data);
		$this->load->view('cms/footer');
	}// reports

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