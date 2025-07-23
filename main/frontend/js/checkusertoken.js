async function checktoken() {
    return fetch("/api/checktoken", {
        credentials: "include"
        })
    .then(res => {
    if (res.ok) {
      return true
    } else {
      return false
    }
    });
}

export let userLogged=await checktoken()