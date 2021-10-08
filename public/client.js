document.addEventListener('DOMContentLoaded', ()=>{
   const theGreet = document.querySelector(".greeting");
   const flashErrorMessage = document.querySelector(".flashError");
   const flashErrorMessage2 = document.querySelector(".flashErrors");
   const flashSuccessMessage = document.querySelector(".flashSuccess");

   if (flashSuccessMessage) {
        if (flashSuccessMessage.hasChildNodes()) {
            setTimeout(function (){
                flashSuccessMessage.innerHTML = "";

            }, 4000);
         
        }
    }

    if (flashErrorMessage) {
        if (flashErrorMessage.hasChildNodes()) {
            setTimeout(function (){
                flashErrorMessage.innerHTML = "";
            }, 4000);  
       }
    }

    if (flashErrorMessage2) {
        if (flashErrorMessage2.hasChildNodes()) {
            setTimeout(function (){
                flashErrorMessage2.innerHTML = "";
            }, 4000);  
       }
    }

   if (theGreet.hasChildNodes()) {
       setTimeout(function (){
            theGreet.innerHTML = "";
       }, 4000); 

    }
});