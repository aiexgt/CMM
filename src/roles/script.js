//* Botones
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
let busqueda = document.getElementById("busqueda");
let id_cambio;

const mostrar = () => {
  $.post("./api/roles/mostrarRoles.php", {}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};

const guardar = () => {
  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("descripcion").value;

  if(nombre == ""){
    errorDF("Nombre");
  }else{
    $.post("./api/roles/guardarRol.php", {
      nombre,
      descripcion
    }, (data, status) => {
      if(data == "1"){
        $("#exampleModal").modal("hide");
          Swal.fire("Excelente!", "El rol se ha añadido!", "success");
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
  document.getElementById("descripcion").value = "";
  document.getElementById("unombre").value = "";
  document.getElementById("udescripcion").value = "";
  document.getElementById("uestado").value = 1;
};

const ver = (codigo) => {
  limpiarCampos();
  let id = document.getElementById(`id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "./api/roles/buscarDetalles.php",
    {
      id
    },
    function (data, status) {
      var unit = JSON.parse(data);
      document.getElementById("unombre").value = unit.nombre;
      document.getElementById("unombre").setAttribute("disabled","disabled");
      document.getElementById("udescripcion").value = unit.descripcion;
      document.getElementById("udescripcion").setAttribute("disabled","disabled");
      document.getElementById("uestado").value = unit.estado;
      document.getElementById("uestado").setAttribute("disabled","disabled");
      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.getElementById("unombre").removeAttribute("disabled");
    document.getElementById("udescripcion").removeAttribute("disabled");
    document.getElementById("uestado").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let nombre = document.getElementById("unombre").value;
  let descripcion = document.getElementById("udescripcion").value;
  let estado = document.getElementById("uestado").value;
  if(nombre == ""){
    errorDF("Nombre");
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
          "./api/roles/actualizarRol.php",
          {
            nombre,
            descripcion,
            estado,
            id: id_cambio
          },
          (data, status) => {
            if (data == "1") {
              Swal.fire("Excelente!", "El rol ha sido actualizado!", "success");
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
  let id = document.getElementById(`id${codigo}`).textContent;
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
        "./api/roles/eliminarRol.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "El rol ha sido eliminada.", "success");
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
    "./api/roles/buscarRol.php",
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
});
