test<?php
include_once "../../inc/bootstrap.php"; echo "ok";
//header("Content-Type: text/event-stream");
header('Cache-Control: no-cache'); echo "ok";
sendUpdatesFromQueue();

function sendUpdatesFromQueue() {
    parse_str($_SERVER['QUERY_STRING'], $query); echo "ok";
    $username = $query["username"]; echo "ok";
    $file_content = file_get_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt"); echo "ok";
    while(!strpos($file_content, $username)) {
        sleep(5); echo "ok";
        $file_content = file_get_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt"); echo "ok";
    }
    $update_part = substr($file_content, strpos($file_content, $username)); echo "ok";
    $update_data = substr($update_part, 0, strpos($update_part, "###")); echo "ok";
    echo "data: " . $update_data . PHP_EOL . PHP_EOL; echo "ok";
    $file_content = str_replace($update_data, '', $file_content); echo "ok";
    file_put_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt", $file_content); echo "ok";
    ob_flush();
    flush();
}