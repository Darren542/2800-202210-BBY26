"use strict";

let userList;

function navigate() {
    
    location.href="/profile?username=" + this.id;
}

function ready() {
    document.getElementById("searchbar").addEventListener("keyup", searchUser);


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
                let temp = document.querySelector('#card-template');
                let card = temp.content.cloneNode(true);
                card.getElementById("username").innerHTML = "Username: " + data[index].username;
                let btn = card.querySelector('.view-profile-Btn');
                btn.id = data[index].username;
                btn.addEventListener("click", navigate);
                
                col++;
                if (col > 3) {
                    col = 1;
                }
                index++;
                document.getElementById("card-loader").append(card);
            });
        }
    }
    xhttp.open("GET", "/users", true);
    xhttp.send();
}

ready();

function shuffle() {
    var col = 1;
    var index = 0;
    userList.forEach(function () {
        let card = document.getElementById("" + userList[index].username);
        if (card.style.display == "grid") {
            let text = "grid-column:" + col + ";";
            card.style.cssText += text;
            col++;
        }
        if (col > 3) {
            col = 1;
        }
        index++;
    });
}

function searchUser() {
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
