<footer class="footer">
    <div class="container">
        <span class="text-muted">
          <p>Copyright &copy; | Tubagua 2022</p>
        </span>
    </div>
</footer>
<script src="./imported/jquery/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"
      integrity="sha256-/H4YS+7aYb9kJ5OKhFYPUjSJdrtV6AeyJOtTkw6X72o="
      crossorigin="anonymous"
></script>
<script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script
      type="text/javascript"
      src="./imported/menu/menuScript.js"
></script>
<script>
    //!Seguridad para la sesión
    console.log("Copyright © | Tubagua 2022");
    let usuario = sessionStorage.getItem("usuario");
    let password = sessionStorage.getItem("password");
    if(usuario === null || password === null){
        window.location.href = "index.html";
    }else{
        let usuarioD = CryptoJS.AES.decrypt(usuario, "4d657373616765").toString(CryptoJS.enc.Utf8);
        let passwordD = CryptoJS.AES.decrypt(password, "4d657373616765").toString(CryptoJS.enc.Utf8);
        $.post("api/login.php",{
            usuario: usuarioD,
            password: passwordD
        }, (data, status) => {
            if(data == 0){
                window.location.href = "index.html";
            }
        })
        document.getElementById("busuario").innerHTML = usuarioD.toUpperCase();
    }
</script>
<script type="text/javascript" src="./src/funciones.js"></script>