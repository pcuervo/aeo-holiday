<?php

/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Group_friend extends CI_Model {

	/**
	 * Constructor for Group_friend
	 *
	 * @param int $group_id, string $invited_fb_user_id
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Adds a Facebook user to an exchange group.
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function add_group_friend($friend_data)
	{
		// TODO: validar si ya existe ese amigo en el grupo.
		$insert_data = array(
			'group_id' 			=> $friend_data['group_id'],
			'facebook_users_id' => $friend_data['facebook_users_id'],
			'is_admin' 			=> $friend_data['is_admin'],
			'created_at' 		=> date("Y-m-d H:i:s"),
			);

		$this->db->insert('group_friends', $insert_data);
	}// add_group_friend

	/**
	 * Returns a group friend
	 *
	 * @param $group_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function get_group_friend($group_friend_id)
	{
		$this->db->select('group_friends.id, first_name, last_name, fb_user_id, group_id');
		$this->db->from('group_friends');
		$this->db->join('facebook_users', 'group_friends.facebook_users_id = facebook_users.fb_user_id');
		$this->db->join('users', 'users.id = facebook_users.user_id');
		$this->db->where('group_friends.id', $group_friend_id);
		$query = $this->db->get();

		$this->load->library('facebook');
		$group_friend = array();
		foreach ($query->result() as $row) {
			$friend_picture = $this->facebook->get_user_profile_pic_by_id($row->fb_user_id);
			$group_friend = array(
				'group_friend_id'	=> $row->id,
				'name'				=> $row->first_name.' '.$row->last_name,
				'fb_user_id'		=> $row->fb_user_id,
				'friend_picture'	=> $friend_picture, 
				'group_id'			=> $row->group_id, 
				);
		}

		return $group_friend;
	}// get_group_friend

	/**
	 * Returns a group friend id
	 *
	 * @param $fb_user_id
	 * @return int $id
	 * @author Miguel Cabral
	 **/
	function get_group_friend_id_by_fb_id($fb_user_id)
	{
		$this->db->select('id');
		$this->db->where('facebook_users_id', $fb_user_id);
		$query = $this->db->get('group_friends');

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();
		$id = $row->id;
		
		return $id;
	}// get_group_friend_by_fb_id

	/**
	 * Returns messages for a group friend
	 *
	 * @param string $group_friend_id
	 * @return mixed $messages_data or 0
	 * @author Miguel Cabral
	 **/
	function get_messages_by_group_friend($group_friend_id)
	{
		$this->db->select('name, from_group_friend_id, message_text, was_read, messages.created_at');
		$this->db->from('group_friends');
		$this->db->join('messages', 'group_friends.id = messages.to_group_friend_id');
		$this->db->join('exchange_groups', 'exchange_groups.id = group_friends.group_id');
		$this->db->where('group_friends.id', $group_friend_id);
		$this->db->order_by('messages.created_at');
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$messages_data = array();
		foreach ($query->result() as $key => $row) {
			$messages_data[$key] = array(
				'group_name'			=> $row->name,
				'from_group_friend_id'	=> $row->from_group_friend_id,
				'message_text'			=> $row->message_text,
				'was_read'				=> $row->was_read, 
				'created_at'			=> $row->created_at, 
				);
		}

		return $messages_data;
	}// get_messages_by_group_friend

	/**
	 * Returns message sender's Facebook name and profile pic
	 *
	 * @param array $message_senders
	 * @return mixed $message_senders_data
	 * @author Miguel Cabral
	 **/
	function get_message_senders($message_senders)
	{
		$this->db->select('id, facebook_users_id');
		$this->db->from('group_friends');
		$this->db->where_in('id', $message_senders);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$this->load->library('facebook');
		$message_senders_data = array();
		foreach ($query->result() as $key => $row) {
			$fb_user = $this->facebook->get_user_by_id($row->facebook_users_id);
			$fb_user_pic = $this->facebook->get_user_profile_pic_by_id($row->facebook_users_id);
			$message_senders_data[$key] = array(
				'group_friend_id'	=> $row->id,
				'name'				=> $fb_user['first_name'].' '.$fb_user['last_name'],
				'profile_pic'		=> $fb_user_pic,
				);
		}

		return $message_senders_data;
	}// get_message_senders

}// clase Group_friend