function gettables(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(JSON.parse(this.responseText));
            } else {
                console.log(this.status);
            }
        } else {
            console.log("error");
        }
    }
    xhr.open("GET", url);
    xhr.send();

}

document.addEventListener("DOMContentLoaded", () => {

    gettables("/get-tables", function(data){
        if(data.status == "success"){
            let dt = data;
            for (let i = 0; i < dt.length; i++) {
                let container = document.createElement("div");
                container.setAttribute("class", "container");

                let name = document.createElement("h3");
                name.setAttribute("class", "name");
                name.innerHTML = dt[i].name;

                let tags = document.createElement("div");
                tags.setAttribute("class", "tags");
                tags.innerHTML = dt[i].tags;

                let type = document.createElement("div");
                type.setAttribute("class", "type");
                if (dt[i].plan == "1") {
                    type.innerHTML = "Free";
                } else if (dt[i].plan == "0") {
                    type.innerHTML = "Premium";
                }


                let desc = document.createElement("div");
                desc.setAttribute("class", "desc");
                desc.innerHTML = dt[i].description

                let location = document.createElement("div");
                tags.setAttribute("class", "location");
                location.innerHTML = dt[i].country + ", " + dt[i].province + ", " + dt[i].city;

                let members = document.createElement("div");
                members.setAttribute("class", "members");
                members.innerHTML = "members :";

                let owner = document.createElement("div");
                owner.setAttribute("class", "owner");
                owner.innerHTML = "owner :";

                let btn = document.createElement("button");
                btn.setAttribute("class", "btn");
                btn.innerHTML = "join";

                let hr = document.createElement("hr");

                container.append(name);
                container.append(location);
                container.append(owner);
                container.append(tags);
                container.append(type);
                container.append(members);
                container.append(desc);
                container.append(btn);
                container.append(hr);
                document.getElementById("content").append(container);
        }
        } else{
            console.log("failed");
        }
    })
})
