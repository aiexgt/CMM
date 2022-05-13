const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");
const btnVer = document.querySelector("#verComprobante");
let busqueda = document.querySelector("#busqueda");
let id_cambio;

const mostrar = () => {
  $.post("backend/ajax/vacaciones/mostrarVacaciones.php", {}, (data, status) => {
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
  
  let trabajador = document.getElementById("trabajador").value;
  let fecha = document.getElementById("fecha").value;
  let cantidad = parseInt(document.getElementById("cantidad").value);
  let disponibles = parseInt(document.querySelector("#disponibles").value);
  let fecha_fin = document.getElementById("fecha_fin").value;
  let observaciones = document.getElementById("observaciones").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha");
  }else if(cantidad <= 0){
    errorDF("Cantidad Valida");
  }else if(cantidad > disponibles){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Días disponibles insuficientes`,
    });
  }else{
    $.post("backend/ajax/vacaciones/guardarVacacion.php",{
      trabajador: trabajador,
      fecha: fecha,
      cantidad: cantidad,
      fecha_fin: fecha_fin,
      observaciones: observaciones,
      disponibles: disponibles,
      id: localStorage.getItem("id")
    }, (data, statur) => {
      if (data == "1") {
        let formData = new FormData();
        if ($("#image").val() != "") {
          let files = $("#image")[0].files[0];
          formData.append("file", files);
  
          $.ajax({
            url: "backend/ajax/vacaciones/guardarImagen.php",
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
        }
        $("#exampleModal").modal("hide");
        Swal.fire("Excelente!", "El registro de vacaciones se ha añadido!", "success");
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
    document.getElementById("cantidad").value = null;
    document.getElementById("fecha_fin").value = "";
    document.getElementById("observaciones").value = "";
    document.getElementById("image").value = "";
    document.getElementById("disponibles").value = 0;
};

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  $.post(
    "backend/ajax/vacaciones/buscarDetalles.php",
    {
      id: id,
    },
    function (data, status) {
      var unit = JSON.parse(data);
      id_cambio = unit.id;
      document.querySelector("#utrabajador").value = (document.querySelector(`.persona${codigo}`).textContent)
      document.querySelector("#utrabajador").setAttribute("disabled","disabled");
      document.querySelector("#ufecha").value = unit.fecha_inicio;
      document.querySelector("#ufecha").setAttribute("disabled","disabled");
      document.querySelector("#ucantidad").value = unit.cantidad;
      document.querySelector("#ucantidad").setAttribute("disabled","disabled");
      document.querySelector("#ufecha_fin").value = unit.fecha_fin;
      document.querySelector("#ufecha_fin").setAttribute("disabled","disabled");
      document.querySelector("#uobservaciones").value = unit.observaciones;
      document.querySelector("#uobservaciones").setAttribute("disabled","disabled");

      $.post("backend/ajax/vacaciones/consultarVacaciones.php", {
        id: unit.persona_id
      }, (data, status) => {
        var unit = JSON.parse(data);
        let dias = parseInt(calculardiasDiscount(unit.fecha_inicio));
        let dias_disponibles = 0;
        while(dias > 365){
          dias_disponibles += 15;
          dias -= 365;
        }
        document.querySelector("#udisponibles").value = (dias_disponibles - parseInt(unit.vacaciones_ocupadas));
      });
      

      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.querySelector("#uobservaciones").removeAttribute("disabled","disabled");
    btnEditar.setAttribute("hidden", "hidden");
    btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let trabajador = document.getElementById("utrabajador").value;
  let fecha = document.getElementById("ufecha").value;
  let cantidad = document.getElementById("ucantidad").value;
  let fecha_fin = document.getElementById("ufecha_fin").value;
  let descripcion = document.getElementById("uobservaciones").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha")
  }else{
    $.post("backend/ajax/vacaciones/actualizarVacacion.php",{
      trabajador: trabajador,
      fecha: fecha,
      cantidad: cantidad,
      fecha_fin: fecha_fin,
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

const calculardiasDiscount = (fecha_inicio) => {
  var timeStart = new Date(fecha_inicio);

    var actualDate = new Date();
    if (actualDate > timeStart)
    {
        var diff = actualDate.getTime() - timeStart.getTime();
        let dias_calculados = Math.round(diff / (1000 * 60 * 60 * 24)) -1;
        return dias_calculados;
    }
}

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
        "backend/ajax/vacaciones/eliminarVacacion.php",
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

const calcularDias = () => {
  var timeStart = new Date(document.getElementById("fecha").value);
  var timeEnd = new Date(document.querySelector("#fecha_fin").value);
    if (timeEnd > timeStart)
    {
        var diff = timeEnd.getTime() - timeStart.getTime();
        document.getElementById("cantidad").value = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Fecha Inicial mayor a la Final`,
      });
      document.querySelector("#fecha").value = "";
      document.querySelector("#fecha_fin").value = "";
    }
}

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
  window.open(`img/doc-vacaciones/${id_cambio}.pdf`,'_blank')
});

busqueda.addEventListener("change", () => {
  $.post(
    "backend/ajax/vacaciones/buscarVacacion.php",
    {
      busqueda: busqueda.value,
    },
    (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    }
  );
});

document.querySelector("#trabajador").addEventListener("change", () => {
  let trabajador = document.querySelector("#trabajador").value;
  $.post("backend/ajax/vacaciones/consultarVacaciones.php", {
    id: trabajador
  }, (data, status) => {
    var unit = JSON.parse(data);
    let dias = parseInt(calculardiasDiscount(unit.fecha_inicio));
    let dias_disponibles = 0;
    while(dias > 365){
      dias_disponibles += 15;
      dias -= 365;
    }
    document.querySelector("#disponibles").value = (dias_disponibles - parseInt(unit.vacaciones_ocupadas));
  });
})

document.querySelector("#empresa").addEventListener("change",() => {
  let empresa = document.querySelector("#empresa").value;
  $.post("backend/ajax/vacaciones/mostrarTrabajadores.php", {
    empresa: empresa
  }, (data, status) => {
    document.querySelector("#trabajador").innerHTML = data;
    document.querySelector("#trabajador").removeAttribute("disabled");
  });
})

document.querySelector("#fecha").addEventListener("change", () => {
  if(document.querySelector("#fecha_fin").value != ""){
    calcularDias();
  }
})

document.querySelector("#fecha_fin").addEventListener("change", () => {
  if(document.querySelector("#fecha").value != ""){
    calcularDias();
  }
})

$.post("backend/ajax/vacaciones/mostrarEmpresas.php", {}, (data, status) => {
  document.querySelector("#empresa").innerHTML = data;
  //document.querySelector("#uempresas").innerHTML = data;
});

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
