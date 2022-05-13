document.getElementById("next3").addEventListener("click", ()=>{
   if(document.getElementById("free").style.backgroundColor === "black"){
       post("1");
   } else if(document.getElementById("premium").style.backgroundColor === "black"){
       post("0");
   }
   setTimeout(go(), 2000);
})
document.getElementById("exit").addEventListener("click", ()=>{
    window.location.href = "/exit";
})

function post(plan) {
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

    xhp.open("POST", "/fill4");
    xhp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhp.send("free=" + plan);
}

document.getElementById("free").addEventListener("click", ()=>{
    document.getElementById("free").style.backgroundColor = "black";
    document.getElementById("premium").style.backgroundColor = "navy";
})
document.getElementById("premium").addEventListener("click", ()=>{
    document.getElementById("premium").style.backgroundColor = "black";
    document.getElementById("free").style.backgroundColor = "navy";
})

function go(){
    window.location.href = "/next5";
}
