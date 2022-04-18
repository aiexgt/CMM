const buttonLogin = document.querySelector("#ingresar");

const login = (usuario, password) => {
    $.post("backend/login.php",{
        usuario: usuario,
        password: password
    }, (data, status) => {
        if(data == 1){
            window.location.href = "menu.html";
        }
    })
}

buttonLogin.addEventListener('click', (e) =>{
    e.preventDefault();
    login(document.querySelector("#usuario").value,
    document.querySelector("#password").value);
})