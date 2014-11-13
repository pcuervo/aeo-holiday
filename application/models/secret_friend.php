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
				'created_at' 			=> date("Y-m-d H:i:s"),
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
				'group_friend_id'	=> $row->to_group_friend_id,
				'fb_user_id'		=> $group_friend['fb_user_id'],
				'name'				=> $group_friend['name'],
				'friend_picture'	=> $group_friend['friend_picture'],
				'group'				=> $row->name,
				);
		}

		return $secret_friends;
	}// get_secret_friends_by_user

	/**
	 * Returns a user's secret friend
	 *
	 * @param int fb_user_id
	 * @return mixed $secret_friend or 0
	 * @author Miguel Cabral
	 **/
	function get_secret_friend_by_user($fb_user_id, $to_group_friend_id)
	{
		$this->db->select('secret_friends.id AS secret_friend_id, to_group_friend_id, name, exchange_groups.id as group_id');
		$this->db->from('group_friends');
		$this->db->join('secret_friends', 'group_friends.id = secret_friends.from_group_friend_id');
		$this->db->join('exchange_groups', 'group_friends.group_id = exchange_groups.id');
		$this->db->where('to_group_friend_id', $to_group_friend_id);
		$this->db->where('facebook_users_id', $fb_user_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();

		$secret_friends = array();
		$this->load->model('group_friend');

		$group_friend = $this->group_friend->get_group_friend($row->to_group_friend_id);
		$secret_friends = array(
			'secret_friend_id'	=> $row->secret_friend_id,
			'group_friend_id'	=> $group_friend['group_friend_id'],
			'fb_user_id'		=> $group_friend['fb_user_id'],
			'name'				=> $group_friend['name'],
			'friend_picture'	=> $group_friend['friend_picture'],
			'group_id'			=> $row->group_id,
			'group'				=> $row->name,
			);

		return $secret_friends;
	}// get_secret_friend_by_user

	/**
	 * Returns a user's secret friend
	 *
	 * @param string $fb_user_id, int $group_id
	 * @return mixed $secret_friend or 0
	 * @author Miguel Cabral
	 **/
	function get_group_secret_friends_by_user($fb_user_id, $group_id)
	{
		$this->db->select('to_group_friend_id');
		$this->db->from('group_friends');
		$this->db->join('secret_friends', 'group_friends.id = secret_friends.from_group_friend_id');
		$this->db->where('facebook_users_id', $fb_user_id);
		$this->db->where('group_id', $group_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();

		$this->load->model('group_friend');
		$secret_friend = array();

		$group_friend = $this->group_friend->get_group_friend($row->to_group_friend_id);
		$secret_friend = array(
			'fb_user_id'		=> $group_friend['fb_user_id'],
			'name'				=> $group_friend['name'],
			'friend_picture'	=> $group_friend['friend_picture'],
			);

		return $secret_friend;
	}// get_group_secret_friends_by_user

	/**
	 * Checks if the user has added a video for its secret friend.
	 *
	 * @param string $fb_user_id, int $to_friend
	 * @return mixed $video_data or 0
	 * @author Miguel Cabral
	 **/
	function has_video($fb_user_id, $to_group_friend_id)
	{
		$this->db->select('secret_friends.id, video_url, group_friends.id as group_friend_id');
		$this->db->from('group_friends');
		$this->db->join('secret_friends', 'group_friends.id = secret_friends.from_group_friend_id');
		$this->db->join('secret_friend_videos', 'secret_friends.id = secret_friend_videos.secret_friend_id');
		$this->db->where('facebook_users_id', $fb_user_id);
		$this->db->where('to_group_friend_id', $to_group_friend_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();
		$video_data = array(
				'group_friend_id'	=> $row->group_friend_id,
				'secret_friend_id'	=> $row->id,
				'video_url'			=> $row->video_url,
				);

		return $video_data;
	}// has_video

	/**
	 * Get the video for a secret friend
	 *
	 * @param int $secret_friend_id
	 * @return string $video_url
	 * @author Miguel Cabral
	 **/
	function get_video($secret_friend_id)
	{
		$this->db->select('video_url');
		$this->db->from('secret_friend_videos');
		$this->db->where('secret_friend_id', $secret_friend_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();

		if (strpos($row->video_url,'https:') !== false) 
			return $row->video_url;
		
		return base_url().'uploads/'.$row->video_url;
	}// get_video

	/**
	 * Mark video as seen
	 *
	 * @param int $secret_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function mark_as_seen($secret_friend_id)
	{
		$update_data = array('was_seen' => 1);
		$this->db->where('secret_friend_id', $secret_friend_id);
		$this->db->update('secret_friend_videos', $update_data);
	}// mark_as_seen

	/**
	 * Returns secret friend
	 *
	 * @param int $secret_friend_id
	 * @return mixed $secret_friend_data
	 * @author Miguel Cabral
	 **/
	function get_secret_friend($secret_friend_id)
	{
		$this->db->select('facebook_users_id, from_group_friend_id, to_group_friend_id');
		$this->db->from('secret_friends');
		$this->db->join('group_friends', 'group_friends.id = secret_friends.to_group_friend_id');
		$this->db->where('secret_friends.id', $secret_friend_id);
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();
		$secret_friend_data = array(
			'facebook_users_id'		=> $row->facebook_users_id,
			'from_group_friend_id' 	=> $row->from_group_friend_id,
			'to_group_friend_id' 	=> $row->to_group_friend_id,
			);

		return $secret_friend_data;
	}// get_secret_friend

}// clase Secret_friend