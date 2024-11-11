var username_input;
var password_input;
var response;

function loginBtClick() {
    //funny comment just for testing
    alert("test #4");
    getValues();
    fetch(`http://matematico.great-site.net/matematicodb/index.php/login?username=${username_input}&password=${password_input}`, {
        headers: {
            "Accept": "application/json, text/html, */*",
        }
    });
}

function getValues() {
    username_input = document.getElementById("username_in").value;
    password_input = document.getElementById("password_in").value;
}