function get(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            callback(this.responseText);
        } else{
            console.log(this.status);
        }

        xhr.open("GET", url);
        xhr.send();
    }
}

get("/getgroup?format=json", function(data){
    let dt = JSON.parse(data);
    let container = document.createElement("div");
    container.setAttribute("class", "container");
    let h3 = document.createElement("h3");
    h3.innerHTML = dt.name;
    let loc = document.createElement("div");
    loc.setAttribute("class", "loc");
    loc.innerHTML ="Location: " +  dt.city + ", " + dt.province + ", " + dt.country; 
    let tags = document.createElement("div");
    tags.setAttribute("class", "tags");
    tags.innerHTML = "tags: " + dt.tags;
    let type = document.createElement("div");
    type.setAttribute("class","type");
    if(dt.plan === "1"){
        type.innerHTML = "Plan: " + "Free";
    } else{
        type.innerHTML = "Plan: " + "Premium";
    }
    let desc = document.createElement("div");
    desc.setAttribute("class","desc");
    desc.innerHTML ="description: " +  dt.descrip;
    let btn = document.createElement("button");
    btn.innerHTML = "Join";

    container.append(h3);
    container.append(loc);
    container.append(tags);
    container.append(type);
    container.append(desc);
    container.append(btn);

    document.body.append(container);
    

})