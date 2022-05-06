function ready() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username-placeholder").innerHTML = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();


    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            let index = 0;
            data.forEach(function(){
                let row = document.createElement("tr");
                let username = document.createElement("td");
                let email = document.createElement("td");
                let isAdmin = document.createElement("td");
                username.innerHTML = data[index].username;
                email.innerHTML = data[index].email;
                if (data[index].isAdmin){
                    isAdmin.innerHTML = "Admin";
                } else {
                    isAdmin.innerHTML = "User";
                }
                index++;
                row.append(username);
                row.append(email);
                row.append(isAdmin);
                document.getElementById("table-insertion-point").append(row);
            });
        }
    }
    xhttp.open("GET", "/users", true);
    xhttp.send();
}

ready();