<?php
class LoginHandler {
    
    public function login() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        header("Content-Type: application/json");
        $db_query = $database->executeStatement("UPDATE `users` SET `session_id` = '" . generateSessionId() . "' WHERE `username`='" . $username . "' && `password`='" . $password . "'");
        if($db_query) {
            header("HTTP/1.1 200 OK");
            echo json_encode($db_query);
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }

    function generateSessionId() {
        $session_id = "";
        for($i = 0; $i < 9; $i++) {
            $session_id . random_int(0, 9);
        }
        return $session_id;
    }
}