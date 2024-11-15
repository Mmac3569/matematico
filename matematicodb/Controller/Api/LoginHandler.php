<?php
class LoginHandler {
    
    public function login() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        header("Content-Type: application/json");
        $session_id = $this->generateSessionId();
        $db_query = $database->executeStatement("UPDATE `users` SET `session_id` = '" . $session_id . "' WHERE `username`='" . $username . "' && `password`='" . $password . "'");
        if($db_query->get_result()) {
            header("HTTP/1.1 200 OK");
            echo json_encode($session_id);
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }

    function generateSessionId() {
        $id_out = "";
        for($i = 0; $i < 8; $i++) {
            $id_out = $id_out . strval(random_int(0, 9));
        }
        return $id_out;
    }
}