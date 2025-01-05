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
        $file_content = file_get_contents($this->$game_results_folder . $game . ".txt") . $last_user . "||" . $last_score; echo "ok\n";
        $pairs = explode("\n", $file_content); echo "ok\n";
        $map = []; echo "ok\n";
        $players = []; echo "ok\n";
        foreach ($pairs as $pair) {
            list($key, $value) = explode("||", $pair); echo "loop1\n";
            $map[$key] = $value; echo "loop2\n";
            $players[] = $key; echo "loop3\n";
        }
        arsort($map); echo "ok\n";
        $sorted_pairs = []; echo "ok\n";
        foreach ($map as $key => $value) {
            $sorted_pairs[] = $key . "#" . $value; echo "loop4\n";
        }
        $sorted_string = implode(" ", $sorted_pairs); echo "ok\n";
        echo json_encode($players); echo $sorted_string;
        for ($i = 0; $i < count($players); $i++) {
            file_put_contents($this->$eventqueue_file_path, $players[$i] . "||Results||" .  $sorted_string); echo "loop5\n";
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