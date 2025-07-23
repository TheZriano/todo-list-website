import { userLogged } from "./checkusertoken.js";

if (userLogged){
    document.querySelectorAll(".header-logged-button").forEach(el => {
        el.style.display = "flex";
    });
}else{
    document.querySelectorAll(".header-notlogged-button").forEach(el => {
        el.style.display = "flex";
    });
}

console.log(userLogged)

