<?php
class LoginHandler {
    
    public function login() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        //header("Content-Type: application/json");
        if($database->select("SELECT * FROM `users` WHERE `username`='" . $username . "' && `password`='" . $password . "'")) {
            header("HTTP/1.1 200 OK");
            header("Location: http://matematicodb.free.nf");
            echo "success";
        } else {
            header("HTTP/1.1 301 Failed");
            header("Location: http://matematicodb.free.nf/login");
            echo "fail";
        }
        exit;
    }
}