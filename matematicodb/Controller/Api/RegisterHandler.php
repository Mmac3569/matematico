<?php
class RegisterHandler {

    public function register() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $username = $query["username"];
        $password = $query["password"];
        header("Content-Type: application/json");
        $db_query = $database->select("SELECT `ID` FROM `users` WHERE `username`='" . $username . "'");
        if($db_query) {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        } else {
            $database->executeStatement("INSERT INTO `users` (`ID`, `username`, `password`) VALUES (NULL, '" . $username . "', '" . $password . "')");
            $database->executeStatement("INSERT INTO `scores` (`username`) VALUES ('" . $username . "')");
            header("HTTP/1.1 200 OK");
            echo json_encode("success");
        }
        exit;
    }
}
