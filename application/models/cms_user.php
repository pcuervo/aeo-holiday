<?php
if(!class_exists('User')){ require('user.php'); }

/**
 * This class will be used to represent a Facebook user.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Cms_user extends User {

	/**
	 * Constructor for Cms_user
	 *
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Validates if a user exists in database
	 *
	 * @param string $user, string $password
	 * @return boolean 
	 * @author Miguel Cabral
	 **/
	function validate($username, $password)
	{
		$this->db->select('id, first_name, last_name, username, role');
		$this->db->from('users');
		$this->db->join('cms_users', 'cms_users.user_id = users.id');
		$this->db->where('username', $username);
		$this->db->where('password', $password);
		$query = $this->db->get();

		if ($query->num_rows() < 1) return FALSE;

		$row = $query->row();

		$user_data = array(
			'id'			=> $row->id,
			'first_name'	=> $row->first_name,
			'last_name'		=> $row->last_name,
			'username'		=> $row->username,
			'role'			=> $row->role,
			);

		return $user_data;
	}// exists
	
		
}// clase Cms_user