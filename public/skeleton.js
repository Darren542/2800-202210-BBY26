//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbar-placeholder').load('./text/nav.html'));
    console.log($('#footer-placeholder').load('./text/footer.html'));
}
loadSkeleton();  //invoke the function
