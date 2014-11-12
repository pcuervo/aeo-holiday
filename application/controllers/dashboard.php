<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	/**
	 * Dashboard constructor
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function __construct(){
		parent::__construct();
		session_start();
		$this->load->library('facebook');
		$this->load->model('facebook_user');
	}// constructor

	/**
	 * This controller takes care of the user's Dashboard
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function index()
	{
		//var_dump($_SERVER["REMOTE_ADDR"]);
		$data['current_view'] = 'dashboard';

		$current_fb_user = $this->facebook->get_user();
		if($current_fb_user == NULL)
			redirect('/login');

		if(!$this->facebook_user->exists($current_fb_user['id']))
			$this->facebook_user->create_user($current_fb_user);

		// Get user's information
		$data['fb_user'] = $this->facebook_user->get_by_fb_id($current_fb_user['id']);
		$data['fb_user_pic'] = $this->facebook->get_user_profile_pic();

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($current_fb_user['id']);

		// Get user's pending invitations
		$data['pending_invitations'] = $this->exchange_group->get_pending_invitation_by_user($current_fb_user['id']);

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		// Check if user has completed "Perfect Fit" quiz
		$this->load->model('user_perfect_fit');
		$data['has_perfect_fit'] = $this->user_perfect_fit->has_perfect_fit($current_fb_user['id']);

		// TODO: Get user's activity

		$this->load->view('header', $data);
		$this->load->view('dashboard', $data);
		$this->load->view('footer', $data);
	}// index

	/**
	 * Let's the user create a new exchange group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function new_exchange_group()
	{
		$this->load->library('user_agent');
		$data['browser'] = '';
		if ($this->agent->is_browser())
			$data['browser'] = $this->agent->browser();

		$data['is_mobile'] = 0;
		if($this->agent->is_mobile())
			$data['is_mobile'] = 1;

		// Set up general variables for view
		$data['base_url'] = base_url();
		$data['current_view'] = 'new_exchange_group';

		$current_fb_user = $this->facebook->get_user();
		$data['fb_user_id'] = $current_fb_user['id'];

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($data['fb_user_id']);

		$this->load->view('header', $data);
		$this->load->view('new_exchange_group', $data);
		$this->load->view('footer', $data);

	}// new_exchange_group

	/**
	 * Creates a new exchange group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_exchange_group()
	{
		$this->load->model('exchange_group');

		// Get user data
		$group_data = array();
		$group_data['name'] = $_POST['name'];
		$group_data['description'] = $_POST['description'];
		$group_data['exchange_date'] = $_POST['exchange_date'];
		$group_data['join_deadline'] = $_POST['join_deadline'];
		$group_data['place'] = $_POST['place'];
		$group_data['budget'] = $_POST['budget'];
		$group_data['admin_id'] = $_POST['admin_id'];
		$group_data['invited_friends'] = $_POST['invited_friends'];

		$this->exchange_group->create_group($group_data);

	}// create_exchange_group

	/**
	 * Remove a friend from a group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function remove_group_friend()
	{
		$this->load->model('exchange_group');

		$group_friend_id = $_POST['friend_id'];
		$this->exchange_group->remove_friend($group_friend_id);

		echo 'success';

	}// remove_group_friend

	/**
	 * Remove an invited friend from a group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function remove_invited_friend()
	{
		$this->load->model('exchange_group');

		$fb_friend_id = $_POST['invited_fb_user_id'];
		$group_id = $_POST['group_id'];
		$this->exchange_group->remove_invited_friend($fb_friend_id, $group_id);

		echo 'success';

	}// remove_invited_friend



	/**
	 * Displays the user's coupon
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function view_coupon($view)
	{
		$data['current_view'] = 'view_coupon';
		$data['origin'] = $view;

		$current_fb_user = $this->facebook->get_user();
		if($current_fb_user == NULL)
			redirect('/login');

		$data['email'] = $current_fb_user['email'];

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($current_fb_user['id']);

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		$this->load->view('header', $data);
		$this->load->view('view_coupon', $data);
		$this->load->view('footer', $data);
	}// create_exchange_group

	/**
	 * Send the coupon by email to current user
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function send_coupon_by_email()
	{
		$email = $_POST['email'];
		$this->load->library('My_PHPMailer');

		$current_fb_user = $this->facebook->get_user();
		if($current_fb_user == NULL)
			redirect('/login');

		$mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPAuth 	= true;
        $mail->Host       	= "smtp.mandrillapp.com";
        $mail->CharSet = 'UTF-8';
        $mail->Port       	= 587;
        $mail->Username   	= "ti@wannaflock.com";
        $mail->Password   	= "Ipq7HVO-FAELQsgPyeovhQ";
        $mail->SetFrom('aeomexico@ae.com', 'American Eagle Outfitters');
        $mail->AddReplyTo("aeomexico@ae.com","American Eagle Outfitters");
        $mail->Subject    	= "Tu cupón AEO está aquí";
        $mail->Body      	= "<img src='".base_url()."/assets/images/cupon.jpg' width='600' height='1000' />";
        $mail->AltBody    	= utf8_decode("Tu cupón AEO está aquí");
        $destino = $email; // Who is addressed the email to
        $mail->AddAddress($destino, $current_fb_user['first_name'].' '.$current_fb_user['last_name']);

        if(!$mail->Send()) {
            $data["message"] = "Error: " . $mail->ErrorInfo;
        } else {
            $data["message"] = "Message sent correctly!";
        }

	}// create_exchange_group

	/**
	 * Edits a new exchange group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function edit_exchange_group()
	{
		$this->load->library('user_agent');
		$data['browser'] = '';
		if ($this->agent->is_browser())
			$data['browser'] = $this->agent->browser();

		$data['is_mobile'] = FALSE;
		if($this->agent->is_mobile())
			$data['is_mobile'] = TRUE;

		$this->load->model('exchange_group');

		$current_fb_user = $this->facebook->get_user();
		$data['fb_user_id'] = $current_fb_user['id'];

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($data['fb_user_id']);

		// Get user data
		$group_data = array();
		$group_data['group_id'] = $_POST['group_id'];
		$group_data['name'] = $_POST['name'];
		$group_data['description'] = $_POST['description'];
		$group_data['exchange_date'] = $_POST['exchange_date'];
		$group_data['join_deadline'] = $_POST['join_deadline'];
		$group_data['place'] = $_POST['place'];
		$group_data['budget'] = $_POST['budget'];
		$group_data['invited_friends'] = '';
		if(isset($_POST['invited_friends']))
			$group_data['invited_friends'] = $_POST['invited_friends'];

		$this->exchange_group->edit_group($group_data);

	}// edit_exchange_group

	/**
	 * Let's the user view an exchange group
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function view_group($group_id)
	{
		$data['base_url'] = base_url();
		$data['current_view'] = 'view_exchange_group';

		$current_fb_user = $this->facebook->get_user();
		if($current_fb_user == NULL)
			redirect('/login');
		$data['fb_user_id'] = $current_fb_user['id'];

		// Get group data
		$this->load->model('exchange_group');
		$data['group_details'] = $this->exchange_group->get_group_details($group_id);
		$data['group_friends'] = $this->exchange_group->get_group_friends($group_id);
		$data['pending_friends'] = $this->exchange_group->get_pending_invitations_by_group($group_id);

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		$data['secret_friend'] = $this->secret_friend->get_group_secret_friends_by_user($current_fb_user['id'], $group_id);
		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($data['fb_user_id']);

		// Is current user the group admin?
		$is_admin = FALSE;
		$data['current_fb_user'] = $this->facebook->get_user();
		if($data['current_fb_user']['id'] == $data['group_details']['admin_id'])
			$is_admin = TRUE;

		// load views
		$this->load->view('header', $data);
		if($is_admin)
			$this->load->view('edit_exchange_group', $data);
		else
			$this->load->view('view_exchange_group', $data);
		$this->load->view('footer', $data);
	}// view_group

	/**
	 * Let the user fill the perfect fit
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function complete_perfect_fit()
	{
		$data['current_view'] = 'perfect_fit';
		$data['current_fb_user'] = $this->facebook->get_user();

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($data['current_fb_user']['id']);

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($data['current_fb_user']['id']);

		$this->load->model('perfect_fit_quiz');
		$this->perfect_fit_quiz->create_quiz($data['current_fb_user']['gender']);
		$data['perfect_fit_quiz'] = $this->perfect_fit_quiz->get_quiz($data['current_fb_user']['gender']);

		// load views
		$this->load->view('header', $data);
		$this->load->view('perfect_fit', $data);
		$this->load->view('footer', $data);

	}// complete_perfect_fit

	/**
	 * Creates a user's "Perfect Fit"
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_perfect_fit()
	{
		$this->load->model('user_perfect_fit');

		$current_fb_user = $this->facebook->get_user();

		$perfect_fit_data = array();
		$perfect_fit_data['Talla top'] = $_POST['Talla_top'];
		$perfect_fit_data['Talla jeans'] = $_POST['Talla_jeans'];
		$perfect_fit_data['Color'] = $_POST['Color'];
		if($current_fb_user['gender'] == 'male')
			$perfect_fit_data['Largo jeans'] = $_POST['Largo_jeans'];
		$user_data['fb_user'] = $current_fb_user;

		$this->user_perfect_fit->create_perfect_fit($perfect_fit_data, $user_data);


	}// update_perfect_fit

	/**
	 * Declines an exchange group request
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function accept_invitation()
	{
		$group_id = $_POST['group_id'];
		
		$current_fb_user = $this->facebook->get_user();

		$this->load->model('group_invitation');
		$invitation_data = array(
			'invited_fb_user_id' 	=> $current_fb_user['id'],
			'group_id' 				=> $group_id,
			);
		$this->group_invitation->remove_invitation($invitation_data);

		$this->load->model('group_friend');
		$friend_data = array(
			'facebook_users_id' => $current_fb_user['id'],
			'group_id' 			=> $group_id,
			'is_admin'			=> FAlSE,
			);
		$this->group_friend->add_group_friend($friend_data);

		// Add to user's activity
		$this->load->model('exchange_group');
		$group_admin = $this->exchange_group->get_group_admin($group_id);
		$this->load->model('user_activity');
		$this->user_activity->invitation_accepted($group_admin['fb_user_id'], $group_id, $current_fb_user['id'], 2);

		echo 'success';
	}// accept_invitation

	/**
	 * Accepts an exchange group request
	 *
	 * @param int $group_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function decline_invitation()
	{
		$group_id = $_POST['group_id'];
		
		$current_fb_user = $this->facebook->get_user();

		$this->load->model('group_invitation');
		$invitation_data = array(
			'invited_fb_user_id' 	=> $current_fb_user['id'],
			'group_id' 				=> $group_id,
			);
		$this->group_invitation->remove_invitation($invitation_data);

		// Add to user's activity
		$this->load->model('exchange_group');
		$group_admin = $this->exchange_group->get_group_admin($group_id);
		$this->load->model('user_activity');
		$this->user_activity->invitation_rejected($group_admin['fb_user_id'], $group_id, $current_fb_user['id'], 3);

		echo 'success';
	}// decline_invitation

	/**
	 * Gets all unread messages by secret friends
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function get_unread_messages()
	{
		$current_fb_user = $this->facebook->get_user();

		$this->load->model('group_friend');
		$group_friend_ids = $this->group_friend->get_group_friend_ids_by_fb_id($current_fb_user['id']);
		$messages = $this->group_friend->get_unread_messages_by_group_friends($group_friend_ids);

		echo json_encode($messages);
	}// get_unread_messages

	/**
	 * Gets the last entries of user's activity
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function get_user_activity()
	{
		$current_fb_user = $this->facebook->get_user();

		$this->load->model('user_activity');
		$user_activity = $this->user_activity->get_user_activity_by_fb_id($current_fb_user['id']);

		// Get user's groups to display in the menu
		$this->load->model('exchange_group');
		$data['exchange_groups'] = $this->exchange_group->get_groups_by_user($current_fb_user['id']);

		// Get user's secret friends
		$this->load->model('secret_friend');
		$data['secret_friends'] = $this->secret_friend->get_secret_friends_by_user($current_fb_user['id']);

		echo json_encode($user_activity);
	}// get_user_activity

	/**
	 * Gets the last entries of user's activity
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function post_video_to_secret_friends()
	{
		$this->load->model('exchange_group');
		$this->exchange_group->post_video_to_secret_friends();
	}// post_video_to_secret_friends



}// class Dashboard
