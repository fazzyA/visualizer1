<?php
class Room_model extends CI_Model {
	
	public function Show_all_rooms(){
		return $this->db->get('rooms')->result();
		}
	public function Show_room($roomid){
		$this->db->where('id', $roomid);
		return $this->db->get('rooms')->row();
		}
		
	public function register_room($user){
		$this->db->insert('rooms', $user);
		}
}

?>