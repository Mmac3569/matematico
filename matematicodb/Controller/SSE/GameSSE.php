<?php
header("Content-Type: text/event-stream");
sendUpdatesFromQueue();

class GameSSE {
    const eventqueue_file_path = ROOT_PATH . "/Controller/SSE/eventqueue.txt";

    function queuePlayerUpdate($game_id, $username, $type) {
        file_put_contents($this->eventqueue_file_path, $game_id . "\nPlayerUpdate\n" . $username . "\n" . $type . "\n###\n", FILE_APPEND | LOCK_EX);
    }
    
    function queueStartUpdate($game_id, $speed, $mode) {
        file_put_contents($this->eventqueue_file_path, $game_id . "\nStartUpdate\n" . $speed . "\n" . $mode . "\n###\n", FILE_APPEND | LOCK_EX);
    }
}

function sendUpdatesFromQueue() {
    if(file_get_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt") != "") {
        header("HTTP/1.1 200 OK");
        echo file_get_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt");
        file_put_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt", "");
    } else {
        header("HTTP/1.1 300 No update");
    }
    exit;
}