<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Secret_friends extends CI_Controller {

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
	 * Display a user's secret friend view
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function view($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'secret_friend';

		// Get secret friend's data
		$this->load->model('secret_friend');
		$current_user = $this->facebook->get_user();
		$data['secret_friend'] = $this->secret_friend->get_secret_friend_by_user($current_user['id'], $group_friend_id);

		// Check if user completed his/her "perfect fit"
		$this->load->model('user_perfect_fit');
		$data['has_perfect_fit'] = FALSE;
		if($this->user_perfect_fit->has_perfect_fit($data['secret_friend']['fb_user_id']))
			$data['has_perfect_fit'] = TRUE;
		// Check if user has recorded a video
		$data['video'] = $this->secret_friend->has_video($current_user['id'], $data['secret_friend']['group_friend_id']);

		$this->load->view('header', $data);
		$this->load->view('secret_friend', $data);
		$this->load->view('footer', $data);
	}// view


	public function view_perfect_fit($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'show_perfect_fit';

		// Get secret friend's data
		$this->load->model('group_friend');
		$data['group_friend'] = $this->group_friend->get_group_friend($group_friend_id);

		$this->load->model('exchange_group');
		$data['group'] = $this->exchange_group->get_group_details($data['group_friend']['group_id']);

		// Get user's "perfect fit"
		$this->load->model('user_perfect_fit');
		
		$data['user_answers']= $this->user_perfect_fit->get_perfect_fit_by_user($data['group_friend']['fb_user_id']);
		$data['group_friend_id'] = $group_friend_id;
		
		$this->load->view('header', $data);
		$this->load->view('show_perfect_fit', $data);
		$this->load->view('footer', $data);
	}// view



	/**
	 * Create a video for a secret friend
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function create_video($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'create_secret_friend_video';

		// load form helper
		$this->load->helper(array('form', 'url'));

		// Get secret friend's data
		$this->load->model('secret_friend');
		$current_user = $this->facebook->get_user();
		$data['secret_friend'] = $this->secret_friend->get_secret_friend_by_user($current_user['id'], $group_friend_id);

		$this->load->view('header', $data);
		$this->load->view('create_video', $data);
		$this->load->view('footer', $data);
	}// create_video

	/**
	 * Upload secret friend's video to server
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function upload_video($group_friend_id)
	{
		$secret_friend_id = $_POST['secret_friend_id'];
		$group_friend_id = $_POST['group_friend_id'];

		// CAMBIAR A CONSTANTE
		$config['upload_path'] =  './uploads/';

		// file upload constraints
		$config['allowed_types'] = 'mp4|mpeg|mov';
		$config['max_size']	= '10000';
		$config['max_width'] = '';
		$config['max_height'] = '';

		// upload file!
		$this->load->library('upload', $config);
		$this->upload->initialize($config);
		if ( ! $this->upload->do_upload())
		{
			// There's been an error
			$data['error'] = $this->upload->display_errors();
			var_dump($data['error']);
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
		// send TEMPORARY NOTIFICATION
		$this->facebook->send_notification($video_id);

		// return to secret friend's home
		$this->view($group_friend_id);
	}// upload_video

	/**
	 * View a secret friend's video
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function view_video($secret_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'view_secret_friend_video';

		// Get secret friend's data
		$this->load->model('secret_friend');
		$data['video_url'] = base_url().'/uploads/'.$this->secret_friend->get_video($secret_friend_id);

		$this->load->view('header', $data);
		$this->load->view('view_video', $data);
		$this->load->view('footer', $data);
	}// view_video

	/**
	 * Creates a message for a secret friend.
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function create_message($group_friend_id)
	{
		// Set up general variables for view
		$data['current_view'] = 'send_message';

		// Get secret friend's data
		$this->load->model('secret_friend');
		$current_user = $this->facebook->get_user();
		$data['secret_friend'] = $this->secret_friend->get_secret_friend_by_user($current_user['id'], $group_friend_id);

		$this->load->view('header', $data);
		$this->load->view('send_message', $data);
		$this->load->view('footer', $data);
	}// create_message

	/**
	 * Sends a message to a secret friend
	 *
	 * @param string $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function send_message()
	{
		// Get POST data
		$secret_friend_id = $_POST['secret_friend_id'];
		$message = $_POST['message'];

		$this->load->model('secret_friend');
		$secret_friend_data = $this->secret_friend->get_secret_friend($secret_friend_id);

		// Send message
		$this->load->model('message');
		$this->message->save($secret_friend_data['from_group_friend_id'],
			$secret_friend_data['to_group_friend_id'],
			$message
			);

		$this->view($secret_friend_data['to_group_friend_id']);
	}// send_message

	/**
	 * View the user's messages
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function view_messages()
	{
		$data['current_view'] = 'view_messages';

		$current_user = $this->facebook->get_user();
		$this->load->model('group_friend');
		$data['group_friend_id'] = $this->group_friend->get_group_friend_id_by_fb_id($current_user['id']);

		$data['messages'] = $this->group_friend->get_messages_by_group_friend($data['group_friend_id']);

		$message_senders_group_id = array();
		foreach ($data['messages'] as $key => $message) {
			array_push($message_senders_group_id, $message['from_group_friend_id']);
		}
		$unique_message_senders_group_id = array_unique($message_senders_group_id);

		$data['message_sender_data'] = $this->group_friend->get_message_senders($unique_message_senders_group_id);

		$this->load->view('header', $data);
		$this->load->view('view_messages', $data);
		$this->load->view('footer', $data);
	}// view_messages

	/**
	 * Get current user's secret friends
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function get_secret_friends()
	{
		$current_fb_user = $this->facebook->get_user();
		if($current_fb_user == NULL)
			redirect('/login');

		// Get user's secret friends
		$this->load->model('secret_friend');
		$secret_friends = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		echo json_encode($secret_friends);
	}// view_messages

}// class Secret_friend
