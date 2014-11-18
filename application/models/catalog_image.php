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
				'url_big'	 	=> $url_small,
				'created_at' 	=> date("Y-m-d H:i:s"),
				);
		$this->db->insert('catalog_images', $image_data);
	}// save

	/**
	 * Saves a catalog image in database.
	 *
	 * @param int $product_id, int $cms_user_id, string $name, string $gender, string $category, string $url_small, string $url_big
	 * @return void
	 * @author Miguel Cabral
	 **/
	function update($product_id, $cms_user_id, $name, $gender, $category, $url_small, $url_big)
	{
		$image_data = array(
				'cms_user_id' 	=> $cms_user_id,
				'name' 			=> $name,
				'gender'	 	=> $gender,	
				'category'	 	=> $category,	
				'url_small' 	=> $url_small,
				'url_big'	 	=> $url_small,
				'created_at' 	=> date("Y-m-d H:i:s"),
				);
		$this->db->where('id', $product_id);
		$this->db->update('catalog_images', $image_data);
	}// update

	/**
	 * Get all images from the database
	 *
	 * @return mixed $catalog_images
	 * @author Miguel Cabral
	 **/
	function get_all()
	{
		$this->db->order_by('gender, category, name');
		$query = $this->db->get('catalog_images');

		if ($query->num_rows() < 1)
			return 0;

		$catalog_images = array();
		foreach ($query->result() as $key => $row)
		{	    
		    $catalog_images[$key] = array(
		    	'id'			=> $row->id,
		    	'name'			=> $row->name,
		    	'gender'		=> $row->gender,
		    	'category'		=> $row->category,
				'url_small'		=> $row->url_small,
				'url_big'		=> $row->url_big,
			);
		}

		return $catalog_images;
	}// get_all

	/**
	 * Get an image from the database
	 *
	 * @return mixed $catalog_image
	 * @author Miguel Cabral
	 **/
	function get($product_id)
	{
		$this->db->order_by('gender, category, name');
		$query = $this->db->get_where('catalog_images', array('id' => $product_id));

		if ($query->num_rows() < 1)
			return 0;

		$row = $query->row();

		$catalog_image = array(
		    	'id'			=> $row->id,
		    	'name'			=> $row->name,
		    	'gender'		=> $row->gender,
		    	'category'		=> $row->category,
				'url_small'		=> $row->url_small,
				'url_big'		=> $row->url_big,
			);

		return $catalog_image;
	}// get

}// clase Catalog_image