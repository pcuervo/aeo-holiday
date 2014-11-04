<?php

/**
 * This class will be used for the perfect fit's questions.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Perfect_fit_question extends CI_Model {

	private $question_id;
	private $question;
	private $quiz_answers;

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
	 * Creates a question in for the perfect fit's quiz
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_question($question_data, $answer_data)
	{
		$this->db->insert('questions', $question_data);
		$this->question_id = $this->db->insert_id();

		foreach ($answer_data as $answer) {
			$this->db->insert('answers', array('question_id' => $this->question_id, 'answer' => $answer));
		}
	}// create_question

	/**
	 * Return the answers of a question
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function get_question_answers($question_id)
	{
		$query = $this->db->get_where('answers', array('question_id' => $question_id));

		if ($query->num_rows() < 1)
			return 0;

		foreach ($query->result() as $key => $row)
		{
		    $answers[$key] = array(
				'id'		=> $row->id,
				'answer' 	=> $row->answer,
			);
		}

		return $answers;
	}// get_question_answers

		
}// clase Perfect_fit_question