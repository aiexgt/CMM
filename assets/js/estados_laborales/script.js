const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");
let busqueda = document.querySelector("#busqueda");
let id_cambio;

const mostrar = () => {
  $.post("backend/ajax/estados_laborales/mostrarEstadosLaborales.php", {}, (data, status) => {
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
  let descripcion = document.querySelector("#descripcion").value;

  if(nombre == ""){
    errorDF("Nombre");
  }else{
    $.post("backend/ajax/estados_laborales/guardarEstadoLaboral.php", {
      nombre: nombre,
      descripcion: descripcion
    }, (data, status) => {
      if(data == "1"){
        $("#exampleModal").modal("hide");
          Swal.fire("Excelente!", "El estado laboral se ha añadido!", "success");
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
  document.querySelector("#descripcion").value = "";
  document.querySelector("#unombre").value = "";
  document.querySelector("#udescripcion").value = "";
};

const ver = (codigo) => {
  limpiarCampos();
  let id = document.querySelector(`.id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "backend/ajax/estados_laborales/buscarDetalles.php",
    {
      id:id
    },
    function (data, status) {
      var unit = JSON.parse(data);
      document.querySelector("#unombre").value = unit.nombre;
      document.querySelector("#unombre").setAttribute("disabled","disabled");
      document.querySelector("#udescripcion").value = unit.descripcion;
      document.querySelector("#udescripcion").setAttribute("disabled","disabled");
      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.querySelector("#unombre").removeAttribute("disabled");
    document.querySelector("#udescripcion").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let nombre = document.querySelector("#unombre").value;
  let descripcion = document.querySelector("#udescripcion").value;
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
          "backend/ajax/estados_laborales/actualizarEstadoLaboral.php",
          {
            nombre:nombre,
            descripcion:descripcion,
            id: id_cambio
          },
          (data, status) => {
            if (data == "1") {
              Swal.fire("Excelente!", "El estado laboral ha sido actualizado!", "success");
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
        "backend/ajax/estados_laborales/eliminarEstadoLaboral.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "El estado laboral ha sido eliminada.", "success");
            mostrar();
          } else {
            Swal.fire("Error!", "No se puede eliminar estado laboral.", "error");
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
    "backend/ajax/estados_laborales/buscarEstadoLaboral.php",
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
});
