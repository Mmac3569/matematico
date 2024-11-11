<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Matematico - login</title>
    <link rel="stylesheet" href="styles.css">
    <script src="http://matematico.great-site.net/login/login-script.js?v=<?php //echo filemtime("login-script.js") ?>"></script>
</head>
<body>
    <form>
        <input id="username_in" name="username" type="text" placeholder="username"><br>
        <input id="password_in" name= "password" type="password" placeholder="password"><br>
        <input type="button" value="login" onclick="loginBtClick()">
    </form>
</body>
</html>