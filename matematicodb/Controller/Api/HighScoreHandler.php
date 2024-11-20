<?php
class HighScoreHandler {

    public function getHighScore() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $id = $query["id"];
        header("Content-Type: application/json");
        $db_query = $database->select("SELECT `username` FROM `users` WHERE `session_id`=" . $id);
        $db_st = $database->select("SELECT `high-score` FROM `scores` WHERE `username`=" . $db_query[0]["username"]);
        if($db_st) {
            header("HTTP/1.1 200 OK");
            echo json_encode($db_st);
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }

    function setHighScore() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $id = $query["id"];
        $value = $query["value"];
        header("Content-Type: application/json");
        $db_query = $database->select("SELECT `username` FROM `users` WHERE `session_id`=" . $id);
        $db_st = $database->executeStatement("UPDATE `scores` SET `high-score` = '" . $value . "' WHERE `scores`.`username`=" . $db_query[0]["username"]);
        if($db_st) {
            header("HTTP/1.1 200 OK");
        } else {
            header("HTTP/1.1 300 Failed");
        }
        exit;
    }
}