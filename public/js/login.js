"use strict";
ready(function () {
    function ajaxPOST(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);

            } else {
<<<<<<< HEAD
=======
                //console.log(this.status);
>>>>>>> f252d123841189e9938ba1bd6d8b9dd3f0aed88a
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    document.getElementById("log").addEventListener("click", function (e) {
        e.preventDefault();
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let queryString = "username=" + username.value + "&password=" + password.value;
        ajaxPOST("/login", function (data) {
            if (data) {
                let dataParsed = JSON.parse(data);
<<<<<<< HEAD
                if (dataParsed.status == "fail") {
=======
                //console.log(dataParsed);
                if (dataParsed.status == "fail") {
                    //console.log(dataParsed.msg);
>>>>>>> f252d123841189e9938ba1bd6d8b9dd3f0aed88a
                } else {
                    window.location.href = "/";
                }
            }
        }, queryString);
    });

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
<<<<<<< HEAD
    } else {
        document.addEventListener("DOMContentLoaded", callback);
=======
        //console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        //console.log("Listener was invoked");
>>>>>>> f252d123841189e9938ba1bd6d8b9dd3f0aed88a
    }
}