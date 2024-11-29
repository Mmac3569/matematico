<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="multiplayer-script.js?v=<?php echo filemtime('multiplayer-script.js') ?>"></script>
    <script src="sse-handler-script.js?v=<?php echo filemtime('sse-handler-script.js') ?>"></script>
    <link rel="stylesheet" href="styles.css?v=<?php echo filemtime('styles.css') ?>">
    <title>Matematico - multiplayer</title>
</head>
<body>
    <header>
        <h1>Připojení do multiplayer hry</h1>
    </header>

    <div id="flex-container">
        <input type="text" id="code-in" placeholder="kód hry">
        <button id="code-submit" onclick="joinGame()">Připojit</button><br>
        <button id="create-new-button" onclick="createNewGame()">Vytvořit novou hru</button>
    </div>
</body>
</html>