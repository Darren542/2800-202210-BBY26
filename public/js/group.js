//----------------------------------------------------------------------
// takes the whole path as a parameter.
// eg. group/2
// Calls displayGroupInfo
//----------------------------------------------------------------------
async function getGroupInfo(path) {
    const requestId = path.substring(path.lastIndexOf('/'));
    try {
        let response = await fetch(`/group-info${requestId}`, {
            method: 'GET'
        });
        if (response.status === 200) {
            let data = await response.json();
            displayGroupInfo(data);
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

//--------------------------------------------------
// Takes the basic group info as a JSON object
// Displays the info on the group page
//--------------------------------------------------
function displayGroupInfo(data) {
    console.log(data);
    document.getElementById("group-image").src = `/img/group-imgs/${data.group_photo}`;
    document.getElementById("location").innerHTML += `${data.city}, ${data.province}`;
    fetch(`/username/${data.ownerID}`).then( response => response.json()).then(name => {
        document.getElementById("group-owner").innerHTML += name.username;
    })
        

}

getGroupInfo(window.location.pathname);
