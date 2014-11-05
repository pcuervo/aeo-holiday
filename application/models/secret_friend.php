<?php

/**
 * This class will be used to represent the secret friends of a group.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Secret_friend extends CI_Model {

	/**
	 * Constructor for Secret_friend
	 *
	 * @author Miguel Cabral
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Adds a group's secret friends to the database.
	 *
	 * @param array $from_friends, array $to_friends
	 * @return void
	 * @author Miguel Cabral
	 **/
	function add_secret_friends($from_friends, $to_friends)
	{
		foreach ($from_friends as $key => $from_friend) {
			$secret_friend_data = array(
				'from_group_friend_id' 	=> $from_friend,
				'to_group_friend_id' 	=> $to_friends[$key],
				'created_at' 		=> date("Y-m-d H:i:s"),
				);
			$this->db->insert('secret_friends', $secret_friend_data);
		}
	}// add_secret_friends

	/**
	 * Returns a user's secret friends
	 *
	 * @param int fb_user_id
	 * @return mixed $secret_friends or 0
	 * @author Miguel Cabral
	 **/
	function get_secret_friends_by_user($fb_user_id)
	{
		$this->db->select('to_group_friend_id, name, group_friends.id AS id');
		$this->db->from('group_friends');
		$this->db->join('secret_friends', 'group_friends.id = secret_friends.from_group_friend_id');
		$this->db->join('exchange_groups', 'group_friends.group_id = exchange_groups.id');
		$this->db->where('facebook_users_id', $fb_user_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$secret_friends = array();
		$this->load->model('group_friend');
		foreach ($query->result() as $key => $row) {
			$group_friend = $this->group_friend->get_group_friend($row->to_group_friend_id);
			$secret_friends[$key] = array(
				'group_friend_id'	=> $row->id,
				'fb_user_id'		=> $group_friend['fb_user_id'],
				'name'				=> $group_friend['name'],
				'friend_picture'	=> $group_friend['friend_picture'],
				'group'				=> $row->name,
				);
		}

		return $secret_friends;
	}// get_secret_friends_by_user

}// clase Secret_friend