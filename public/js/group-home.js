function gettables(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}



gettables("/get-tables", function (data) {

    let dt = JSON.parse(data);
    for (let i = 0; i < dt.length; i++) {
        let container = document.createElement("div");
        container.setAttribute("class", "container");

        let name = document.createElement("h3");
        name.setAttribute("class", "name");
        name.innerHTML = "Groupname: " + dt[i].name;

        let tags = document.createElement("div");
        tags.setAttribute("class", "tags");


        let type = document.createElement("div");
        type.setAttribute("class", "type");
        if (dt[i].type == "free") {
            type.innerHTML = "Plan: " + "Free";
        } else {
            type.innerHTML = "Plan: " + "Premium";
        }


        let desc = document.createElement("div");
        desc.setAttribute("class", "desc");
        desc.innerHTML = "description: " +  dt[i].desc

        let location = document.createElement("div");
        location.setAttribute("class", "location");
        location.innerHTML = "Location: " + dt[i].city + ", " + dt[i].province + ", " + dt[i].country;

        let groupID = document.createElement("div");
        groupID.setAttribute("class", "groupID");
        groupID.innerHTML = "groupID: " + dt[i].groupID;


        let owner = document.createElement("div");
        owner.setAttribute("class", "owner");
        owner.innerHTML = "owner: " + dt[i].user;


        let btn = document.createElement("button");
        btn.setAttribute("class", "btn");
        btn.innerHTML = "join";

        let members = document.createElement("div");
        members.setAttribute("class", "members");
        members.innerHTML = "members: " + "under construction";

        let hr = document.createElement("hr");

        container.append(name);
        container.append(location);
        container.append(groupID);
        container.append(type);
        container.append(owner);
        container.append(members);
        container.append(desc);
        container.append(btn);
        container.append(hr);
        document.getElementById("content").append(container);
    }

})

