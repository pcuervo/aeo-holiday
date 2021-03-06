<?php
if(!class_exists('Group_invitation')){ require('group_invitation.php'); }
if(!class_exists('Facebook_user')){ require('facebook_user.php'); }
/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Exchange_group extends CI_Model {

	private $group_id;
	private $group_name;
	private $group_description;
	private $exchange_date;
	private $join_deadline;
	private $pending_invitations = array();
	private $group_friends = array();

	/**
	 * Constructor for Exchange_group
	 *
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->database();
		$this->load->library('facebook');
	}// constructor

	/**
	 * Returns the group's details
	 *
	 * @param int $group_id
	 * @return mixed $group_details;
	 * @author Miguel Cabral
	 **/
	function get_group_details($group_id)
	{
		// Get admin's Facebook id
		$this->db->select('*');
		$this->db->from('group_friends');
		$this->db->join('exchange_groups', 'group_friends.group_id = exchange_groups.id');
		$this->db->where('group_id', $group_id);
		$this->db->where('is_admin', 1);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		// Get group's details
		$row = $query->row(); 

		$group_details = array(
			'group_id' 		=> $row->group_id,
			'name' 			=> $row->name,
			'description' 	=> $row->description,
			'exchange_date' => $row->exchange_date,
			'join_deadline' => $row->join_deadline,
			'place' 		=> $row->place,
			'budget' 		=> $row->budget,
			'admin_id' 		=> $row->facebook_users_id,
			);
		
		return $group_details;
	}// get_group_details

	/**
	 * Return the friends in a group
	 *
	 * @param int $group_id
	 * @return mixed $group_friends;
	 * @author Miguel Cabral
	 **/
	function get_group_friends($group_id)
	{
		// Get admin's Facebook id
		$query = $this->db->get_where('group_friends', array('group_id' => $group_id));

		if ($query->num_rows() < 1)
			return 0;

		foreach ($query->result() as $key => $row)
		{
			$friend_info = $this->facebook->get_user_by_id($row->facebook_users_id);
			$friend_picture = $this->facebook->get_user_profile_pic_by_id($row->facebook_users_id);
		    
		    $group_friends[$key] = array(
		    	'id'				=> $row->id,
		    	'group_id'			=> $row->group_id,
		    	'fb_user_id'		=> $row->facebook_users_id,
				'friend_name'		=> $friend_info['first_name'].' '.$friend_info['last_name'],
				'friend_picture'	=> $friend_picture,
				'is_admin' 			=> $row->is_admin,
			);
		}
		
		return $group_friends;
	}// get_group_friends

	/**
	 * Creates an Exchange_Group in the database.
	 *
	 * @param array $group_data 
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_group($group_data = array())
	{
		$insert_data = array(
			'name' 			=> $group_data['name'],
			'description'	=> $group_data['description'],
			'exchange_date'	=> $group_data['exchange_date'],
			'join_deadline' => $group_data['join_deadline'],
			'place'			=> $group_data['place'],
			'budget'		=> $group_data['budget'],
			'status'		=> 0,
			'created_at' 	=> date("Y-m-d H:i:s")
			);
		$this->db->insert('exchange_groups', $insert_data);
		$this->group_id = $this->db->insert_id();

		$this->set_group_admin($group_data['admin_id']);
		$this->create_pending_invitations($group_data['invited_friends']);

		$this->load->model('user_activity');
		$this->user_activity->group_created($group_data['admin_id'], $this->group_id, 1);

		$respuesta = array(
				'error' 	=> '0',
				'message'	=> 'Group created successfully!');
		$this->output->set_output(json_encode($respuesta));	

	}// create_group

	/**
	 * Edits an existing Exchange_Group from the database.
	 *
	 * @param array $group_data 
	 * @return void
	 * @author Miguel Cabral
	 **/
	function edit_group($group_data = array())
	{
		$update_data = array(
			'name' 			=> $group_data['name'],
			'description'	=> $group_data['description'],
			'exchange_date'	=> $group_data['exchange_date'],
			'join_deadline' => $group_data['join_deadline'],
			'place'			=> $group_data['place'],
			'budget'		=> $group_data['budget'],
			);
		$this->db->where('id', $group_data['group_id']);
		$this->db->update('exchange_groups', $update_data);
		$this->group_id = $group_data['group_id'];

		if ($group_data['invited_friends'] != '')
			$this->create_pending_invitations($group_data['invited_friends']);

		$respuesta = array(
				'error' 	=> '0',
				'message'	=> 'Group edited successfully!');
		$this->output->set_output(json_encode($respuesta));	

	}// edit_group

	/**
	 * Store pending group invitations.
	 *
	 * @param array $invited_friends
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_pending_invitations($invited_friends = array())
	{
		foreach ($invited_friends as $key => $friend_id) {
			$invitation_data = array(
				'group_id' 				=> $this->group_id,
				'invited_fb_user_id' 	=> $friend_id,
				);

			$invitation = new Group_invitation();
			$invitation->create_invitation($invitation_data);

			$this->pending_invitations[$key] = $invitation;
		}// foreach

	}// create_pending_invitations

	/**
	 * Add administrator to group_friends
	 *
	 * @param int $admin_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function set_group_admin($admin_id)
	{
		$fb_user = new Facebook_user();
		$admin_user = $fb_user->get_by_fb_id($admin_id);

		$group_friend = array(
			'facebook_users_id' => $admin_user['id'],
			'group_id' 			=> $this->group_id,
			'is_admin'			=> TRUE,
			'created_at' 		=> date("Y-m-d H:i:s"),
			);
		$this->load->model('group_friend');
		$this->group_friend->add_group_friend($group_friend);

		// TODO: add to activity feed
		
	}// set_group_admin

	/**
	 * Get the groups that belong to the current user
	 *
	 * @param int $fb_user_id
	 * @return mixed $groups;
	 * @author Miguel Cabral
	 **/
	function get_groups_by_user($fb_user_id)
	{
		$this->db->select('*');
		$this->db->from('exchange_groups');
		$this->db->join('group_friends', 'group_friends.group_id = exchange_groups.id');
		$this->db->where('facebook_users_id', $fb_user_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		foreach ($query->result() as $key => $row)
		{
		    $groups[$key] = array(
				'id'	=> $row->group_id,
				'name' 	=> $row->name,
			);
		}

		return $groups;
	}// get_groups_by_user

	/**
	 * Get the groups that belong to the current user
	 *
	 * @param int $fb_user_id
	 * @return mixed $pending_invitations;
	 * @author Miguel Cabral
	 **/
	function get_pending_invitation_by_user($fb_user_id)
	{
		$this->db->select('group_id, name, group_invitations.id');
		$this->db->from('exchange_groups');
		$this->db->join('group_invitations', 'group_invitations.group_id = exchange_groups.id');
		$this->db->where('invited_fb_user_id', $fb_user_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		foreach ($query->result() as $key => $row)
		{
			$group_admin = $this->get_group_admin($row->group_id);
		    $pending_invitations[$key] = array(
		    	'invitation_id'			=> $row->id,
				'group_id'				=> $row->group_id,
				'name' 					=> $row->name,
				'admin_first_name' 		=> $group_admin['first_name'],
				'admin_last_name' 		=> $group_admin['last_name'],
				'admin_profile_picture' => $group_admin['profile_picture'],
			);
		}

		return $pending_invitations;
	}// get_pending_invitation_by_user

	/**
	 * Get Facebook friends who have a pending invitation to a group
	 *
	 * @param int $group_id
	 * @return mixed $pending_friends;
	 * @author Miguel Cabral
	 **/
	function get_pending_invitations_by_group($group_id)
	{
		$query = $this->db->get_where('group_invitations', array('group_id' => $group_id));

		if ($query->num_rows() < 1)
			return 0;

		foreach ($query->result() as $key => $row)
		{
			$friend_info = $this->facebook->get_user_by_id($row->invited_fb_user_id);
			$friend_picture = $this->facebook->get_user_profile_pic_by_id($row->invited_fb_user_id);

		    $pending_friends[$key] = array(
		    	'group_id'				=> $row->group_id,
		    	'invited_fb_user_id'	=> $row->invited_fb_user_id,
				'name' 					=> $friend_info['first_name'].' '.$friend_info['last_name'],
				'profile_picture' 		=> $friend_picture,
			);
		}

		return $pending_friends;
	}// get_pending_invitations_by_group

	/**
	 * Returns the group administrator of a given group
	 *
	 * @param int $group_id
	 * @return mixed $group_admin;
	 * @author Miguel Cabral
	 **/
	function get_group_admin($group_id)
	{
		// Get admin's Facebook id
		$this->db->select('facebook_users_id');
		$this->db->from('group_friends');
		$this->db->where('group_id', $group_id);
		$this->db->where('is_admin', 1);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		// Get admin's Facebook info 
		$row = $query->row(); 
		$group_admin_info = $this->facebook->get_user_by_id($row->facebook_users_id);
		$group_admin_picture = $this->facebook->get_user_profile_pic_by_id($row->facebook_users_id);

		$group_admin = array(
			'fb_user_id'		=> $row->facebook_users_id,
			'first_name' 		=> $group_admin_info['first_name'],
			'last_name' 		=> $group_admin_info['last_name'],	
			'profile_picture' 	=> $group_admin_picture,
			);
		
		return $group_admin;
	}// get_group_admin

	/**
	 * Checks the group exchange has already happened
	 *
	 * @param int $group_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	function is_after_exchange($group_id)
	{
		$this->db->select('id');
		$this->db->where('id', $group_id);
		$this->db->where('exchange_date >', date('Y-m-d'));
		$query = $this->db->get('exchange_groups');

		if ($query->num_rows() < 1){
			$this->close_group($group_id);
			return 1;
		}

		return 0;
	}// is_after_exchange

	/**
	 * Checks if the group has been closed
	 *
	 * @param int $group_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	function is_group_closed($group_id)
	{
		$this->db->select('id');
		$this->db->where('id', $group_id);
		$this->db->where('status', 1);
		$query = $this->db->get('exchange_groups');

		if ($query->num_rows() < 1)
			return 0;

		return 1;
	}// is_after_exchange

	/**
	 * Sets a group as closed
	 *
	 * @param int $group_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	function close_group($group_id)
	{
		$update_data = array('status' => 1);
		$this->db->where('id', $group_id);
		$this->db->update('exchange_groups', $update_data);

	}// is_after_exchange

	/**
	 * Checks if group has pending invitations.
	 *
	 * @param int $group_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	function has_pending_invitations($group_id)
	{
		$this->db->select('id');
		$this->db->where('group_id', $group_id);
		$query = $this->db->get('group_invitations');

		if ($query->num_rows() < 1)
			return 0;

		return 1;
	}// has_pending_invitations

	/**
	 * Checks the status of a user's groups and takes action adordingly.
	 *
	 * @param int $fb_user_id
	 * @author Miguel Cabral
	 **/
	function check_groups_status()
	{
		// METER QUE EL GRUPO YA NO ESTE ACTIVO
		$this->db->select('id');
		$this->db->where('join_deadline <', date('Y-m-d'));
		$this->db->where('status', 0);
		$query = $this->db->get('exchange_groups');

		if ($query->num_rows() < 1)
			return 0;

		$this->load->model('group_invitation');
		foreach ($query->result() as $key => $row)
		{
			$this->group_invitation->remove_pending_invitation_by_group($row->id);
			$this->randomize_secret_friends($row->id);
		}

		return 1;
	}// check_groups_status

	/**
	 * Get groups with pending deadlines for the current user
	 *
	 * @param int $fb_user_id
	 * @return array $pending_groups or 0
	 * @author Miguel Cabral
	 **/
	private function get_groups_with_pending_deadline($fb_user_id)
	{
		$user_groups = $this->get_groups_by_user($fb_user_id);
		$pending_groups = array();

		if($user_groups == 0)
			return 0;

		foreach ($user_groups as $group)
		{
			if($this->has_secret_friends($group['id']))
				continue;
			array_push($pending_groups, $group['id']);
		}

		if(count($pending_groups) == 0)
			return 0;

		return $pending_groups;		
	}// get_groups_with_pending_deadline

	/**
	 * Check if a group has secret friends
	 *
	 * @param int $group_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	private function has_secret_friends($group_id)
	{
		$this->db->select('group_friends.id');
		$this->db->from('group_friends');
		$this->db->join('secret_friends', 'group_friends.id = secret_friends.from_group_friend_id');
		$this->db->where('group_id', $group_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return FALSE;

		return TRUE;
	}// has_secret_friends

	/**
	 * Randomize friends in an exchange group
	 *
	 * @param int $group_id
	 * @author Miguel Cabral
	 **/
	function randomize_secret_friends($group_id)
	{
		$this->close_group($group_id);
		
		$group_friends = $this->get_group_friends($group_id);
		$from_friends = array();
		$to_friends = array();
		
		if(count($group_friends) < 2)
			return;

		foreach ($group_friends as $key => $friend) {
			array_push($from_friends, $friend['id']);
			if($key == 0) $admin_id = $friend['id'];
			if($key > 0) array_push($to_friends, $friend['id']);
			$this->facebook->send_group_notification($friend['fb_user_id']);
		}
		array_push($to_friends, $admin_id);

		// Add secret friends
		$this->load->model('secret_friend');
		$this->secret_friend->add_secret_friends($from_friends, $to_friends);


	}// has_secret_friends

	/**
	 * Check groups that are passed the exchange date and notify group friends if they have a video by their secret friend.
	 *
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	function post_video_to_secret_friends(){

		$group_ids = $this->get_finished_groups();

		if ($group_ids == 0) return 0;

		$this->db->select('facebook_users_id, group_id, to_group_friend_id, secret_friend_videos.id');
		$this->db->from('group_friends');
		$this->db->join('secret_friends', 'secret_friends.from_group_friend_id = group_friends.id');
		$this->db->join('secret_friend_videos', 'secret_friend_videos.secret_friend_id = secret_friends.id');
		$this->db->where('was_posted', 0);
		$this->db->where_in('group_id', $group_ids);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$this->load->model('user_activity');
		$this->load->model('group_friend');
		$this->load->model('secret_friend_video');

		foreach ($query->result() as $key => $row){
			$friend_fb_id = $this->group_friend->get_fb_id($row->to_group_friend_id);
			$this->secret_friend_video->set_was_posted($row->id);
			$video = $this->facebook->send_video_notification($friend_fb_id, $row->to_group_friend_id);
			$this->user_activity->secret_friend_video($row->facebook_users_id, $row->group_id, $friend_fb_id, 5, $row->to_group_friend_id);
		}

		$this->mark_groups_as_finished($group_ids);
		
		return 1;
	}// post_video_to_secret_friends

	/**
	 * Returns the ids of the groups that have finished the exchange
	 *
	 * @return array $group_ids or 0
	 * @author Miguel Cabral
	 **/
	function get_finished_groups(){
		$this->db->select('id');
		$this->db->where('exchange_date <', date('Y-m-d'));
		$this->db->where('status', 0);
		$query = $this->db->get('exchange_groups');

		if ($query->num_rows() < 1)
			return 0;

		$group_ids = array();
		foreach ($query->result() as $row) array_push($group_ids, $row->id);
		
		return $group_ids;
	}// get_finished_groups

	/**
	 * Remove a friend from a group
	 *
	 * @return int $group_friend_id
	 * @author Miguel Cabral
	 **/
	function remove_friend($group_friend_id){
		$delete_data = array('id' => $group_friend_id);
		$this->db->delete('group_friends', $delete_data);
	}// remove_friend

	/**
	 * Remove an invited friend from a group
	 *
	 * @return int $group_friend_id
	 * @author Miguel Cabral
	 **/
	function remove_invited_friend($fb_user_id, $group_id){
		$delete_data = array('invited_fb_user_id' => $fb_user_id, 'group_id' => $group_id);
		$this->db->delete('group_invitations', $delete_data);
	}// remove_invited_friend

	/**
	 * Insert in db's table cron_job_log
	 *
	 * @return void
	 * @author Zurol
	 **/
	function cron_job_log_register($function_name, $returned_value){
		$sql_query = 'insert into cron_job_log (function_name, returned_value, created_at) VALUES (\''.$function_name.'\', \''.$returned_value.'\', \''.date("Y-m-d H:i:s").'\');';

		$this->db->query($sql_query);

	}// cron_job_log_register

	/**
	 * Insert in db's table cron_job_log
	 *
	 * @return void
	 * @author Zurol
	 **/
	function cron_job_log_register2($function_name, $returned_value){
		$insert_data = array(
			'function_name' 	=> $function_name,
			'returned_value' 	=> $returned_value,
			'created_at' 		=> date("Y-m-d H:i:s")
		);

		$this->db->insert('cron_job_log', $insert_data);
		//$this->db->insert_string('cron_job_log', $insert_data);

	}// cron_job_log_register

	/**
	 * Send reminder to group administrators
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function send_invitation_reminder()
	{
		$group_admins = $this->get_admins_with_pending_friends();
		
		if($group_admins == 0) return 0;

		foreach ($group_admins as $id) $fb = $this->facebook->send_remainder_notification($id);
	}// send_invitation_reminder

	/**
	 * Send reminder to group administrators
	 *
	 * @param string $friend_name, int $group_id, string $action
	 * @return void
	 * @author Miguel Cabral
	 **/
	public function send_invitation_status_to_admin($friend_name, $group_id, $action)
	{
		$group_details = $this->get_group_details($group_id);
		$this->facebook->send_invitation_status_notification($group_details['admin_id'], $friend_name, $action, $group_details['name']);
	}// send_invitation_reminder

	/**
	 * Get id of all administrators with pending invited friends.
	 *
	 * @return array $facebook_user_ids
	 * @author Miguel Cabral
	 **/
	public function get_admins_with_pending_friends()
	{	
		$this->db->select('facebook_users_id');
		$this->db->from('exchange_groups');
		$this->db->join('group_friends', 'exchange_groups.id = group_friends.group_id');
		$this->db->join('group_invitations', 'exchange_groups.id = group_invitations.group_id');
		$this->db->where('is_admin', 1);
		$this->db->group_by('facebook_users_id');
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$facebook_user_ids = array();
		foreach ($query->result() as $row) array_push($facebook_user_ids, $row->facebook_users_id);

		return $facebook_user_ids;
	}// get_admins_with_pending_friends

	/**
	 * Get Facebook id of pending invited friends by user.
	 *
	 * @return array $facebook_user_ids
	 * @author Miguel Cabral
	 **/
	public function get_pending_group_friends_by_user($fb_user_id)
	{	
		$this->db->select('invited_fb_user_id');
		$this->db->from('exchange_groups');
		$this->db->join('group_friends', 'exchange_groups.id = group_friends.group_id');
		$this->db->join('group_invitations', 'exchange_groups.id = group_invitations.group_id');
		$this->db->where('facebook_users_id', $fb_user_id);
		$this->db->group_by('invited_fb_user_id');
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$facebook_user_ids = array();
		foreach ($query->result() as $row) array_push($facebook_user_ids, $row->invited_fb_user_id);

		return implode(',', $facebook_user_ids);
	}// get_pending_group_friends_by_user

}// clase Exchange_group