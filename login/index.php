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
    <form>
        <input id="username_in" name="username" type="text" placeholder="username" autocomplete="username"><br>
        <input id="password_in" name="password" type="password" placeholder="password" autocomplete="current-password"><br>
        <input type="button" value="login" onclick="loginBtClick()"><br>
        <p>Nemáte účet? Zaregistrujte se zde!</p><br>
        <input id="new_username_in" name="username" type="text" placeholder="new username" autocomplete="username"><br>
        <input id="new_password_in" name= "password" type="password" placeholder="new password" autocomplete="new-password"><br>
        <input type="button" value="register" onclick="registerBtClick()">
        <p style="color: red;">Stránka zatím není příliš zabezpečená, volte prosím heslo které nepoužíváte do jiných účtů!!!</p>
    </form>
</body>
</html>