//!Seguridad para la sesión
console.log("Copyright © | Tubagua 2022");
let usuario = sessionStorage.getItem("usuario");
let password = sessionStorage.getItem("password");
if(usuario === null || password === null){
    window.location.href = "index.html";
}else{
    let usuarioD = CryptoJS.AES.decrypt(usuario, "4d657373616765").toString(CryptoJS.enc.Utf8);
    let passwordD = CryptoJS.AES.decrypt(password, "4d657373616765").toString(CryptoJS.enc.Utf8);
    $.post("backend/login.php",{
        usuario: usuarioD,
        password: passwordD
    }, (data, status) => {
        if(data == 0){
            window.location.href = "index.html";
        }
    })
    document.getElementById("busuario").innerHTML = usuarioD.toUpperCase();
}
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
let busqueda = document.getElementById("busqueda");
let id_cambio;

const mostrar = () => {
  $.post("backend/ajax/usuarios/mostrarUsuarios.php", {}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};

const errorDF = (dato) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `Falta ${dato}`,
  });
};

const guardar = () => {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  let rol = document.getElementById("rol").value;

  if(nombre == ""){
    errorDF("Nombre");
  }else if (apellido == ""){
    errorDF("Apellido");
  }else if (usuario == ""){
    errorDF("Usuario");
  }else if (password == ""){
    errorDF("Contraseña");
  }else if (rol == 0){
    errorDF("Rol");
  }else{
    $.post("backend/ajax/usuarios/guardarUsuario.php", {
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      password: password,
      rol: rol,
      id: sessionStorage.getItem("id")
    }, (data, status) => {
      if(data == "1"){
        $("#exampleModal").modal("hide");
          Swal.fire("Excelente!", "El usuario se ha añadido!", "success");
          mostrar();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha Ocurrido un error!',
        })
      }
    })
  }

};

const limpiarCampos = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("usuario").value = "";
  document.getElementById("password").value = "";
  document.getElementById("rol").value = 0;
  document.getElementById("unombre").value = "";
  document.getElementById("uapellido").value = "";
  document.getElementById("uusuario").value = "";
  document.getElementById("upassword").value = "";
  document.getElementById("urol").value = 0;
};

const ver = (codigo) => {
  limpiarCampos();
  let id = document.querySelector(`.id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "backend/ajax/usuarios/buscarDetalles.php",
    {
      id:id
    },
    function (data, status) {
      var unit = JSON.parse(data);
      document.getElementById("unombre").value = unit.nombre;
      document.getElementById("unombre").setAttribute("disabled","disabled");
      document.getElementById("uapellido").value = unit.apellido;
      document.getElementById("uapellido").setAttribute("disabled","disabled");
      document.getElementById("uusuario").value = unit.usuario;
      document.getElementById("uusuario").setAttribute("disabled","disabled");
      document.getElementById("urol").value = unit.rol_id;
      document.getElementById("urol").setAttribute("disabled","disabled");
      document.getElementById("uestado").value = unit.estado;
      document.getElementById("uestado").setAttribute("disabled","disabled");
      document.getElementById("upassword").setAttribute("disabled","disabled");
      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.getElementById("unombre").removeAttribute("disabled");
    document.getElementById("uapellido").removeAttribute("disabled");
    document.getElementById("uusuario").removeAttribute("disabled");
    document.getElementById("upassword").removeAttribute("disabled");
    document.getElementById("urol").removeAttribute("disabled");
    document.getElementById("uestado").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let nombre = document.getElementById("unombre").value;
  let apellido = document.getElementById("uapellido").value;
  let usuario = document.getElementById("uusuario").value;
  let password = document.getElementById("upassword").value;
  let rol = document.getElementById("urol").value;
  let estado = document.getElementById("uestado").value;
  if(nombre == ""){
    errorDF("Nombre");
  }else if (apellido == ""){
    errorDF("Apellido");
  }else if (usuario == ""){
    errorDF("Usuario");
  }else if (rol == 0){
    errorDF("Rol");
  }else{
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Descartar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $.post(
          "backend/ajax/usuarios/actualizarUsuario.php",
          {
            nombre:nombre,
            apellido: apellido,
            usuario: usuario,
            password: password,
            rol: rol,
            estado: estado,
            id: id_cambio
          },
          (data, status) => {
            if (data == "1") {
              Swal.fire("Excelente!", "El usuario ha sido actualizado!", "success");
              $("#exampleModala").modal("hide");
              mostrar();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha Ocurrido un error!',
              })
            }
          }
        );
        Swal.fire("Guardado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados", "", "info");
      }
    });
  }
};

const eliminar = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  Swal.fire({
    title: "¿Seguro que desea eliminarlo?",
    text: "Este cambio es irreversible!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "backend/ajax/usuarios/eliminarUsuario.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "El usuario ha sido eliminada.", "success");
            mostrar();
          } else {
            Swal.fire("Error!", "No se puede eliminar usuario.", "error");
          }
        }
      );
    }
  });
};

btnNuevo.addEventListener("click", () => {
  limpiarCampos();
})

btnActualizar.addEventListener("click", () => {
  actualizar();
});

btnEditar.addEventListener("click", () => {
  quitarDisabled();
});

btnGuardar.addEventListener("click", () => {
  guardar();
});


busqueda.addEventListener("keyup", () => {
  $.post(
    "backend/ajax/usuarios/buscarUsuario.php",
    {
      busqueda: busqueda.value,
    },
    (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    }
  );
});

$(document).ready(() => {
  mostrar();
  limpiarCampos();
  $.post("backend/ajax/usuarios/mostrarRoles.php", {}, 
  (data, status) => {
    document.getElementById("rol").innerHTML = data;
    document.getElementById("urol").innerHTML = data;
  })
});
