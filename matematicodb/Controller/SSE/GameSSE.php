<?php
header("Content-Type: text/event-stream");

function sendPlayerUpdate($game_id, $username, $type) {
    header("HTTP/1.1 200 OK");
    echo $game_id . "\nPlayerUpdate\n" . $username . "\n" . $type;
}

function sendStartUpdate() {

}