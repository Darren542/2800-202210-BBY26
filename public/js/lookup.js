"use strict";

let userList;


function ready() {
    document.getElementById("searchbar").addEventListener("keyup", searchUser);

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
                card.querySelector("div").id += ("card" + index);
                card.getElementById("username").innerHTML = "Username: " + data[index].username;
                let link = card.querySelector('.view-profile-link');
                link.href ="/profile?username=" + data[index].username;
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


function searchUser() {
    let i, txtValue;
    var input = document.getElementById('searchbar').value.toUpperCase();
    for (i = 0; i < userList.length; i++) {
        txtValue = userList[i].username;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            document.getElementById("card" + i).style.display = "flex";
        } else {
            document.getElementById("card" + i).style.display = "none";
        }
    }
}
