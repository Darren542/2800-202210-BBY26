document.getElementById("next3").addEventListener("click", ()=>{
    let cn = document.getElementById("country").value;
    let st = document.getElementById("state").value;
    let ct = document.getElementById("city").value;
    if(cn && st && ct != null){
        post(cn, st, ct);
    }
    setTimeout(go(), 2000);
})
document.getElementById("exit").addEventListener("click", ()=>{
    window.location.href = "/exit";
})

function post(cn, st, ct) {
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

    xhp.open("POST", "/fill2");
    xhp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhp.send("country=" + cn + "&state=" + st + "&city=" + ct);
}

function go(){
    window.location.href = "/next3";
}

