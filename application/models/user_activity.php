<?php

/**
 * This class will be used to represent the user's actividy feed.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class User_activity extends CI_Model {

	/**
	 * Constructor for User_activity
	 *
	 * @return void
	 * @author
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Saves the activity that group has been created
	 *
	 * @param int $fb_user_id, int $group_id, int $activity_type
	 * @return void
	 * @author Miguel Cabral
	 **/
	function group_created($fb_user_id, $group_id, $activity_type)
	{
		$insert_data = array(
			'fb_user_id' 	=> $fb_user_id,
			'group_id' 		=> $group_id,
			'created_at' 	=> date("Y-m-d H:i:s"),
			'activity_type'	=> $activity_type,
			);

		$this->db->insert('user_activity', $insert_data);
	}// group_created

	/**
	 * Saves the activity that a group invitation has been accepted
	 *
	 * @param int $fb_user_id, int $group_id, int $friend_fb_id, int $activity_type
	 * @return void
	 * @author Miguel Cabral
	 **/
	function invitation_accepted($fb_user_id, $group_id, $friend_fb_id, $activity_type)
	{
		$insert_data = array(
			'fb_user_id' 	=> $fb_user_id,
			'group_id' 		=> $group_id,
			'friend_fb_id' 	=> $friend_fb_id,
			'created_at' 	=> date("Y-m-d H:i:s"),
			'activity_type'	=> $activity_type,
			);

		$this->db->insert('user_activity', $insert_data);
	}// invitation_accepted

	/**
	 * Saves the activity that a group invitation has been rejected
	 *
	 * @param int $fb_user_id, int $group_id, int $friend_fb_id, int $activity_type
	 * @return void
	 * @author Miguel Cabral
	 **/
	function invitation_rejected($fb_user_id, $group_id, $friend_fb_id, $activity_type)
	{
		$this->invitation_accepted($fb_user_id, $group_id, $friend_fb_id, $activity_type);
	}// invitation_rejected

	/**
	 * Gets the user's activity by Facebook id
	 *
	 * @param int $fb_user_id
	 * @return mixed $user_activity
	 * @author Miguel Cabral
	 **/
	function get_user_activity_by_fb_id($fb_user_id)
	{
		$this->db->select('friend_fb_id, group_id, user_activity.created_at, action, name, activity_type');
		$this->db->from('user_activity');
		$this->db->join('activity_type', 'activity_type.id = user_activity.activity_type');
		$this->db->join('exchange_groups', 'exchange_groups.id = user_activity.group_id');
		$this->db->where('user_activity.fb_user_id', $fb_user_id);
		$this->db->limit(5);
		$this->db->order_by('created_at');
		$query = $this->db->get();

		if ($query->num_rows() < 1)
			return 0;

		$user_activity = array();
		$this->load->library('facebook');
		foreach ($query->result() as $key => $row) {
			$friend_name = '';
			$friend_pic = '';
			if($row->friend_fb_id != ''){
				$friend_data = $this->facebook->get_user_by_id($row->friend_fb_id);
				$friend_name = $friend_data['first_name'].' '.$friend_data['last_name'];
				$friend_pic = $this->facebook->get_user_profile_pic_by_id($row->friend_fb_id);
			}

			$user_activity[$key] = array(
				'friend_fb_id'	=> $row->friend_fb_id,
				'friend_name'	=> $friend_name,
				'friend_pic'	=> $friend_pic,
				'group_id'		=> $row->group_id,
				'created_at'	=> $row->created_at,
				'action'		=> $row->action,
				'group_name'	=> $row->name,
				'activity_type'	=> $row->activity_type,
				);
		}

		return $user_activity;
	}// get_user_activity_by_fb_id

	/**
	 * Saves the activity that a user has a video from his/her secret friend
	 *
	 * @param int $fb_user_id, int $group_id, int $friend_fb_id, int $activity_type
	 * @return void
	 * @author Miguel Cabral
	 **/
	function secret_friend_video($fb_user_id, $group_id, $friend_fb_id, $activity_type)
	{
		$insert_data = array(
			'fb_user_id' 	=> $fb_user_id,
			'group_id' 		=> $group_id,
			'friend_fb_id' 	=> $friend_fb_id,
			'created_at' 	=> date("Y-m-d H:i:s"),
			'activity_type'	=> $activity_type,
			);

		$this->db->insert('user_activity', $insert_data);
	}// secret_friend_video

}// clase User_activity