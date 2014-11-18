<?php

/**
 * This class will be used to represent a catalog image.
 *
 * @package default
 * @author Pequeño Cuervo
 **/
class Catalog_image extends CI_Model {

	/**
	 * Constructor for Catalog_image
	 *
	 * @author Miguel Cabral
	 **/
	public function __construct()
	{
		$this->load->database();
	}// constructor

	/**
	 * Saves a catalog image in database.
	 *
	 * @param int $cms_user_id, string $name, string $gender, string $category, string $url_small, string $url_big
	 * @return void
	 * @author Miguel Cabral
	 **/
	function save($cms_user_id, $name, $gender, $category, $url_small, $url_big)
	{
		$image_data = array(
				'cms_user_id' 	=> $cms_user_id,
				'name' 			=> $name,
				'gender'	 	=> $gender,	
				'category'	 	=> $category,	
				'url_small' 	=> $url_small,
				'url_big'	 	=> $cms_user_id,
				'created_at' 	=> date("Y-m-d H:i:s"),
				);
		$this->db->insert('catalog_images', $image_data);
	}// save

}// clase Catalog_image