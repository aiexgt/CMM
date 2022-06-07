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
const btnVer = document.getElementById("verComprobante");
let busqueda = document.getElementById("busqueda");
let id_cambio;

const mostrar = () => {
  $.post("backend/ajax/vacaciones/mostrarVacaciones.php", {}, (data, status) => {
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
  
  let trabajador = document.getElementById("trabajador").value;
  let fecha = document.getElementById("fecha").value;
  let cantidad = parseInt(document.getElementById("cantidad").value);
  let disponibles = parseInt(document.getElementById("disponibles").value);
  let fecha_fin = document.getElementById("fecha_fin").value;
  let observaciones = document.getElementById("observaciones").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha");
  }else if(cantidad <= 0){
    errorDF("Cantidad Valida");
  }else if((disponibles - cantidad) < -15 ){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Días Insuficientes`,
    });
  } else{
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
        $.post("backend/ajax/vacaciones/generarDocumento.php", {
          trabajador,
          fecha,
          fecha_fin,
          cantidad
        }, (data, status) => {
          console.log("Archivo Generado")
        });
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
    document.getElementById("acumulados").value = 0;
    document.getElementById("saldo").value = 0;
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
      document.getElementById("utrabajador").value = (document.querySelector(`.persona${codigo}`).textContent)
      document.getElementById("utrabajador").setAttribute("disabled","disabled");
      document.getElementById("ufecha").value = unit.fecha_inicio;
      document.getElementById("ufecha").setAttribute("disabled","disabled");
      document.getElementById("ucantidad").value = unit.cantidad;
      document.getElementById("ucantidad").setAttribute("disabled","disabled");
      document.getElementById("ufecha_fin").value = unit.fecha_fin;
      document.getElementById("ufecha_fin").setAttribute("disabled","disabled");
      document.getElementById("uobservaciones").value = unit.observaciones;
      document.getElementById("uobservaciones").setAttribute("disabled","disabled");

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
        document.getElementById("udisponibles").value = (dias_disponibles - parseInt(unit.vacaciones_ocupadas));
      });
      

      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.getElementById("uobservaciones").removeAttribute("disabled","disabled");
    document.getElementById("uimage").removeAttribute("disabled","disabled");
    btnEditar.setAttribute("hidden", "hidden");
    btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let trabajador = document.getElementById("utrabajador").value;
  let fecha = document.getElementById("ufecha").value;
  let cantidad = document.getElementById("ucantidad").value;
  let fecha_fin = document.getElementById("ufecha_fin").value;
  let observaciones = document.getElementById("uobservaciones").value;
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

        if ($("#uimage").val() != "") {
          let formData = new FormData();
          let files = $("#uimage")[0].files[0];
          formData.append("file", files);
          formData.append("id", id_cambio);
          $.ajax({
            url: "backend/ajax/vacaciones/actualizarImagen.php",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
              if (response != 0) {
                $(".card-img-top").attr("src", response);
                estado = 1;
              } else {
                estado = 0;
              }
            },
          });
        }

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
          if ((data.endsWith("1"))) {
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

function stringToDate(dateString){
  dateString = dateString.split('-');
  return new Date(dateString[0], dateString[1] - 1, dateString[2]);
}

const calcularDias = () => {
  let date1 = stringToDate(document.getElementById("fecha").value);
  let date2 = stringToDate(document.getElementById("fecha_fin").value);
  delta = (date2-date1) / (1000 * 60 * 60 * 24) + 1; // calcula el tiempo total

    weeks = 0;
    for(i = 0; i < delta; i++){
                     if (date1.getDay () == 0) weeks ++; // agrega 1 si es sábado o domingo
        date1 = date1.valueOf();
        date1 += 1000 * 60 * 60 * 24;
        date1 = new Date(date1);
    }
    document.getElementById("cantidad").value = (delta - weeks);
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
      document.getElementById("tabla-contenido").innerHTML = data;
    }
  );
});

document.getElementById("trabajador").addEventListener("change", () => {
  let trabajador = document.getElementById("trabajador").value;
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
    let acu = parseFloat(((15/365)*dias).toFixed(2));
    let dis = parseFloat((dias_disponibles - parseInt(unit.vacaciones_ocupadas)));
    document.getElementById("acumulados").value = acu;
    document.getElementById("disponibles").value = dis;
    document.getElementById("saldo").value = (acu+dis);
  });
})

document.getElementById("empresa").addEventListener("change",() => {
  let empresa = document.getElementById("empresa").value;
  $.post("backend/ajax/vacaciones/mostrarTrabajadores.php", {
    empresa: empresa
  }, (data, status) => {
    document.getElementById("trabajador").innerHTML = data;
    document.getElementById("trabajador").removeAttribute("disabled");
  });
})

document.getElementById("fecha").addEventListener("change", () => {
  if(document.getElementById("fecha_fin").value != ""){
    calcularDias();
  }
})

document.getElementById("fecha_fin").addEventListener("change", () => {
  if(document.getElementById("fecha").value != ""){
    calcularDias();
  }
})

$.post("backend/ajax/vacaciones/mostrarEmpresas.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
  document.getElementById("bempresa").innerHTML = data;
  //document.getElementById("uempresas").innerHTML = data;
});

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
