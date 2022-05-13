document.getElementById("next3").addEventListener("click", ()=>{
    let desc = document.getElementById("desc").value;
    
    if(desc != null){
        post(desc);
    }
    setTimeout(go(), 2000);
})
document.getElementById("exit").addEventListener("click", ()=>{
    window.location.href = "/exit";
})

function post(desc) {
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

    xhp.open("POST", "/fill3");
    xhp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhp.send("description=" + desc);
}

function go(){
    window.location.href = "/next4";
}





