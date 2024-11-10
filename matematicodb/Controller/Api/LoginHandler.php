<?php
class LoginHandler {
    
    public function login() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        header("Content-Type: application/json");
        if($database->select("SELECT * FROM `users` WHERE `username`='" . $username . "' && `password`='" . $password . "'")) {
            header("HTTP/1.1 200 OK");
            echo json_encode("success");
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }
}