const buttonLogin = document.querySelector("#ingresar");
const error = document.querySelector("#error");

const showError = (mensaje) =>{
    error.innerHTML = "<b>Error: </b>" +mensaje;
    error.classList.remove("invisible");
    error.classList.add("error");

    setTimeout(hideError,2000);
}

const hideError = () =>{
    error.classList.remove("error");
    error.classList.add("invisible");
}

const login = (usuario, password) => {
    $.post("backend/login.php",{
        usuario: usuario,
        password: password
    }, (data, status) => {
        if(data == 1){
            window.location.href = "menu.html";
        }else{
            showError("Usuario o contraseña incorrectas");
        }
    })
}

buttonLogin.addEventListener('click', (e) =>{
    e.preventDefault();
    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;
    hideError();
    if(usuario == ""){
        showError("Ingrese usuario");
    }else if(password == ""){
        showError("Ingrese contraseña");
    }else{
        login(usuario, password);
    }
})