<?php
if(!class_exists('User')){ require('user.php'); }

/**
 * This class will be used to represent a Facebook user.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Facebook_user extends User {

	private $fb_user_id;
	private $fb_access_token;
	private $gender;
	private $email;

	/**
	 * Creates a Facebook_User in database
	 *
	 * @param array $user_data 
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_user($user_data = array())
	{
		$user_id = parent::create_user($user_data);

		// Create user only if it doesn't exist
		if(!$this->validate_fb_user($user_id)){
			$insert_data = array(
			'user_id' 			=> $user_id,
			'fb_user_id'		=> $user_data['id'],
			'fb_access_token'	=> $user_data['access_token'],
			'gender' 			=> $user_data['gender'],
			'created_at' 		=> date("Y-m-d H:i:s")
			);
			$this->db->insert('Facebook_Users', $insert_data);

			$respuesta = array(
				'error' 	=> '0',
				'message'	=> 'User created successfully!');
			$this->output->set_output(json_encode($respuesta));	

			return;
		}// if

		$respuesta = array(
				'error' 	=> '1',
				'message'	=> 'User already exists!');
		$this->output->set_output(json_encode($respuesta));	

	}// create_user

	/**
	 * Check if user exists in Facebook_Users table
	 *
	 * @param string $fb_user_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	private function validate_fb_user($user_id){
		$query = $this->db->get_where('Facebook_Users', array('user_id' => $user_id));
		
		if($query->num_rows() > 0) return TRUE;
		
		return FALSE; 
		
	}// validate_user

	/**
	 * Get a Facebook_user from the database using it's Facebook id
	 *
	 * @param array $fb_user_id
	 * @return mixed $fb_user_data;
	 * @author Miguel Cabral
	 **/
	function get_fb_user($fb_user_id)
	{
		$query = $this->db->get_where('Facebook_Users', array('fb_user_id' => $fb_user_id));
		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row(); 

		$fb_user_data = array(
			'user_id' 		=> $row->user_id,
			'fb_user_id' 	=> $fb_user_id,
			'gender' 		=> $row->gender,
		);
		$user_data = parent::get_user($row->user_id);

		$fb_user_data['first_name'] = $user_data['first_name'];
		$fb_user_data['last_name'] = $user_data['last_name'];

		return $fb_user_data;
	}// get_user

	
		
}// clase Facebook_user