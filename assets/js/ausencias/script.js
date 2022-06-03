//!Seguridad para la sesión
console.log("Copyright © | Tubagua 2022");
let usuario = localStorage.getItem("usuario");
let password = localStorage.getItem("password");
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

//* Botones
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
const btnVer = document.getElementById("verComprobante");

//* Input para buscar
let busqueda = document.getElementById("busqueda");

//* Variable para actualizar y eliminar
let id_cambio;

//* Función para mostrar todas las ausencias
const mostrar = () => {
  $.post("backend/ajax/ausencias/mostrarAusencias.php", {}, (data) => {
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
  let tipo = document.getElementById("tipo").value;
  let fecha = document.getElementById("fecha").value;
  let cantidad = document.getElementById("cantidad").value;
  let fecha_fin = document.getElementById("fecha_fin").value;
  let asunto = document.getElementById("asunto").value;
  let descripcion = document.getElementById("descripcion").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha")
  }else if(asunto == ""){
    errorDF("Asunto")
  }else if(descripcion == ""){
    errorDF("Descripción")
  }else{
    $.post("backend/ajax/ausencias/guardarAusencia.php",{
      trabajador,
      tipo,
      fecha,
      cantidad,
      fecha_fin,
      asunto,
      descripcion,
      id: localStorage.getItem("id")
    }, (data) => {
      if (data == "1") {
        let formData = new FormData();
        if ($("#image").val() != "") {
          let files = $("#image")[0].files[0];
          formData.append("file", files);
          $.ajax({
            url: "backend/ajax/ausencias/guardarImagen.php",
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
        Swal.fire("Excelente!", "El registro de ausencia se ha añadido!", "success");
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
    document.getElementById("tipo").value = 0;
    document.getElementById("trabajador").value = 0;
    document.getElementById("fecha").value = "";
    document.getElementById("cantidad").value = null;
    document.getElementById("fecha_fin").value = "";
    document.getElementById("asunto").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("image").value = "";
};

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  $.post(
    "backend/ajax/ausencias/buscarDetalles.php",
    {
      id: id,
    },
    function (data, status) {
      var unit = JSON.parse(data);
      id_cambio = unit.id;
      document.getElementById("utipo").value = unit.tipo;
      document.getElementById("utipo").setAttribute("disabled","disabled");
      document.getElementById("utrabajador").value = (document.querySelector(`.persona${codigo}`).textContent)
      document.getElementById("utrabajador").setAttribute("disabled","disabled");
      document.getElementById("ufecha").value = unit.fecha_inicio;
      document.getElementById("ufecha").setAttribute("disabled","disabled");
      document.getElementById("ucantidad").value = unit.cantidad;
      document.getElementById("ucantidad").setAttribute("disabled","disabled");
      document.getElementById("ufecha_fin").value = unit.fecha_fin;
      document.getElementById("ufecha_fin").setAttribute("disabled","disabled");
      document.getElementById("uasunto").value = unit.asunto;
      document.getElementById("uasunto").setAttribute("disabled","disabled");
      document.getElementById("udescripcion").value = unit.descripcion;
      document.getElementById("udescripcion").setAttribute("disabled","disabled");
      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.getElementById("uasunto").removeAttribute("disabled","disabled");
    document.getElementById("udescripcion").removeAttribute("disabled","disabled");
    btnEditar.setAttribute("hidden", "hidden");
    btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let trabajador = document.getElementById("utrabajador").value;
  let fecha = document.getElementById("ufecha").value;
  let cantidad = document.getElementById("ucantidad").value;
  let fecha_fin = document.getElementById("ufecha_fin").value;
  let asunto = document.getElementById("uasunto").value;
  let descripcion = document.getElementById("udescripcion").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fecha == ""){
    errorDF("Fecha")
  }else if(asunto == ""){
    errorDF("Asunto")
  }else if(descripcion == ""){
    errorDF("Descripción")
  }else{
    $.post("backend/ajax/ausencias/actualizarAusencia.php",{
      trabajador: trabajador,
      fecha: fecha,
      cantidad: cantidad,
      fecha_fin: fecha_fin,
      asunto: asunto,
      descripcion: descripcion,
      id: id_cambio
    }, (data) => {
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
        "backend/ajax/ausencias/eliminarAusencia.php",
        {
          codigo: id,
        },
        (data) => {
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
  window.open(`img/doc-ausencias/${id_cambio}.pdf`,'_blank')
});

busqueda.addEventListener("change", () => {
  $.post(
    "backend/ajax/ausencias/buscarAusencias.php",
    {
      busqueda: busqueda.value,
    },
    (data) => {
      getElementById("tabla-contenido").innerHTML = data;
    }
  );
});

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

$.post("backend/ajax/ausencias/mostrarEmpresas.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
});

document.getElementById("empresa").addEventListener("change",() => {
  let empresa = document.getElementById("empresa").value;
  $.post("backend/ajax/ausencias/mostrarTrabajadores.php", {
    empresa: empresa
  }, (data, status) => {
    document.getElementById("trabajador").innerHTML = data;
    document.getElementById("trabajador").removeAttribute("disabled");
  });
})

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
