const api = axios.create({
    baseURL: 'http://localhost:8022/api/'
});

signupform.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!signupform.checkValidity()) {
        alert("Please fill in all sign-up data correctly!")
        return;
    }
    let formData = new FormData(signupform);
    let dishData = Object.fromEntries(formData.entries());

    api.post('/user', dishData).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
});

loginform.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!loginform.checkValidity()) {
        alert("Please fill in all login data correctly!")
        console.log("Incorrect login forms")
        return;
    }
    let formData = new FormData(signupform);
    let dishData = Object.fromEntries(formData.entries());

    api.post('/auth', dishData).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
});