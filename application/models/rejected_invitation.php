<?php

/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Rejected_invitation extends CI_Model {

	/**
	 * Constructor for Rejected_invitation
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
	 * Saves a Rejected_invitation in the database.
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save_rejected_invitation($invitation_data)
	{
		$insert_data = array(
			'group_id' 				=> $invitation_data['group_id'],
			'invited_fb_user_id' 	=> $invitation_data['invited_fb_user_id'],
			'created_at' 			=> date("Y-m-d H:i:s"),
			);

		$this->db->insert('rejected_invitations', $insert_data);
	}// save_rejected_invitation
		
}// clase Rejected_invitation