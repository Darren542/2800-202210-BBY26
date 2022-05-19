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

        let img = document.createElement("div");
        img.setAttribute("class", "img");
        let im = document.createElement("img");
        im.setAttribute("src", "");
        im.setAttribute("alt", "GROUP IMAGE");
        img.append(im);


        let details = document.createElement("div");
        img.setAttribute("class", "details");
        let groupname = document.createElement("div");
        groupname.setAttribute("class", "groupname");
        let head = document.createElement("h3");
        head.innerHTML = dt[i].name;
        groupname.append(head);
        let location = document.createElement("div");
        location.setAttribute("class", "location");
        location.innerHTML = "Location: " + dt[i].city + ", " + dt[i].province + ", " + dt[i].city;
        let members = document.createElement("div");
        members.setAttribute("class", "members");
        members.innerHTML = "members: " + "under construction";
        let owjoin = document.createElement("div");
        owjoin.setAttribute("class", "owjoin");
        let owner = document.createElement("div");
        owner.setAttribute("class", "owner");
        owner.innerHTML = "owner: " + dt[i].user;
        let d = document.createElement("div");
        let btn = document.createElement("button");
        btn.setAttribute("class", "btn");
        btn.innerHTML = "Join";
        d.append(btn);
        owjoin.append(owner);
        owjoin.append(d);
        details.append(groupname);
        details.append(location);
        details.append(members);
        details.append(owjoin);


        let extra = document.createElement("div");
        extra.setAttribute("class", "extra");
        let btns = document.createElement("div");
        btns.setAttribute("class","btns");
        let section = document.createElement("div");
        section.setAttribute("class","section");
        let description = document.createElement("div");
        description.setAttribute("class","description");
        description.innerHTML = dt[i].desc;
        let b1 = document.createElement("button");
        b1.setAttribute("class","btn");
        b1.innerHTML = "description";
        let b2 = document.createElement("button");
        b2.setAttribute("class","btn");
        b2.innerHTML = "members";
        let b3 = document.createElement("button");
        b3.setAttribute("class","btn");
        b3.innerHTML = "events";
        let b4 = document.createElement("button");
        b4.setAttribute("class","btn");
        b4.innerHTML = "photos";
        let b5 = document.createElement("button");
        b5.setAttribute("class","btn");
        b5.innerHTML = "comments";

        section.append(description);
        btns.append(b1);
        btns.append(b2);
        btns.append(b3);
        btns.append(b4);
        btns.append(b5);

        extra.append(btns);
        extra.append(section);





        let hr = document.createElement("hr");

        container.append(img);
        container.append(details);
        container.append(extra);
        
        document.getElementById("content").append(container);
    }

})

