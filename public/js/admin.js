"use strict";

let userList;

function ready() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username-placeholder").innerHTML = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();

    document.getElementById("card-loader").style = "display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 2px;";
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            userList = data;
            let index = 0;
            let col = 1;
            data.forEach(function () {
                let card = document.createElement("div");
                card.id = data[index].username;
                card.classList.add('card')
                let username = document.createElement("p");
                username.style = "grid-row: 2 / span 1; column: 2 / span 1;";
                let email = document.createElement("p");
                email.style = "grid-row: 3 / span 1; column: 2 / span 1;";
                let isAdmin = document.createElement("p");
                isAdmin.style = "grid-row: 4 / span 1; column: 2 / span 1;";
                let deleteBtn = document.createElement("button");
                deleteBtn.username = data[index].username;
                deleteBtn.innerHTML = "Delete User";

                deleteBtn.addEventListener("click", deleteUser);

                deleteBtn.style = "margin-left: auto; margin-right: auto; grid-row: 2 / span 1; grid-column: 4 / span 1;"

                let modifyBtn = document.createElement("button");
                modifyBtn.username = data[index].username;
                modifyBtn.isAdmin = data[index].isAdmin;
                modifyBtn.style = "margin-left: auto; margin-right: auto; grid-row: 3 / span 1; grid-column: 4 / span 1;"
                modifyBtn.addEventListener("click", modifyPrivilege, "username=" + data[index].username + "&isAdmin=" + data[index].isAdmin);
                card.style = "display: grid; grid-template-columns: 2% 60% 2% 36%; grid-template-rows: 5% 30% 30% 30% 5%; border: 1px solid black; background: white; width: 30vw; height: auto; grid-column:" + col;
                col++;
                if (col > 3) {
                    col = 1;
                }
                username.innerHTML = "Username: " + data[index].username;
                email.innerHTML = "Email: " + data[index].email;
                if (data[index].isAdmin) {
                    isAdmin.innerHTML = "Admin";
                    modifyBtn.innerHTML = "Demote User";
                } else {
                    isAdmin.innerHTML = "User";
                    modifyBtn.innerHTML = "Promote User";
                }
                index++;
                card.append(username);
                card.append(email);
                card.append(isAdmin);
                card.append(deleteBtn);
                card.append(modifyBtn);
                document.getElementById("card-loader").append(card);
            });
        }
    }
    xhttp.open("GET", "/users", true);
    xhttp.send();
}

ready();


function deleteUser() {
    let text = "This will delete the user.\nOk or Cancel.";
    if (confirm(text)) {
        let params = "username=" + this.username;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                location.reload();
            }
        }
        xhttp.open("POST", "/delete-user");
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    }
}

function modifyPrivilege() {
    let text;
    if (this.isAdmin) {
        text = "This will demote the user.\nOk or Cancel.";
    } else {
        text = "This will promote the user.\nOk or Cancel.";
    }
    if (confirm(text)) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "Need at least one account with admin privilege!") {
                    document.getElementById("error-message").innerHTML = this.responseText;
                } else {
                    location.reload();
                }
            }
        }
        xhttp.open("POST", "/modify-privilege");
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (this.isAdmin) {
            xhttp.send("username=" + this.username + "&changeTo=" + 0);
        } else {
            xhttp.send("username=" + this.username + "&changeTo=" + 1);
        }
    };
}

function shuffle() {
    var col = 1;
    var index = 0;
    userList.forEach(function () {
        let card = document.getElementById(""+userList[index].username);
        if (card.style.display == "grid"){
            let text = "grid-column:"+col+";";
            card.style.cssText += text;
            col++;
        }
        if (col > 3){
            col = 1;
        }
        index++;
    });
}

function searchUser() {
    // Declare variables
    let i, txtValue;
    var input = document.getElementById('searchbar').value.toUpperCase();
    for (i = 0; i < userList.length; i++) {
        txtValue = userList[i].username;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            document.getElementById("" + userList[i].username).style.display = "grid";
        } else {
            document.getElementById("" + userList[i].username).style.display = "none";
        }
    }
    shuffle();
}
