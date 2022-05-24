async function getRightNavbar(){
    try {
        let response = await fetch('/username', {
            method: 'GET'
        });
        if (response.status === 200) {
            let element = document.createElement('script');
            element.src = "/js/skeleton-logged-in.js"
            document.body.append(element);
        } else {
            console.log(response.status);
        }
    } catch(error) {
        let element = document.createElement('script');
        element.src = "/js/skeleton.js"
        document.body.append(element);
    }
}

getRightNavbar();