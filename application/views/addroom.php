<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if(!(isset($data))){
	$data="";
}


?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <title>Admin Panel</title>

	
</head>
<body>

<div class="container-fluid">
  
   <div class="panel panel-default">
    <div class="panel-heading">Add Rooms</div>
    <div class="panel-body">
	    <div class="col-sm-4" style="background-color:lavender;">  </div>
		<div class="col-sm-4" style="background-color:lavender;"> <form role="form" method="post" action="<?=base_url();?>index.php/room/create">
                          <fieldset>
                              <div class="form-group">
                                  <input class="form-control" placeholder="Room Name" name="name" value="<?php echo $room1->name;?>" type="text" autofocus>
                              </div>
 
                              <!--<div class="form-group">
                                  <input class="form-control" placeholder="select image" name="image" type="file" value="<?php //echo $room1->image-path;?>">
                              </div> -->
 
                              <div class="form-group">
                                  <input class="form-control" placeholder="square feet" name="sqft" type="number" value="<?php echo $room1->sqft;?>">
                              </div>
 
                              <div class="form-group">
                                  <input class="form-control" placeholder="Area" name="area" type="number" value="<?php echo $room1->area;?>">
                              </div>
                              <div class="form-group">
                                  <input class="form-control" placeholder="Status" name="status" type="text" value="<?php echo $room1->status;?>">
                              </div>
 
                              <input class="btn btn-lg btn-success btn-block" type="submit" value="Register" name="register" >
 
                          </fieldset>
                      </form> </div>
		<div class="col-sm-4" style="background-color:lavender;">  </div>

	</div>
  </div>
  
</div>
</body>
</html>