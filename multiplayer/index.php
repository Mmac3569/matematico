<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="multiplayer-script.js?v=<?php echo filemtime("login-script.js") ?>"></script>
    <title>Matematico - multiplayer</title>
</head>
<body>
    <input type="text" id="code-in" placeholder="kód hry">
    <button id="code-submit" onclick="joinGame()">Připojit</button>
    <button id="create-new-button" onclick="createNewGame()">Vytvořit novou hru</button>
</body>
</html>