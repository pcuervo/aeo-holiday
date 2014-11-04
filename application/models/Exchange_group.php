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
	// Add all attributes later....

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
			'created_at' 	=> date("Y-m-d H:i:s")
			);
		$this->db->insert('exchange_groups', $insert_data);
		$this->group_id = $this->db->insert_id();

		$this->set_group_admin($group_data['admin_id']);
		$this->create_pending_invitations($group_data['invited_friends']);

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
		$this->db->select('*');
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
				'name' 				=> $friend_info['first_name'].' '.$friend_info['last_name'],
				'profile_picture' 	=> $friend_picture,
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
			'first_name' 		=> $group_admin_info['first_name'],
			'last_name' 		=> $group_admin_info['last_name'],	
			'profile_picture' 	=> $group_admin_picture,
			);
		
		return $group_admin;
	}// get_pending_invitation_by_user
		
}// clase Exchange_group