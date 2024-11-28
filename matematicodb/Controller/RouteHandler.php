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
                if($uri[4] == "get") {
                    $high_score_handler->getHighScore();
                } elseif ($uri[4] == "set") {
                    $high_score_handler->setHighScore();
                }
                break;
            case "low-score":
                require_once ROOT_PATH . "/Controller/Api/LowScoreHandler.php";
                $low_score_handler = new LowScoreHandler();
                if($uri[4] == "get") {
                    $low_score_handler->getLowScore();
                } elseif ($uri[4] == "set") {
                    $low_score_handler->setLowScore();
                }
                break;
            case "register":
                require_once ROOT_PATH . "/Controller/Api/RegisterHandler.php";
                $register_handler = new RegisterHandler();
                $register_handler->register();
                break;
            case "multiplayer":
                require_once ROOT_PATH . "/Controller/Api/MultiplayerHandler.php";
                $multiplayer_handler = new MultiplayerHandler();
                $multiplayer_handler->handleMultiplayer($uri);
                break;
            default:
                header("HTTP/1.1 404 Not Found");
                echo "Not found";
                break;
        }
    }
}