<?php
/**
 * This is a "dummy" library that just loads the actual library in the construct.
 * This technique prevents issues from CodeIgniter 3 when loading libraries that use PHP namespaces.
 * This file can be used with any PHP library that uses namespaces.  Just copy it, change the name of the class to match your library
 * and configs and go to town.
 */

defined('BASEPATH') OR exit('No direct script access allowed');

// Setup the dummy class for Cloudinary
class Cloudinarylib {

    public function __construct()
    {

        // include the cloudinary library within the dummy class
        require('cloudinary/Cloudinary.php');
        require 'cloudinary/Uploader.php';
        require 'cloudinary/Api.php';

        // configure Cloudinary API connection
        \Cloudinary::config(array(
            "cloud_name" => "halfbug",
            "api_key" => "247646453362736",
            "api_secret" => "eRPeFUhw-U0xKtp4OJK8f_JqTlo"
        ));
    }
}