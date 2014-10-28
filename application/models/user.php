<?php
/**
 * This is an abstract User class and it will work as the parent of Facebook users and CMS users.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
abstract class User extends CI_Model {

	private $user_id;
	private $first_name;
	private $last_name;
	private $email;

	/**
	 * Constructor
	 *
	 * @return void
	 * @author 
	 **/
	public function __construct($user_data = array())
	{
		$this->load->database();
	}// constructor

	/**
	 * Create a User in database.
	 * 
	 * @param array $user_data 
	 * @return boolean TRUE or FALSE
	 * @author 
	 **/
	function create_user($user_data = array())
	{
		// ¿Does this user exist?
		if($this->validate_user($user_data['email']))
			return $this->validate_user($user_data['email']);

		$insert_data = array(
			'first_name' 	=> $user_data['first_name'],
			'last_name' 	=> $user_data['last_name'],
			'email' 		=> $user_data['email'],
			'created_at'	=> date("Y-m-d H:i:s")
			);

		$this->db->insert('Users', $insert_data);
		$user_id = $this->db->insert_id();

		return $user_id;
	}// create_user

	/**
	 * Check if user exists in Users table
	 *
	 * @param string $email
	 * @return int $user_id or 0 
	 * @author 
	 **/
	private function validate_user($email){
		$query = $this->db->get_where('Users', array('email' => $email));
		
		if($query->num_rows() > 0) return $query->first_row()->id;
		
		return 0; 
	}// validate_user

	/**
	 * Get a User from the database using it's id
	 *
	 * @param array $user_id
	 * @return $mixed $user_data
	 * @author Miguel Cabral
	 **/
	function get_user($user_id)
	{
		$query = $this->db->get_where('Users', array('id' => $user_id));
		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row(); 

		$user_data = array(
			'first_name' 	=> $row->first_name,
			'last_name' 	=> $row->last_name,
			'email' 		=> $row->email,
		);

		return $user_data;
	}// get_user


		
}// clase User