async function logout() {
    fetch("/api/logout", {
        method: "POST",
        credentials: "include"
        });

    window.location.href = "/"
}