const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");

let busqueda = document.querySelector("#busqueda");
let codigo_anterior;

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
};

const ver = (codigo) => {
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
  
};

const actualizar = () => {
  
};

const eliminar = (codigo) => {

};

btnNuevo.addEventListener("click", () => {
  
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
    "backend/ajax/empresas/buscarEmpresa.php",
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
