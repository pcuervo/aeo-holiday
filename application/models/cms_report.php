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
		$this->db->where('exchange_date >=', date('Y-m-d'));
		$this->db->from('exchange_groups');
		
		return $this->db->count_all_results();
	}// total_closed_exchanges

	/**
	 * Returns the total number of users of the site overall
	 *
	 * @return int $accepted_invitations;
	 * @author Zurol
	 **/
	function accepted_invitations_by_date($start_date, $end_date)
	{
		$sql_query = 'select DATE(created_at) AS date, COUNT( * ) AS num_invitations FROM group_friends WHERE  is_admin=0 AND  created_at BETWEEN "'. $start_date .'" AND  "'. $end_date .'" GROUP BY DATE( created_at );';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$accepted_invitations = array();
		foreach ($query->result() as $key => $row) {
			$accepted_invitations[$key] = array(
				'date'				=> $row->date,
				'num_invitations'	=> $row->num_invitations,
				);
		}

		return $accepted_invitations;
	}// accepted_invitations_by_date

}// clase Cms_report