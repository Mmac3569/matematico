testing<?php
require __DIR__ . "/inc/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

require ROOT_PATH . "/Controller/RouteHandler.php";
$route_handler = new RouteHandler();
$route_handler->handleRoutes($uri);