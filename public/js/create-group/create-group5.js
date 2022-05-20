document.getElementById("next3").addEventListener("click", ()=>{
   if(document.getElementById("c1").checked && document.getElementById("c2").checked){
    window.location.href = "/grouphome";
   } else{
       document.getElementById("warning").innerHTML = "You must agree to the terms and conditions and guidelines.";
   }
   
 })
 document.getElementById("exit").addEventListener("click", ()=>{
     window.location.href = "/exit";
 })
 
 
 