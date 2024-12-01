<?php
$eventqueue_file_path = ROOT_PATH . "/Controller/SSE/eventqueue.txt";
class EventQueuer {

    function queuePlayerUpdate($game_id, $username, $type) {
        file_put_contents($eventqueue_file_path, $game_id . "\nPlayerUpdate\n" . $username . "\n" . $type . "\n###\n", FILE_APPEND | LOCK_EX);
    }
    
    function queueStartUpdate($game_id, $speed, $mode) {
        file_put_contents($eventqueue_file_path, $game_id . "\nStartUpdate\n" . $speed . "\n" . $mode . "\n###\n", FILE_APPEND | LOCK_EX);
    }
}