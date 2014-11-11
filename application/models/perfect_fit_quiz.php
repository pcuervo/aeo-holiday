<?php
if(!class_exists('Perfect_fit_question')){ require('perfect_fit_question.php'); }

/**
 * This class will be used for the user's perfect fit quiz.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Perfect_fit_quiz extends CI_Model {

	private $quiz_type;
	private $quiz_questions;

	/**
	 * Constructor for Group_invitation
	 *
	 * @param int $group_id, string $invited_fb_user_id
	 * @return void
	 * @author 
	 **/
	public function __construct()
	{
		$this->load->model('perfect_fit_question');
		$this->load->database();
	}// constructor

	/**
	 * Returns a quiz depending if the user is male or female
	 *
	 * @param char $gender
	 * @return array $questions
	 * @author Miguel Cabral
	 **/
	function get_quiz($gender)
	{
		if($gender == 'female')
			return $this->get_female_quiz();

		return $this->get_male_quiz();
	}// create_quiz

	/**
	 * Returns a male's quiz
	 *
	 * @return array $questions
	 * @author Miguel Cabral
	 **/
	function get_male_quiz()
	{
		$query = $this->db->get_where('questions', array('question_type' => 'm') );

		if ($query->num_rows() < 1)
			return 0;

		$questions = array();

		foreach ($query->result() as $key => $row){
			$answers = $this->perfect_fit_question->get_question_answers($row->id);
			$questions[$key]['question_id'] = $row->id;
			$questions[$key]['question'] = $row->question;
			$questions[$key]['answers'] = $answers;
		}

		return $questions;
	}// get_male_quiz

	/**
	 * Returns a male's quiz
	 *
	 * @return array $questions
	 * @author Miguel Cabral
	 **/
	function get_female_quiz()
	{
		$query = $this->db->get_where('questions', array('question_type' => 'f') );

		if ($query->num_rows() < 1)
			return 0;

		$questions = array();

		foreach ($query->result() as $key => $row){
			$answers = $this->perfect_fit_question->get_question_answers($row->id);
			$questions[$key]['question_id'] = $row->id;
			$questions[$key]['question'] = $row->question;
			$questions[$key]['answers'] = $answers;
		}

		return $questions;
	}// get_female_quiz

	/**
	 * Creates a quiz depending if the user is male or female
	 *
	 * @param char $gender
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_quiz($gender)
	{
		if($gender == 'female'){
			$this->create_female_quiz();
			return;
		}

		$this->create_male_quiz();
		
	}// create_quiz

	/**
	 * Creates a quiz for female users
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_female_quiz()
	{
		if($this->exists_female_quiz())
			return;

		$question_talla_top_data = array(
			'question_type' => 'f',
			'question'		=> 'Talla top',
			);
		$answer_talla_top = array('XS', 'S', 'M', 'L', 'XL');
		$question_talla_top = new Perfect_fit_question();
		$question_talla_top->create_question($question_talla_top_data, $answer_talla_top);

		$question_talla_jeans_data = array(
			'question_type' => 'f',
			'question'		=> 'Talla jeans',
			);
		$answer_talla_jeans = array('00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
		$question_talla_jeans = new Perfect_fit_question();
		$question_talla_jeans->create_question($question_talla_jeans_data, $answer_talla_jeans);

		$question_color_data = array(
			'question_type' => 'f',
			'question'		=> 'Color',
			);
		$answer_color = array('azul', 'rojo', 'negro', 'beige', 'gris', 'verde');
		$question_color = new Perfect_fit_question();
		$question_color->create_question($question_color_data, $answer_color);
		
	}// create_female_quiz

	/**
	 * Creates a quiz for female users
	 *
	 * @return void
	 * @author Miguel Cabral
	 **/
	function create_male_quiz()
	{
		if($this->exists_male_quiz())
			return;

		$question_talla_top_data = array(
			'question_type' => 'm',
			'question'		=> 'Talla top',
			);
		$answer_talla_top = array('XS', 'S', 'M', 'L', 'XL');
		$question_talla_top = new Perfect_fit_question();
		$question_talla_top->create_question($question_talla_top_data, $answer_talla_top);

		$question_talla_jeans_data = array(
			'question_type' => 'm',
			'question'		=> 'Talla jeans',
			);
		$answer_talla_jeans = array('26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38');
		$question_talla_jeans = new Perfect_fit_question();
		$question_talla_jeans->create_question($question_talla_jeans_data, $answer_talla_jeans);

		$question_largo_jeans_data = array(
			'question_type' => 'm',
			'question'		=> 'Largo jeans',
			);
		$answer_largo_jeans = array('30', '32', '34');
		$question_largo_jeans = new Perfect_fit_question();
		$question_largo_jeans->create_question($question_largo_jeans_data, $answer_largo_jeans);

		$question_color_data = array(
			'question_type' => 'm',
			'question'		=> 'Color',
			);
		$answer_color = array('azul', 'rojo', 'negro', 'beige', 'gris', 'verde');
		$question_color = new Perfect_fit_question();
		$question_color->create_question($question_color_data, $answer_color);
		
	}// create_male_quiz

	/**
	 * Checks if the female quiz questions already exists
	 *
	 * @return boolean 
	 * @author Miguel Cabral
	 **/
	function exists_female_quiz()
	{
		$query = $this->db->get_where('questions', array('question_type' => 'f'));

		if($query->num_rows() > 0)
			return 1;

		return 0;
	}// exists_female_quiz	

	/**
	 * Checks if the male quiz questions already exists
	 *
	 * @return boolean 
	 * @author Miguel Cabral
	 **/
	function exists_male_quiz()
	{
		$query = $this->db->get_where('questions', array('question_type' => 'm'));

		if($query->num_rows() > 0)
			return 1;

		return 0;
	}// exists_male_quiz	
		
}// clase Perfect_fit_quiz