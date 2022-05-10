"use strict";
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value
    };
    if (formData.password != formData.confirmPassword) {
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        document.getElementById("no-match").classList.remove("no-show");
    } 
    else {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let reply = JSON.parse(xhr.response);
                    if (reply.status == "failure") {
                        document.getElementById("email-taken").classList.remove("no-show");
                    } else {
                        let queryString = "username=" + formData.username + "&password=" + formData.password;
                        ajaxPOST("/login", function (data) {
                            if (data) {
                                let dataParsed = JSON.parse(data);
                                if (dataParsed.status == "fail") {
                                } else {
                                    window.location.href = "/";
                                }
                            }
                        }, queryString);
                    }
                } else {
                // not a 200, could be anything (404, 500, etc.)
                //console.log(this.status);
            }
        } 
            else {
                //console.log("ERROR", this.status);
            }
        }
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        xhr.open("POST", "/add-user");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log('xhr', xhr);
        console.log('username', formData.username);
        console.log('email', formData.email);
        xhr.send("username=" + formData.username + "&email=" + formData.email + "&password=" + formData.password);
    }
});

function ajaxPOST(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
        }
    }
    xhr.open("POST", url);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}