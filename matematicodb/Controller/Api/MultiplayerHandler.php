<?php
class MultiplayerHandler {

    function handleMultiplayer($uri) {
        parse_str($_SERVER['QUERY_STRING'], $query);
        switch($uri[4]) {
            case "create":
                $this->createGame($query["id"]);
                break;
            case "join":
                $this->joinGame($query["code"], $query["id"]);
                break;
            case "start":
                $this->startGame($query["code"], $query["speed"], $query["mode"]);
                break;
            default:
                header("HTTP/1.1 404 Not Found");
                echo "Not found";
                break;
        }
    }

    function createGame($user_id) {
        $game_id = $this->generateGameId();
        $database = new Database();
        $file = fopen(ROOT_PATH . "/game-codes.txt", "a");
        fwrite($file, "x" . $game_id . "x\n"); fclose($file);
        $db_query = $database->select("SELECT `username` FROM `users` WHERE `session_id`=" . $user_id);
        $database->executeStatement("UPDATE `users` SET `in_game`='" . $game_id . "' WHERE `username`='" . $db_query[0]["username"] . "'");
        if(!$db_query) {
            header("HTTP/1.1 300 Failed to create game");
        } else {
            header("HTTP/1.1 200 OK");
            echo $game_id . "\n" . $db_query[0]["username"];
        }
        exit;
    }

    function joinGame($game_id, $user_id) {
        $database = new Database();
        $file = fopen(ROOT_PATH . "/game-codes.txt", "r");
        $content = fread($file, filesize(ROOT_PATH . "/game-codes.txt")); fclose($file);
        $db_query = $database->select("SELECT `username` FROM `users` WHERE `session_id`=" . $user_id);
        $database->executeStatement("UPDATE `users` SET `in_game`='" . str_replace("x", "", $game_id) . "' WHERE `username`='" . $db_query[0]["username"] . "'");
        if (strpos($content, $game_id) === false || !$db_query) {
            header("HTTP/1.1 404 No game with this code");
        } else {
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
            $db_query2 = $database->select("SELECT `username`, `session_id` FROM `users` WHERE `in_game`='" . str_replace("x", "", $game_id) . "'"); 
            echo json_encode($db_query2); 
            require_once ROOT_PATH . "/Controller/SSE/EventQueuer.php"; 
            $sse = new EventQueuer();
            for ($i = 0; $i < count($db_query2); $i++) {
                if ($db_query2[$i]["session_id"] == $user_id) {
                    continue;
                }
                $sse->queuePlayerUpdate($db_query2[$i]["session_id"], $db_query[0]["username"], "join");
            } 
        }
        exit;
    }

    function startGame($game_id, $speed, $mode) {
        $file = fopen(ROOT_PATH . "/game-codes.txt", "r");
        $content = fread($file, filesize(ROOT_PATH . "/game-codes.txt")); fclose($file);
        $content = str_replace($game_id, "", $content);
        $file = fopen(ROOT_PATH . "/game-codes.txt", "w");
        fwrite($file, $content); fclose();
        $game_id = str_replace("x", "", $game_id);
        $database = new Database();
        $db_query = $database->select("SELECT `session_id` FROM `users` WHERE `in_game`='" . $game_id . "'");
        require_once ROOT_PATH . "/Controller/SSE/EventQueuer.php"; 
        $sse = new EventQueuer();
        for ($i = 0; $i < count($db_query); $i++) {
            $sse->queueStartUpdate($db_query[$i]["session_id"], $speed, $mode);
        }
        header("HTTP/1.1 200 OK");
        exit;
    }

    function generateGameId() {
        $id_out = "";
        for($i = 0; $i < 6; $i++) {
            $id_out = $id_out . strval(random_int(0, 9));
        }
        return $id_out;
    }
}