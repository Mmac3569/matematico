var username_input;
var password_input;
var response;

function loginBtClick() {
    getValues();
    fetch(`http://matematicodb.free.nf/matematicodb/index.php/login?username=${username_input}&password=${password_input}`, {
        headers: {
            "Accept": "text/html, */*",
        }
    });
}

function getValues() {
    username_input = document.getElementById("username_in").value;
    password_input = document.getElementById("password_in").value;
}