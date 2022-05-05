//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbar-placeholder').load('/nav'));
    console.log($('#footer-placeholder').load('/footer'));
}
loadSkeleton();  //invoke the function