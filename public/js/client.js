function loadNav(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const template = document.createElement('div');
            template.innerHTML = xhttp.responseText;
            template.id = "nav";
            template.style = "display:grid; template-grid-rows: 20% 10% 10% 10% 10% 10% 30%; width: 100vw; height: 10vh; background: yellowgreen;";
            document.getElementById('navbar-placeholder').replaceWith(template);
        }
    };
    xhttp.open("GET", '/nav', true);
    xhttp.send();
}
loadNav();

function loadFooter(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const template = document.createElement('footer');
            template.innerHTML = xhttp.responseText;
            template.id = "footer";
            template.style = "width: 100vw; height: 10vh; background: yellowgreen;";
            document.getElementById('footer-placeholder').replaceWith(template);
        }
    };
    xhttp.open("GET", '/footer', true);
    xhttp.send();
}
loadFooter();