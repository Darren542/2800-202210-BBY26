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
                //console.log(this.status);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log('params', params);
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
                //console.log(dataParsed);
                if (dataParsed.status == "fail") {
                    document.getElementById("no-match").classList.remove("no-show");
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
        //console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        //console.log("Listener was invoked");
    }
}