<?php
class HighScoreHandler {

    public function getHighScore() {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $database = new Database();
        $id = $query["id"];
        header("Content-Type: application/json");
        $db_query = $database->select("SELECT `high-score` FROM `users` WHERE" . $id);
        if($db_query) {
            header("HTTP/1.1 200 OK");
            echo json_encode($db_query);
        } else {
            header("HTTP/1.1 300 Failed");
            echo json_encode("fail");
        }
        exit;
    }
}