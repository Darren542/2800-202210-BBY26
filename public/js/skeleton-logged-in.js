"use strict";
async function loadSkeleton() {
    await $('#navbar-placeholder').load('/nav');
    await $('#footer-placeholder').load('/footer');



}
loadSkeleton(); 

$(document).ready(function () {

    setTimeout(() => {
        document.querySelector("#logo-div").addEventListener("click", () => {
            window.location.href = "/";
        })
        let mobileNav = document.querySelector("#nav-items");
        document.querySelector("#hamburger-menu").addEventListener("click", () => {

            mobileNav.classList.toggle('hidden');
            document.body.classList.toggle('no-scroll');
        });
    }, 100);

});

//------------------------------------------------
// Gets users name to display on page.
//------------------------------------------------
function getUsername() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("nav-username").innerHTML = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();
}

getUsername();