//* Declarar boton y salida de error
const buttonLogin = document.querySelector("#ingresar");
const error = document.querySelector("#error");

//* Limpiar variables de sesión
const limpiarVariables = () =>{
    localStorage.clear();
}

//* Mostrar mensaje de error por 2 segundos
const showError = (mensaje) =>{
    error.innerHTML = "<b>Error: </b>" +mensaje;
    error.classList.remove("invisible");
    error.classList.add("error");

    setTimeout(hideError,2000);
}

//* Ocultar mensaje de error
const hideError = () =>{
    error.classList.remove("error");
    error.classList.add("invisible");
}

//* Validar variables con la base de datos y encriptar las variables de sesión
const login = (usuario, password) => {
    $.post("backend/login.php",{
        usuario: usuario,
        password: password
    }, (data, status) => {
        if(parseInt(data) >= 1){
            usuario = CryptoJS.AES.encrypt(usuario, "4d657373616765");
            password = CryptoJS.AES.encrypt(password, "4d657373616765");
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("password", password);
            localStorage.setItem("id",data);
            window.location.href = "dashboard.html";
        }else{
            showError("Usuario o contraseña incorrectas");
        }
    })
}

//* Evento cuando se le da al boton de iniciar sesión
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

//* Limpiar variables cuando cargue toda la pagina
$(document).ready(() => {
    limpiarVariables();
});