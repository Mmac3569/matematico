<?php
class EventQueuer {
    private $eventqueue_file_path = ROOT_PATH . "/Controller/SSE/eventqueue.txt";
    private $game_results_folder = ROOT_PATH . "/Controller/SSE/game-results/";

    function queuePlayerUpdate($to, $username, $type) {
        file_put_contents($this->eventqueue_file_path, $to . "||PlayerUpdate||" . $username . "||" . $type . "\n###\n", FILE_APPEND | LOCK_EX);
    }
    
    function queueStartUpdate($to, $speed, $mode) {
        file_put_contents($this->eventqueue_file_path, $to . "||StartUpdate||" . $speed . "||" . $mode . "||" . implode(",", $this->generateNumbers()) . "\n###\n", FILE_APPEND | LOCK_EX);
    }

    function putResult($from, $game, $score) {
        file_put_contents($this->$game_results_folder . $game . ".txt", $from . "||" . $score . "\n", FILE_APPEND | LOCK_EX);
    }

    function sendResults($game, $last_user, $last_score, $mode) {
        $file_content = file_get_contents($this->$game_results_folder . $game . ".txt") . $last_user . "||" . $last_score;
        $pairs = explode("\n", $file_content);
        $map = [];
        $players = [];
        foreach ($pairs as $pair) {
            list($key, $value) = explode("||", $pair);
            $map[$key] = $value;
            $players[] = $key;
        }
        arsort($map);
        $sorted_pairs = [];
        foreach ($map as $key => $value) {
            $sorted_pairs[] = $key . "#" . $value;
        }
        $sorted_string = implode(" ", $sorted_pairs);
        for ($i = 0; $i < count($players); $i++) {
            file_put_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt", strval($players[$i]) . "||Results||" .  strval($sorted_string) . "\n###\n", FILE_APPEND | LOCK_EX);
        }
    }

    function generateNumbers() {
        $numbers = [25];
        for ($i = 0; $i < 25; $i++) {
            $numbers[$i] = rand(1, 13);
        }
        return $numbers;
    }
}