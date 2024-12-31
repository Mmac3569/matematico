<?php
include_once "../../inc/bootstrap.php";
header("Content-Type: text/event-stream");
header('Cache-Control: no-cache');
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
    $update_data = substr($update_part, 0, strpos($update_part, "###")); 
    echo "data: " . $update_data . PHP_EOL . PHP_EOL; 
    $file_content = str_replace($update_data . "###\n", '', $file_content);
    file_put_contents(ROOT_PATH . "/Controller/SSE/eventqueue.txt", $file_content);
    ob_flush();
    flush();
}