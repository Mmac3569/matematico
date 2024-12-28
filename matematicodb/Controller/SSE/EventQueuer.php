<?php
class EventQueuer {
    private $eventqueue_file_path = ROOT_PATH . "/Controller/SSE/eventqueue.txt";    

    function queuePlayerUpdate($to, $username, $type) {
        file_put_contents($this->eventqueue_file_path, $to . "||PlayerUpdate||" . $username . "||" . $type . "\n###\n", FILE_APPEND | LOCK_EX);
    }
    
    function queueStartUpdate($to, $speed, $mode) {
        file_put_contents($this->eventqueue_file_path, $to . "||StartUpdate||" . $speed . "||" . $mode . "\n###\n", FILE_APPEND | LOCK_EX);
    }
}