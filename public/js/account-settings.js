"use strict";

function getemail() {
    const getemail = new XMLHttpRequest();
    getemail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("email").value = this.responseText;
        }
    }
    getemail.open("GET", "/email", true);
    getemail.send();
}

function getname() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username-name").value = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();
}

getname();
getemail();

async function updateUsername() {
    let newUsername = {
        username: document.getElementById("username-name").value
    };
    let path = window.location.pathname;
    const requestId = path.substring(path.lastIndexOf('/'));
    await hideErrors();
    try {
        let responseObject = await fetch(`/update-username${requestId}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(newUsername)
        });
        
        let parsedJSON = await responseObject.json();
        if (parsedJSON.status == "success") {
            document.getElementById("username-filler").classList.add("no-show");
            document.getElementById("update-success-username").classList.remove("no-show");
            window.history.pushState({page: "url replaced with new username"}, "Account Settings", `/account-settings/${newUsername.username}`);
            window.history.replaceState({page: "url replaced with new username"}, `/account-settings/${newUsername.username}`);
        } else if (parsedJSON.status == "failure") {
            document.getElementById("username-filler").classList.add("no-show");
            document.getElementById("update-failure-username").classList.remove("no-show");
            document.getElementById("update-failure-username").innerHTML = parsedJSON.msg;
        } else {
            document.getElementById("username-filler").classList.add("no-show");
            document.getElementById("update-failure-username").classList.remove("no-show");
        }
    } catch(error) {
        console.log(error);
    }
}

async function updateEmail() {
    let newEmail = {
        email: document.getElementById("email").value
    };
    let path = window.location.pathname;
    const requestId = path.substring(path.lastIndexOf('/'));
    await hideErrors();
    try {
        let responseObject = await fetch(`/update-email${requestId}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(newEmail)
        });
        
        let parsedJSON = await responseObject.json();       
        if (parsedJSON.status == "success") {
            document.getElementById("email-filler").classList.add("no-show");
            document.getElementById("update-success-email").classList.remove("no-show");
        } else if (parsedJSON.status == "failure") {
            document.getElementById("email-filler").classList.add("no-show");
            document.getElementById("update-failure-email").classList.remove("no-show");
            document.getElementById("update-failure-email").innerHTML = parsedJSON.msg;
        } else {
            document.getElementById("email-filler").classList.add("no-show");
            document.getElementById("update-failure-email").classList.remove("no-show");
        }
    } catch(error) {
        console.log(error);
    }
}

async function updatePassword() {
    let newPassword = {
        password: document.getElementById("new-password").value,
        confirmPassword: document.getElementById("confirm-password").value
    };
    await hideErrors();
    if (newPassword.password === newPassword.confirmPassword) {
        let path = window.location.pathname;
        const requestId = path.substring(path.lastIndexOf('/'));
        try {
            let responseObject = await fetch(`/update-password${requestId}`, {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newPassword)
            });

            let parsedJSON = await responseObject.json();           
            if (parsedJSON.status == "success") {
                document.getElementById("password-filler").classList.add("no-show");
                document.getElementById("update-success-password").classList.remove("no-show");
            } else {
                document.getElementById("password-filler").classList.add("no-show");
                document.getElementById("update-failure-password").classList.remove("no-show");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        document.getElementById("password-filler").classList.add("no-show");
        document.getElementById("update-failure-password").classList.remove("no-show");
        document.getElementById("update-failure-password").innerHTML = "Passwords don't match"
    }
}

async function hideErrors() {
    document.querySelectorAll(".error-message").forEach((ele) => {
        ele.classList.add("no-show");
    })
    document.querySelectorAll(".space-filler").forEach((ele) => {
        ele.classList.remove("no-show");
    })
}

document.querySelector("#update-account-username").addEventListener('click', () => {
    updateUsername();
});

document.querySelector("#update-account-email").addEventListener('click', () => {
    updateEmail();
});

document.querySelector("#update-account-password").addEventListener('click', () => {
    updatePassword();
});
