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
	 * Returns the total of pending invitations
	 *
	 * @return int $rejected_invitations;
	 * @author Zurol
	 **/
	function total_rejected_invitations()
	{
		$this->db->select('id');
		$this->db->from('rejected_invitations');

		return $this->db->count_all_results();
	}// total_rejected_invitations


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
	 * Returns the average number of users per group
	 *
	 * @return int $num_average_users_per_group;
	 * @author Miguel Cabral
	 **/
	function average_users_per_group()
	{
		$sql_query = 'select ROUND(AVG(number_of_members)) as average_users from (SELECT COUNT(id) as number_of_members FROM group_friends GROUP BY group_id) as average';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();
		return round($row->average_users);
		
	}// average_users_per_group

	/**
	 * Returns the total number of accepted invitations in a date range
	 *
	 * @return mixed $accepted_invitations or 0
	 * @author Miguel Cabral
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

	/**
	 * Returns the total number of pending invitations in a date range
	 *
	 * @return mixed $pending_invitations or 0
	 * @author Zurol
	 **/
	function pending_invitations_by_date($start_date, $end_date)
	{
		$sql_query = 'select DATE(created_at) AS date, COUNT( * ) AS num_invitations FROM group_invitations WHERE created_at BETWEEN "'. $start_date .'" AND  "'. $end_date .'" GROUP BY DATE( created_at );';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$pending_invitations = array();
		foreach ($query->result() as $key => $row) {
			$pending_invitations[$key] = array(
				'date'				=> $row->date,
				'num_invitations'	=> $row->num_invitations,
				);
		}

		return $pending_invitations;
	}// pending_invitations_by_date

	/**
	 * Returns the total number of rejected invitations in a date range
	 *
	 * @return mixed $rejected_invitations or 0
	 * @author Zurol
	 **/
	function rejected_invitations_by_date($start_date, $end_date)
	{
		$sql_query = 'select DATE(created_at) AS date, COUNT( * ) AS num_invitations FROM rejected_invitations WHERE created_at BETWEEN "'. $start_date .'" AND  "'. $end_date .'" GROUP BY DATE( created_at );';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$rejected_invitations = array();
		foreach ($query->result() as $key => $row) {
			$rejected_invitations[$key] = array(
				'date'				=> $row->date,
				'num_invitations'	=> $row->num_invitations,
				);
		}

		return $rejected_invitations;
	}// rejected_invitations_by_date

	/**
	 * Returns the total number of sent messages by date
	 *
	 * @return mixed $sent_messages_by_date or 0
	 * @author Zurol
	 **/
	function sent_messages_by_date($start_date, $end_date)
	{
		$sql_query = 'select DATE(created_at) AS date, COUNT( * ) AS sent_messages FROM messages WHERE created_at BETWEEN "'. $start_date .'" AND  "'. $end_date .'" GROUP BY DATE( created_at );';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$sent_messages_by_date = array();
		foreach ($query->result() as $key => $row) {
			$sent_messages_by_date[$key] = array(
				'date'				=> $row->date,
				'sent_messages'	=> $row->sent_messages,
				);
		}

		return $sent_messages_by_date;
	}// sent_messages_by_date


	/**
	 * Returns the total number of users by date
	 *
	 * @return mixed $users_number_by_date or 0
	 * @author Zurol
	 **/
	function users_by_date($start_date, $end_date)
	{
		$sql_query = 'select DATE(created_at) AS date, COUNT( * ) AS users_number FROM facebook_users WHERE created_at BETWEEN "'. $start_date .'" AND  "'. $end_date .'" GROUP BY DATE( created_at );';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$users_by_date = array();
		foreach ($query->result() as $key => $row) {
			$users_by_date[$key] = array(
				'date'				=> $row->date,
				'num_users'		=> $row->users_number,
				);
		}

		return $users_by_date;
	}// users_number_by_date

	/**
	 * Returns the number of members per exchange in a date range
	 *
	 * @return mixed $users_number_by_date or 0
	 * @author Zurol
	 **/
	function members_per_exchange_by_date($start_date, $end_date)
	{
		$sql_query = 'select exchange_groups.name AS name, COUNT( * ) AS number_of_members FROM group_friends LEFT JOIN exchange_groups ON group_friends.group_id = exchange_groups.id WHERE created_at BETWEEN "'. $start_date .'" AND  "'. $end_date .'" GROUP BY DATE( created_at );';
		$query = $this->db->query($sql_query);

		if ($query->num_rows() < 1)
			return 0;

		$members_per_exchange = array();
		foreach ($query->result() as $key => $row) {
			$members_per_exchange[$key] = array(
				'date'				=> $row->name,
				'num_members'		=> $row->number_of_members,
				);
		}

		return $members_per_exchange;
	}// users_number_by_date



}// clase Cms_report