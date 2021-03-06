<?php

/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Group_invitation extends CI_Model {

	private $group_id;
	private $invited_fb_user_id;
	private $expiration_date;
	private $sent_date;

	/**
	 * Constructor for Group_invitation
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
	 * Creates a Group_invitation in the database.
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_invitation($invitation_data)
	{
		if($this->has_pending_invitation())
			return;

		$insert_data = array(
			'group_id' 				=> $invitation_data['group_id'],
			'invited_fb_user_id' 	=> $invitation_data['invited_fb_user_id'],
			'created_at' 			=> date("Y-m-d H:i:s")
			);

		$this->db->insert('group_invitations', $insert_data);
	}// create_invitation

	/**
	 * Check if invited user was previously invited to the group.
	 *
	 * @param string $fb_user_id
	 * @return boolean 
	 * @author Miguel Cabral
	 **/
	function has_pending_invitation()
	{
		$group_data = array(
			'group_id' => $this->group_id,
			'invited_fb_user_id' => $this->invited_fb_user_id
			);
		$query = $this->db->get_where('group_invitations', $group_data);

		if($query->num_rows() > 0)
			return 1;

		return 0;
	}// has_pending_invitation	

	/**
	 * Removes a Group_invitation from the database.
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function remove_invitation($invitation_data)
	{
		$delete_data = array(
			'group_id' 				=> $invitation_data['group_id'],
			'invited_fb_user_id' 	=> $invitation_data['invited_fb_user_id'],
			);

		$this->db->delete('group_invitations', $delete_data);
		$this->load->model('rejected_invitation');
		$this->rejected_invitation->save_rejected_invitation($delete_data);
	}// remove_invitation

	/**
	 * Removes a all pending invitations for a given group
	 *
	 * @param int $group_id
	 * @return void
	 * @author Miguel Cabral
	 **/
	function remove_pending_invitation_by_group($group_id)
	{
		$this->db->delete('group_invitations', array('group_id' => $group_id));
	}// remove_invitation
		
}// clase Group_invitation