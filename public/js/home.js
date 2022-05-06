<<<<<<< HEAD
"use strict";
=======
//------------------------------------------------
// Gets users name to display on page.
//------------------------------------------------
>>>>>>> f252d123841189e9938ba1bd6d8b9dd3f0aed88a
function ready() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username-placeholder").innerHTML = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();
}

ready();