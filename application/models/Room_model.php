<?php
class Room_model extends CI_Model {
	
	public function Show_all_rooms(){
		return $this->db->get('rooms')->result();
		}
		
	public function register_room($user){
		$this->db->insert('rooms', $user);
		}
}

?>