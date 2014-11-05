<?php

/**
 * This class will be used for the user's "Perfect Fit"
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class User_perfect_fit extends CI_Model {

	private $fb_user_id;
	private $question_id;
	private $answer_id;

	/**
	 * Constructor for User_perfect_fit
	 *
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Creates a user's "Perfect Fit"
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_perfect_fit($perfect_fit_data, $user_data)
	{
		$gender = $user_data['fb_user']['gender'];
		if($gender == 'female'){
			$this->save_female_perfect_fit($perfect_fit_data, $user_data);
			return;
		}
		
		$this->save_male_perfect_fit($perfect_fit_data, $user_data);
	}// create_perfect_fit

	/**
	 * Saves a female user's "Perfect Fit"
	 *
	 * @param mixed $perfect_fit_data
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save_female_perfect_fit($perfect_fit_data, $user_data)
	{
		var_dump($perfect_fit_data);
	}// save_female_perfect_fit

	/**
	 * Saves a male user's "Perfect Fit"
	 *
	 * @param mixed $perfect_fit_data
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save_male_perfect_fit($perfect_fit_data, $user_data)
	{
		foreach ($perfect_fit_data as $key => $value) {
			$respuesta = $value;

			$insert_data = array(
			'fb_user_id' 	=> $user_data['fb_user']['id'],
			'answer_id' 	=> $respuesta,
			);
			$this->db->insert('user_answers', $insert_data);
		}
	}// save_male_perfect_fit

	/**
	 * Checks if user has completed his/her "Perfect Fit"
	 *
	 * @param string $fb_user_id
	 * @return boolean
	 * @author Miguel Cabral
	 **/
	function has_perfect_fit($fb_user_id)
	{
		// Get admin's Facebook id
		$query = $this->db->get_where('user_answers', array('fb_user_id' => $fb_user_id));

		if ($query->num_rows() > 0)
			return TRUE;

		return 0;
	}// has_perfect_fit
		
}// clase User_perfect_fit