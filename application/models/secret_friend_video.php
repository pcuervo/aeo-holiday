<?php

/**
 * This class will be used to represent the secret friends of a group.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Secret_friend_video extends CI_Model {

	/**
	 * Constructor for Secret_friend_video
	 *
	 * @author Miguel Cabral
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Saves secret friend's video in database.
	 *
	 * @param string $video_url, int $secret_friend_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save_video($video_url, $secret_friend_id)
	{
		$video_data = array(
				'secret_friend_id' 	=> $secret_friend_id,
				'video_url' 		=> $video_url,
				'was_posted' 		=> FALSE,
				'was_seen'			=> FALSE,
				'created_at' 		=> date("Y-m-d H:i:s"),
				);
		$this->db->insert('secret_friend_videos', $video_data);
		return $this->db->insert_id();
	}// save_video

	/**
	 * Set a video as posted
	 *
	 * @param string $video_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function set_was_posted($video_id)
	{
		$video_data = array('was_posted' => TRUE);
		$this->db->where('id', $video_id);
		$this->db->update('secret_friend_videos', $video_data);
	}// save_video

}// clase Secret_friend_video