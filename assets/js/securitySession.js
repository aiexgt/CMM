let usuario = localStorage.getItem("usuario");
let password = localStorage.getItem("password");

if(usuario == null || password == null){
    window.location.href = "index.html";
}else{
    let usuarioD = CryptoJS.AES.decrypt(usuario, "4d657373616765").toString(CryptoJS.enc.Utf8);
    let passwordD = CryptoJS.AES.decrypt(password, "4d657373616765").toString(CryptoJS.enc.Utf8);
    $.post("backend/login.php",{
        usuario: usuarioD,
        password: passwordD
    }, (data, status) => {
        if(data != "1"){
            console.log("salir");
            window.location.href = "index.html";
        }
    })
}