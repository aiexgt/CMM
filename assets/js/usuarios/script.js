const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");
let busqueda = document.querySelector("#busqueda");
let id_cambio;

const mostrar = () => {
  $.post("backend/ajax/usuarios/mostrarUsuarios.php", {}, (data, status) => {
    document.querySelector("#tabla-contenido").innerHTML = data;
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
  let nombre = document.querySelector("#nombre").value;
  let apellido = document.querySelector("#apellido").value;
  let usuario = document.querySelector("#usuario").value;
  let password = document.querySelector("#password").value;
  let rol = document.querySelector("#rol").value;

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
      id: localStorage.getItem("id")
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
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#usuario").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#rol").value = 0;
  document.querySelector("#unombre").value = "";
  document.querySelector("#uapellido").value = "";
  document.querySelector("#uusuario").value = "";
  document.querySelector("#upassword").value = "";
  document.querySelector("#urol").value = 0;
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
      document.querySelector("#unombre").value = unit.nombre;
      document.querySelector("#unombre").setAttribute("disabled","disabled");
      document.querySelector("#uapellido").value = unit.apellido;
      document.querySelector("#uapellido").setAttribute("disabled","disabled");
      document.querySelector("#uusuario").value = unit.usuario;
      document.querySelector("#uusuario").setAttribute("disabled","disabled");
      document.querySelector("#urol").value = unit.rol_id;
      document.querySelector("#urol").setAttribute("disabled","disabled");
      document.querySelector("#uestado").value = unit.estado;
      document.querySelector("#uestado").setAttribute("disabled","disabled");
      document.querySelector("#upassword").setAttribute("disabled","disabled");
      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.querySelector("#unombre").removeAttribute("disabled");
    document.querySelector("#uapellido").removeAttribute("disabled");
    document.querySelector("#uusuario").removeAttribute("disabled");
    document.querySelector("#upassword").removeAttribute("disabled");
    document.querySelector("#urol").removeAttribute("disabled");
    document.querySelector("#uestado").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let nombre = document.querySelector("#unombre").value;
  let apellido = document.querySelector("#uapellido").value;
  let usuario = document.querySelector("#uusuario").value;
  let password = document.querySelector("#upassword").value;
  let rol = document.querySelector("#urol").value;
  let estado = document.querySelector("#uestado").value;
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
      document.querySelector("#tabla-contenido").innerHTML = data;
    }
  );
});

$(document).ready(() => {
  mostrar();
  limpiarCampos();
  $.post("backend/ajax/usuarios/mostrarRoles.php", {}, 
  (data, status) => {
    document.querySelector("#rol").innerHTML = data;
    document.querySelector("#urol").innerHTML = data;
  })
});
