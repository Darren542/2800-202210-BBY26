"use strict";
async function loadSkeleton() {
<<<<<<< HEAD
    await ($('#navbar-placeholder').load('/nav'));
    await ($('#footer-placeholder').load('/footer'));
=======
    await $('#navbar-placeholder').load('/nav');
    await $('#footer-placeholder').load('/footer');



>>>>>>> f252d123841189e9938ba1bd6d8b9dd3f0aed88a
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

