<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Addroom extends CI_Controller {

public function __construct(){
 
        parent::__construct();
  			$this->load->helper('url');
  	 		$this->load->model('room_model');
			$this->load->library('session');
 
}


	public function index()
	{
		$this->load->view('addroom');
	}
	
	public function create(){
      $user=array(
      'name'=>$this->input->post('name'),
      //'user_email'=>$this->input->post('user_email'),
      'area'=>$this->input->post('area'),
      'sqft'=>$this->input->post('sqft'),
      'image-path'=>$this->input->post('image'),
      'status'=>$this->input->post('status')
        );
   $this->room_model->register_room($user);
		$this->load->view('welcome_message');

//$email_check=$this->user_model->email_check($user['user_email']);
 
/* if($email_check){
  $this->user_model->register_user($user);
  $this->session->set_flashdata('success_msg', 'Registered successfully.Now login to your account.');
  redirect('user/login_view');
 
}else{
 
  $this->session->set_flashdata('error_msg', 'Error occured,Try again.');
  redirect('user');
 }
 */ 
}
}