<?php
include_once "../../inc/bootstrap.php";
header("Content-Type: text/event-stream");
sendUpdatesFromQueue();

function sendUpdatesFromQueue() {
    parse_str($_SERVER['QUERY_STRING'], $query);
    $username = $query["username"];
    $file_content = file_get_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt");
    while(!strpos($file_content, $username)) {
        sleep(5);
        $file_content = file_get_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt");
    }
    $update_part = substr($file_content, strpos($file_content, $username));
    echo substr($update_part, 0, strpos($update_part, "###"));
    header("HTTP/1.1 200 OK");
    exit;
}