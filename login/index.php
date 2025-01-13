<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matematico - login</title>
    <link rel="stylesheet" href="styles.css?v=<?php echo filemtime("styles.css") ?>">
    <script src="login-script.js?v=<?php echo filemtime("login-script.js") ?>"></script>
</head>

<body>
    <header>
        <h1>Matematico - Přihlášení</h1>
    </header>
    <nav>
        <a href="matematico.great-site.net"><h2 id="back">zpět</h2></a>
        <a href="#login-header"><h2 id="login">přihlášení</h2></a>
        <a href="#register-header"><h2 id="register">registrace</h2></a>
    </nav>
    <div id="flex-container">
        <h2 id="login-header">Přihlášení</h2>
        <input id="username_in" name="username" type="text" placeholder="username" autocomplete="username"><br>
        <input id="password_in" name="password" type="password" placeholder="password" autocomplete="current-password"><br>
        <button id="login-bt" onclick="loginBtClick()">Přihlásit se</button><br>
        <br><br><br><br><br>

        <h2 id="register-header">Registrace</h2>
        <input id="new_username_in" name="username" type="text" placeholder="new username"><br>
        <input id="new_password_in" name= "password" type="password" placeholder="new password" autocomplete="new-password"><br>
        <button onclick="registerBtClick()">Zaregistrovat se</button><br>
        <p style="color: red;">Stránka zatím není příliš zabezpečená, volte prosím heslo které nepoužíváte do jiných účtů!!!</p>
    </div>
</body>
</html>