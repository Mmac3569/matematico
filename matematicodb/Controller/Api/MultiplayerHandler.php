<?php
class MultiplayerHandler {

    function handleMultiplayer($uri) {
        parse_str($_SERVER['QUERY_STRING'], $query);
        switch($uri[4]) {
            case "create":
                $this->createGame();
                break;
            case "join":
                $this->joinGame($query["code"], $query["id"]);
                break;
            case "start":
                break;
            default:
                header("HTTP/1.1 404 Not Found");
                echo "Not found";
                break;
        }
    }

    function createGame($user_id) {
        $game_id = generateGameId();
        $database = new Database();
        $file = fopen(ROOT_PATH . "/Controller/game-codes.txt", "a");
        fwrite($file, $game_id); fclose($file);
        $db_query = $database->select("SELECT `username` FROM `users` WHERE `session_id`=" . $id);
        $database->executeStatement("UPDATE `users` SET `in_game`='" . $game_id . "' WHERE `username`='" . $db_query[0]["username"] . "'");
        header("HTTP/1.1 200 OK");
        header("Content-Type: application/json");
        echo $game_id;
        exit;
    }

    function joinGame($game_id, $user_id) {
        $file = fopen(ROOT_PATH . "/Controller/game-codes.txt", "r");
        $content = fread($file, filesize($file)); fclose($file);
        $db_query = $database->select("SELECT `username` FROM `users` WHERE `session_id`=" . $id);
        $database->executeStatement("UPDATE `users` SET `in_game`='" . $game_id . "' WHERE `username`='" . $db_query[0]["username"] . "'");
        if (strpos($content, $game_id) === false) {
            header("HTTP/1.1 404 No game with this code");
        } else {
            header("HTTP/1.1 200 OK");
        }
        exit;
    }

    function startGame($game_id) {
        $file = fopen(ROOT_PATH . "/Controller/game-codes.txt", "r");
        $content = fread($file, filesize($file)); fclose($file);
        $content = str_replace($game_id, "", $content);
        $file = fopen(ROOT_PATH . "/Controller/game-codes.txt", "w");
        fwrite($file, $content); fclose();
    }

    function generateGameId() {
        $id_out = "";
        for($i = 0; $i < 6; $i++) {
            $id_out = $id_out . strval(random_int(0, 9));
        }
        return $id_out;
    }
}