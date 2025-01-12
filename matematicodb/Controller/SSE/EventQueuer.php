<?php
class EventQueuer {
    private $eventqueue_file_path = ROOT_PATH . "/Controller/SSE/eventqueue.txt";
    private $game_results_folder = ROOT_PATH . "/Controller/SSE/game-results/";

    function queuePlayerUpdate($to, $username, $type) {
        file_put_contents($this->eventqueue_file_path, $to . "||PlayerUpdate||" . $username . "||" . $type . "\n###\n", FILE_APPEND | LOCK_EX);
    }
    
    function queueStartUpdate($to, $speed, $mode, $numbers) {
        file_put_contents($this->eventqueue_file_path, $to . "||StartUpdate||" . $speed . "||" . $mode . "||" . implode(",", $numbers) . "\n###\n", FILE_APPEND | LOCK_EX);
    }

    function putResult($from, $user_id, $game, $score) {
        if(!file_exists($this->game_results_folder . $game . ".txt")) {
            file_put_contents($this->game_results_folder . $game . ".txt", "");
        }
        file_put_contents($this->game_results_folder . $game . ".txt", $user_id . "||" . $from . "||" . $score . "\n", FILE_APPEND | LOCK_EX);
    }

    function sendResults($game, $last_user, $last_user_id, $last_score, $mode) {
        $file_content = file_get_contents($this->game_results_folder . $game . ".txt") . $last_user_id . "||" . $last_user . "||" . $last_score;
        $pairs = explode("\n", $file_content);
        $map = [];
        $players = [];
        foreach ($pairs as $pair) {
            $exploded_pair = explode("||", $pair);
            $players[] = array_shift($exploded_pair);
            list($key, $value) = $exploded_pair;
            $map[$key] = $value;
        }
        arsort($map);
        $sorted_pairs = [];
        foreach ($map as $key => $value) {
            $sorted_pairs[] = $key . "#" . $value;
        }
        $sorted_string = implode(" ", $sorted_pairs);
        echo count($players) . "\n" . $sorted_string;
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