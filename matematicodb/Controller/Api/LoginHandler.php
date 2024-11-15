<?php
class LoginHandler {
    
    public function login() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        header("Content-Type: application/json");
        echo "tady ok";
        $session_id = generateSessionId();
        echo $session_id;
        $db_query = $database->executeStatement("UPDATE `users` SET `session_id` = '" . $session_id . "' WHERE `username`='" . $username . "' && `password`='" . $password . "'");
        if($db_query) {
            header("HTTP/1.1 200 OK");
            echo json_encode($session_id);
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }

    function generateSessionId() {
        echo "dobre sa vola";
        $id_out = "";
        echo "gen id";
        for($i = 0; $i < 8; $i++) {
            echo "cyklus";
            $id_out . random_int(0, 9);
        }
        return $id_out;
    }
}