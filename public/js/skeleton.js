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
    }, 1000);

});
