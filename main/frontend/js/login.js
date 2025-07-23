import { userLogged } from "./checkusertoken.js";

if (userLogged){
    window.location.href="/"
}

function togglepasswordview(){
    let passwordInput=document.getElementById("password-input");
    if (passwordInput.type=="password"){
        passwordInput.type="text"
        document.getElementById("visibility-off").style.display="none"
        document.getElementById("visibility-on").style.display="block"
    }else{
        passwordInput.type="password"
        document.getElementById("visibility-on").style.display="none"
        document.getElementById("visibility-off").style.display="block"
    }
}

function login(){
    const username=document.getElementById("username-input").value
    const password=document.getElementById("password-input").value
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        }),
        })
        .then(res => res.json())
        .then(data => {
        if (!data.ok){
            document.getElementById("errormessage").style.display="block";
        }else{
            window.location.href="/"
        }
        })
        .catch(err => {
        console.error('Errore nella richiesta:', err);
        });
}

function signin(){
    const username=document.getElementById("username-input").value
    const password=document.getElementById("password-input").value
    const name=document.getElementById("name-input").value
    const surname=document.getElementById("surname-input").value
    const email=document.getElementById("email-input").value
    fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            email,
            name,
            surname
        }),
        })
        .then(res => res.json())
        .then(data => {
        if (!data.ok){
            document.getElementById("errormessage").innerText=data.err;
        }else{
            window.location.href="/"
        }
        })
        .catch(err => {
        console.error('Errore nella richiesta:', err);
        });
}