//* Botones
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
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
          "./api/reporte_empleados/generarReporteE.php",
          {
            empresa,
            fechaInicio,
            fechaFin
          },
          (data, status) => {
            if(data > 0){
              $("#exampleModal").modal("hide");
              Swal.fire("Excelente!", "El reporte se ha creado!", "success");
              mostrar();
            }
          }
        );
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
  document.getElementById("empresa").value = 0;
  document.getElementById("fechaInicio").value = "";
  document.getElementById("fechaFin").value = "";
};

const ver = (codigo) => {
  window.open(`img/rep-empleados/${codigo}.pdf`, "_blank");
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
        "./api/reporte_empleados/eliminarReporte.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data.endsWith("1")) {
            Swal.fire("Eliminado!", "El reporte ha sido eliminada.", "success");
            mostrar();
          } else {
            Swal.fire("Error!", "No se puede eliminar reporte.", "error");
          }
        }
      );
    }
  });
};

$.post("./api/default-select/mostrarEmpresas.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
});

btnNuevo.addEventListener("click", () => {
  limpiarCampos();
})

btnGuardar.addEventListener("click", () => {
  guardar();
});

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
