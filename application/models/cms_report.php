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
	 * Returns the total of accepted invitations
	 *
	 * @return int $accepted_invitations;
	 * @author Miguel Cabral
	 **/
	function total_accepted_invitations()
	{
		$this->db->select('id');
		$this->db->where('is_admin', 0);
		$this->db->from('group_friends');

		return $this->db->count_all_results();
	}// total_accepted_invitations


	/**
	 * Returns the total of pending invitations
	 *
	 * @return int $pending_invitations;
	 * @author Zurol
	 **/
	function total_pending_invitations()
	{
		$this->db->select('id');
		$this->db->from('group_invitations');

		return $this->db->count_all_results();
	}// total_pending_invitations


	/**
	 * Returns the total number of exchange groups
	 *
	 * @return int $total_exchange_groups;
	 * @author Zurol
	 **/
	function total_exchange_groups()
	{
		$this->db->select('id');
		$this->db->from('exchange_groups');

		return $this->db->count_all_results();
	}// total_exchange_groups


	/**
	 * Returns the total number of users of the site overall
	 *
	 * @return int $total_fb_users;
	 * @author Zurol
	 **/
	function total_fb_users()
	{
		$this->db->select('id');
		$this->db->from('facebook_users');

		return $this->db->count_all_results();
	}// total_fb_users

	/**
	 * Returns the total number of users of the site overall
	 *
	 * @return int $total_sent_messages;
	 * @author Zurol
	 **/
	function total_sent_messages()
	{
		$this->db->select('id');
		$this->db->from('messages');

		return $this->db->count_all_results();
	}// total_sent_messages

	/**
	 * Returns the total number of users of the site overall
	 *
	 * @return int $total_closed_exchanges;
	 * @author Zurol
	 **/
	function total_closed_exchanges()
	{
		$this->db->select('id');
		$this->db->where(`exchange_date <`, date('YYYY-mm-dd'));
		$this->db->from('exchange_groups');
		
		return $this->db->count_all_results();
	}// total_closed_exchanges

}// clase Cms_report