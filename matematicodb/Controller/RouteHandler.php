<?php
class RouteHandler {
    
    public function handleRoutes($uri) {
        $first_route = $uri[3];
        switch($first_route) {
            case "login":
                require_once ROOT_PATH . "/Controller/Api/LoginHandler.php";
                $login_handler = new LoginHandler();
                $login_handler->login();
                break;
            case "high-score":
                require_once ROOT_PATH . "/Controller/Api/HighScoreHandler.php";
                $high_score_handler = new HighScoreHandler();
                $high_score_handler->getHighScore();
            default:
                header("HTTP/1.1 404 Not Found");
                echo "Not found";
                break;
        }
    }
}