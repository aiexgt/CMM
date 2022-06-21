const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
const btnVer = document.getElementById("verComprobante");
let id_cambio;

const mostrar = () => {
  $.post("./api/llamadas_atencion/mostrarLlamadas.php", {}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};

const guardar = () => {
  
  let trabajador = document.getElementById("trabajador").value;
  let fecha = document.getElementById("fecha").value;
  let asunto = document.getElementById("asunto").value;
  let nivel = document.getElementById("nivel").value;
  let observaciones = document.getElementById("observaciones").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha");
  }else if(asunto == ""){
    errorDF("Asunto");
  }else if(nivel == 0){
    errorDF("Nivel");
  }else{
    $.post("./api/llamadas_atencion/guardarLlamada.php",{
      trabajador,
      fecha,
      asunto,
      nivel,
      observaciones,
      id: sessionStorage.getItem("id")
    }, (data, statur) => {
      if (data == "1") {
        let formData = new FormData();
        if ($("#image").val() != "") {
          let files = $("#image")[0].files[0];
          formData.append("file", files);
  
          $.ajax({
            url: "./api/llamadas_atencion/guardarImagen.php",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
              if (response != 0) {
                $(".card-img-top").attr("src", response);
              } else {
                alert("Formato de imagen incorrecto.");
              }
            },
          });
        }else{
          /*
          $.post(
            "./api/llamadas_atencion/generarDocumento.php",
            {
              trabajador,

            },
            (data, status) => {}
          );
          */
        }
        $("#exampleModal").modal("hide");
        Swal.fire("Excelente!", "La llamada de atención se ha añadido!", "success");
        limpiarCampos();
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
    document.getElementById("empresa").value = 0;
    document.getElementById("trabajador").value = 0;
    document.getElementById("fecha").value = "";
    document.getElementById("asunto").value = "";
    document.getElementById("observaciones").value = "";
    document.getElementById("image").value = "";
    document.getElementById("nivel").value = 0;
};

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  $.post(
    "./api/llamadas_atencion/buscarDetalles.php",
    {
      id: id,
    },
    function (data, status) {
      var unit = JSON.parse(data);
      id_cambio = unit.id;
      document.getElementById("utrabajador").value = (document.querySelector(`.persona${codigo}`).textContent)
      document.getElementById("utrabajador").setAttribute("disabled","disabled");
      document.getElementById("ufecha").value = unit.fecha;
      document.getElementById("ufecha").setAttribute("disabled","disabled");
      document.getElementById("uasunto").value = unit.asunto;
      document.getElementById("uasunto").setAttribute("disabled","disabled");
      document.getElementById("uobservaciones").value = unit.observaciones;
      document.getElementById("uobservaciones").setAttribute("disabled","disabled");
      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.getElementById("uasunto").removeAttribute("disabled","disabled");
    document.getElementById("uobservaciones").removeAttribute("disabled","disabled");
    btnEditar.setAttribute("hidden", "hidden");
    btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let trabajador = document.getElementById("utrabajador").value;
  let fecha = document.getElementById("ufecha").value;
  let asunto = document.getElementById("uasunto").value;
  let observaciones = document.getElementById("uobservaciones").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha")
  }else if(asunto == ""){
    errorDF("Asunto")
  }else{
    $.post("./api/llamadas_atencion/actualizarLlamada.php",{
      trabajador: trabajador,
      fecha: fecha,
      asunto: asunto,
      observaciones: observaciones,
      id: id_cambio
    }, (data, status) => {
      if (data == "1") {
        Swal.fire("Excelente!", "El registro ha sido actualizado!", "success");
        $("#exampleModala").modal("hide");
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
        "./api/llamadas_atencion/eliminarLlamada.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "El registro ha sido eliminada.", "success");
            mostrar();
          } else {
            Swal.fire("Error!", "No se puede eliminar el registro.", "error");
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

btnVer.addEventListener("click", () => {
  window.open(`img/doc-llamadas/${id_cambio}.pdf`,'_blank')
});

document.getElementById("empresa").addEventListener("change",() => {
  let empresa = document.getElementById("empresa").value;
  $.post("./api/default-select/mostrarTrabajadores.php", {
    empresa: empresa
  }, (data, status) => {
    document.getElementById("trabajador").innerHTML = data;
    document.getElementById("trabajador").removeAttribute("disabled");
  });
})

document.getElementById("trabajador").addEventListener("change", () => {
  let id = document.getElementById("trabajador").value;
  $.post("./api/default-select/mostrarLlamadas.php",
    {
      id
    }, (data) => {
      document.getElementById("anterior").innerHTML = data;
      document.getElementById("anterior").removeAttribute("disabled");
    }
  )
})


$.post("./api/default-select/mostrarEmpresas.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
  //document.getElementById("uempresas").innerHTML = data;
});

$.post("./api/default-select/mostrarNiveles.php", {}, (data, status) => {
  document.getElementById("nivel").innerHTML = data;
  //document.getElementById("uempresas").innerHTML = data;
});

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
