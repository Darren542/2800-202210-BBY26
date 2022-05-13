document.getElementById("next2").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let tags = document.getElementById("tags").value;
    if(name && tags != null){
        post(name, tags);
    }
    setTimeout(go(), 2000);
    
})
document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "/exit";
})

function post(name, tag, go) {
    let xhp = new XMLHttpRequest();
    xhp.onload = () => {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhp.status === 200) {
                let reply = JSON.parse(xhp.response)
                if (reply.status == "failure") {
                    console.log("failed");
                } else {
                    console.log("data sent");
                }
            } else {

            }
        }
    }

    xhp.open("POST", "/fill");
    xhp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhp.send("groupname=" + name + "&tags=" + tag);
}

function go(){
    window.location.href = "/next2";
}
