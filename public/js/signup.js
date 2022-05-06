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
getUser();

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";


    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {

                getUser();
                document.getElementById("status").innerHTML = "DB updated.";

            } else {

                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);

            }

        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("POST", "/add-customer");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("name=" + formData.name + "&email=" + formData.email);

})




function checkPassword() {

    let validation = '';

    // Get the form values
    let password = document.getElementById('password');
    let confrimPassword = document.getElementById('confirm-password');

    // Check if confrimPassword isn't null or undefined or empty
    if (confrimPassword == null || confrimPassword == undefined) {

        console.log('confrim password fild null');
        // document.getElementById('chech=')
    } else {
        validation = (password === confrimPassword ? '' : 'Passwords must Match');
    }

    document.getElementById('check-password') = validation;
}