<?php
/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Cms_report extends CI_Model {

	/**
	 * Constructor for Cms_report
	 *
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Returns the group's details
	 *
	 * @return int $accepted_invitations;
	 * @author Miguel Cabral
	 **/
	function total_accepted_invitations()
	{
		// SELECT COUNT(*) FROM `group_friends` WHERE `is_admin` = 0;
		$this->db->select('*');
		$this->db->where('is_admin', 0);
		$this->db->from('group_friends');

		return $this->db->count_all_results();
	}// get_group_details

}// clase Cms_report