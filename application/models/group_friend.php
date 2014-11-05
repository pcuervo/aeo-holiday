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
		$this->db->select('first_name, last_name, fb_user_id');
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
				'name'				=> $row->first_name.' '.$row->last_name,
				'fb_user_id'		=> $row->fb_user_id,
				'friend_picture'	=> $friend_picture, 
				);
		}

		return $group_friend;
	}// get_group_friend

}// clase Group_friend