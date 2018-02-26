<?php
defined('BASEPATH') OR exit('No direct script access allowed');
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
    <div class="panel-heading">Room List</div>
    <div class="panel-body">
	    <div class="col-sm-4" style="background-color:lavender;"><?php echo $message ;?>  </div>
		<div class="col-sm-4" style="background-color:lavender;">
		<?php foreach($roomlist as $room) {
			echo 'Room: '.$room->name;
			echo "<br>";
			echo 'squarefeet: '.$room->sqft;
			echo "<hr>";
		} ?>
	</div>
		<div class="col-sm-4" style="background-color:lavender;">  </div>

	</div>
  </div>
  
</div>
</body>
</html>