//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
async function loadSkeleton() {
    await console.log($('#navbar-placeholder').load('/nav'));
    await console.log($('#footer-placeholder').load('/footer'));



}
loadSkeleton();  //invoke the function

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

