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
        <input id="username_in" name="username" type="text" placeholder="username"><br>
        <input id="password_in" name= "password" type="password" placeholder="password"><br>
        <input type="button" value="login" onclick="loginBtClick()">
    </form>
</body>
</html>