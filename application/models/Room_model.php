<?php
class Room_model extends CI_Model {
	
	public function register_room($user){
		$this->db->insert('rooms', $user);
		}
}

?>