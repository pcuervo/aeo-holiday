<?php
if(!class_exists('Group_invitation')){ require('group_invitation.php'); }
/**
 * This class will be used to represent the invitations made by a group admin to his/her friends.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Exchange_group extends CI_Model {

	private $group_id;
	private $group_name;
	private $group_description;
	private $exchange_date;
	private $join_deadline;
	private $pending_invitations = array();
	// Add all attributes later....

	/**
	 * Constructor for Exchange_group
	 *
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Creates an Exchange_Group in the database.
	 *
	 * @param array $group_data 
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_group($group_data = array())
	{
		$insert_data = array(
			'name' 			=> $group_data['name'],
			'description'	=> $group_data['description'],
			'exchange_date'	=> $group_data['exchange_date'],
			'join_deadline' => $group_data['join_deadline'],
			'place'			=> $group_data['place'],
			'budget'		=> $group_data['budget'],
			'created_at' 	=> date("Y-m-d H:i:s")
			);
		$this->db->insert('Exchange_Groups', $insert_data);

		$this->group_id = $this->db->insert_id();
		$this->create_pending_invitations($group_data['invited_friends']);

		$respuesta = array(
				'error' 	=> '0',
				'message'	=> 'Group created successfully!');
		$this->output->set_output(json_encode($respuesta));	

	}// create_group

	/**
	 * Store pending group invitations.
	 *
	 * @param array $invited_friends
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_pending_invitations($invited_friends = array())
	{
		foreach ($invited_friends as $key => $friend_id) {
			$invitation = new Group_invitation($this->group_id, $friend_id);
			$this->pending_invitations[$key] = $invitation;
		}// foreach

		var_dump($this->pending_invitations);
	}// create_pending_invitations

		
}// clase Exchange_group