"use strict";
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
            let index = 0;
            let col = 1;
            data.forEach(function(){
                let card = document.createElement("div");
                let username = document.createElement("p");
                let email = document.createElement("p");
                let isAdmin = document.createElement("p");
                let deleteBtn = document.createElement("button");
                deleteBtn.innerHTML = "Delete User";
                deleteBtn.addEventListener("click", deleteUser);
                let modifyBtn = document.createElement("button");
                modifyBtn.addEventListener("click", modifyPrivilege);
                card.style = "margin: auto;border: 1px solid black; background: white; width: 30vw; height: auto; grid-column:" + col;
                col++;
                if (col > 3){
                    col = 1;
                }
                username.innerHTML = "Username: " + data[index].username;
                email.innerHTML = "Email: " + data[index].email;
                if (data[index].isAdmin){
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


function deleteUser(){
    console.log("delete");
}

function modifyPrivilege(){
    console.log("modify");
}