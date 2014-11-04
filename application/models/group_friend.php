<?php

/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Group_friend extends CI_Model {

	private $group_id;
	private $fb_user_id;
	private $is_admin;

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
		// TODO: quitar invitación pendiente 
	}// add_group_friend

}// clase Group_friend