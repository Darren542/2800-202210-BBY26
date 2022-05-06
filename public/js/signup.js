function getUser() {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {

                let data = JSON.parse(this.responseText);
                if (data.status == "success") {


                } else {
                    console.log("Error!");
                }

            } else {

                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);

            }

        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("GET", "/get-customers");
    xhr.send();
}
// getUser();

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value
    };
    console.log("password", formData.password);
    console.log("c-password", formData.confirmPassword);
    if (formData.password != formData.confirmPassword) {
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        document.getElementById("no-match").classList.remove("no-show");
    } 
    else {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                // 200 means everthing worked
                if (xhr.status === 200) {
                    //getUser();
                } else {
                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);
            }
        } 
            else {
                console.log("ERROR", this.status);
            }
        }
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        xhr.open("POST", "/add-user");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("username=" + formData.username + "&email=" + formData.email + "&password=" + formData.password);
    }
})




function checkPassword() {

    let validation = '';

    // Get the form values
    let password = document.getElementById('password');
    let confrimPassword = document.getElementById('confirm-password');

    // Check if confrimPassword isn't null or undefined or empty
    if (confrimPassword == null || confrimPassword == undefined) {

        console.log('confirmm password field null');
        // document.getElementById('chech=')
    } else {
        validation = (password === confrimPassword ? '' : 'Passwords must Match');
    }

    document.getElementById('check-password') = validation;
}