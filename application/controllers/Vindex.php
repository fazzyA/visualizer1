<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Vindex extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

    public function __construct()
    {
        parent::__construct();
        // load Cloudinary PHP API library normally using lowercase "dummy" filename
        $this->load->library('cloudinarylib');
    }

	public function index()
	{
       // $data = cl_image_tag("bathroom.png", array( "alt" => "Sample Image" ));
       // echo "<pre>".$data."</pre>";
       // var_dump($data);
		$this->load->view('visualizer');
	}

	public function room($type,$tile){
        echo $type;
        $turl='http://res.cloudinary.com/halfbug/image/upload/l_bathroom.png/v1524027474/whole.png';

        $data = cl_image_tag("bathroom.png", array( "alt" => "Sample Image" ));
        //$this->load->view('room_layout',$data);
        echo $data;
    }
}
