//* Botones
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
let id_cambio;

const mostrar = () => {
  $.post("./api/reporte_empleados/mostrarReporte.php", {}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};

const guardar = () => {
  let empresa = document.getElementById("empresa").value;
  let fechaInicio = document.getElementById("fechaInicio").value;
  let fechaFin = document.getElementById("fechaFin").value;

  if(empresa == 0){
    errorDF("Empresa");
  }else if(fechaInicio == ""){
    errorDF("Fecha Inicio")
  }else if(fechaFin == ""){
    errorDF("Fecha Fin")
  }else{
    $.post("./api/reporte_empleados/guardarRol.php", {
      empresa,
      fechaInicio,
      fechaFin,
      id: sessionStorage.getItem("id")
    }, (data, status) => {
      if(data == "1"){
        $.post(
          "./api/vacaciones/generarDocumentoS.php",
          {
            empresa,
            fechaInicio,
            fechaFin
          },
          (data, status) => { }
        );
        $("#exampleModal").modal("hide");
          Swal.fire("Excelente!", "El reporte se ha creado!", "success");
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
  /*
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("unombre").value = "";
  document.getElementById("udescripcion").value = "";
  document.getElementById("uestado").value = 1;
  */
};

const ver = (codigo) => {
  /*
  limpiarCampos();
  let id = document.getElementById(`id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "./api/reporte_empleados/buscarDetalles.php",
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
    */
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
  /*
    document.getElementById("unombre").removeAttribute("disabled");
    document.getElementById("udescripcion").removeAttribute("disabled");
    document.getElementById("uestado").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  */
};

const actualizar = () => {
  /*
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
      if (result.isConfirmed) {
        $.post(
          "./api/reporte_empleados/actualizarRol.php",
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
  */
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
        "./api/reporte_empleados/eliminarRol.php",
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

$.post("./api/default-select/mostrarEmpresas.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
  document.getElementById("uempresa").innerHTML = data;
});

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

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
