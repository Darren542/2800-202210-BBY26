"use strict";

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
        btns.setAttribute("class", "btns");


        let section = document.createElement("div");
        section.setAttribute("class", "section");


        let b1 = document.createElement("button");
        b1.setAttribute("class", "btn");
        b1.setAttribute("id", `desc${dt[i].groupID}`);
        b1.innerHTML = "description";


        let b2 = document.createElement("button");
        b2.setAttribute("class", "btn");
        b2.innerHTML = "members";


        let b3 = document.createElement("button");
        b3.setAttribute("class", "btn");
        b3.innerHTML = "events";


        let b4 = document.createElement("button");
        b4.setAttribute("class", "btn");
        b4.innerHTML = "photos";


        let b5 = document.createElement("button");
        b5.setAttribute("class", "btn");
        b5.setAttribute("id", `comm${dt[i].groupID}`);
        b5.innerHTML = "comments";


        section.innerHTML = dt[i].desc;
        section.setAttribute("id", `sec${dt[i].groupID}`);
        section.style = "overflow-y:auto";
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
        let btnid;
        let txtid;
        let divid;
        document.getElementById(`comm${dt[i].groupID}`).addEventListener("click", () => {
            let sec = document.getElementById(`sec${dt[i].groupID}`);
            let txt = document.createElement("INPUT");

            txt.setAttribute("type", "text");
            txt.setAttribute("placeholder", "Add your comment");
            txt.setAttribute("id", `txt${dt[i].groupID}`);
            txt.setAttribute("size", "25");
            txtid = `txt${dt[i].groupID}`;

            let add = document.createElement("button");
            add.setAttribute("class", "btn");
            add.innerHTML = "Comment";
            add.setAttribute("id", `btn${dt[i].groupID}`);
            btnid = `btn${dt[i].groupID}`;

            let comments = document.createElement("div");
            comments.innerHTML = "<h3>Comments</h3>";
            comments.setAttribute("id", `div${dt[i].groupID}`);

            sec.innerHTML = "";
            sec.append(txt);
            sec.append(add);
            sec.append(comments);
            

            const xhp = new XMLHttpRequest();
            xhp.onload = function(){
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                    let dt = JSON.parse(this.responseText);
                    for (let i = 0; i < dt.length; i++) {
                        let p = document.createElement("p");
                        p.innerHTML = dt[i];
                        comments.append(p);
                    }
                } else{

                }
                
            }
            xhp.open("POST", "/getcomment");
            xhp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhp.send("groupID=" + dt[i].groupID);



            document.getElementById(btnid).addEventListener("click", () => {
                if (document.getElementById(txtid).value.length > 1) {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                            callback(this.responseText);
                        } else {

                        }
                    }
                    xhr.open("POST", "/addcomment");
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send("groupID=" + dt[i].groupID + "&comment=" + document.getElementById(txtid).value);
                    document.getElementById(txtid).value = "";
                    
                }
            })
        })





        document.getElementById(`desc${dt[i].groupID}`).addEventListener("click", () => {
            let sec = document.getElementById(`sec${dt[i].groupID}`);
            sec.innerHTML = dt[i].desc;
        })

        



    }

})







