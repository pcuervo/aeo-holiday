<?php

/**
 * This class will be used to represent a message between group friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Message extends CI_Model {

	/**
	 * Constructor for Message
	 *
	 * @author Miguel Cabral
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Stores a message in the database
	 *
	 * @param int $from, int $to, string $message
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save($from, $to, $message)
	{
		$message_data = array(
			'from_group_friend_id' 	=> $from,
			'to_group_friend_id'	=> $to,
			'message_text'				=> $message,
			'was_read'				=> 0,
			'created_at'			=> date("Y-m-d H:i:s"),
			);
		$this->db->insert('messages', $message_data);
	}// add_secret_friends

}// clase Message