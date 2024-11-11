<?php
class LoginHandler {
    
    public function login() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        header("Content-Type: application/json");
        $db_query = $database->select("SELECT * FROM `users` WHERE `username`='" . $username . "' && `password`='" . $password . "'");
        if($db_query) {
            header("HTTP/1.1 200 OK");
            echo json_encode("high-score", $db_query["high-score"]);
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }
}