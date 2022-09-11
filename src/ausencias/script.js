//* Botones
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
const btnVer = document.getElementById("verComprobante");

//* Variable para actualizar y eliminar
let id_cambio;

//* Función para mostrar todas las ausencias
const mostrar = (trabajador) => {
  $.post("./api/ausencias/mostrarAusencias.php", {trabajador}, (data) => {
    document.getElementById("tabla-contenido").innerHTML = data;
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
  let fechat = document.getElementById("fecha-temp").value;
  if(trabajador == 0){
    errorDF("Trabajador");
  }else if(fechat == ""){
    errorDF("Fecha")
  }else if(fecha == ""){
    errorDF("Fecha")
  }else if(asunto == ""){
    errorDF("Asunto")
  }else if(descripcion == ""){
    errorDF("Descripción")
  }else{
    $.post("./api/ausencias/guardarAusencia.php",{
      trabajador,
      tipo,
      fecha,
      cantidad,
      fecha_fin,
      asunto,
      descripcion,
      fechat,
      id: sessionStorage.getItem("id")
    }, (data) => {
      if (data == "1") {
        let formData = new FormData();
        if ($("#image").val() != "") {
          let files = $("#image")[0].files[0];
          formData.append("file", files);
          $.ajax({
            url: "./api/ausencias/guardarImagen.php",
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
          $.post(
            "./api/ausencias/generarDocumento.php",
            {
              trabajador,
              fecha,
              fecha_fin,
              cantidad,
              tipo,
              asunto,
              descripcion,
              fechat
            },
            (data, status) => {}
          );
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
    "./api/ausencias/buscarDetalles.php",
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
    document.getElementById("uimage").removeAttribute("disabled","disabled");
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
    $.post("./api/ausencias/actualizarAusencia.php",{
      trabajador: trabajador,
      fecha: fecha,
      cantidad: cantidad,
      fecha_fin: fecha_fin,
      asunto: asunto,
      descripcion: descripcion,
      id: id_cambio
    }, (data) => {
      if (data == "1") {
        if ($("#uimage").val() != "") {
          let formData = new FormData();
          let files = $("#uimage")[0].files[0];
          formData.append("file", files);
          formData.append("id", id_cambio);
          $.ajax({
            url: "./api/ausencias/actualizarImagen.php",
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
        "./api/ausencias/eliminarAusencia.php",
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


const validarFechas = () => {
  let date1 = document.getElementById("fecha").value;
  let date2 = document.getElementById("fecha_fin").value;
  calcularDiasSD(date1, date2);
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
  window.open(`img/doc-ausencias/${id_cambio}.pdf`,'_blank')
});


document.getElementById("fecha").addEventListener("change", () => {
  if (document.getElementById("fecha_fin").value != "") {
    validarFechas();
  }
});

document.getElementById("fecha_fin").addEventListener("change", () => {
  if (document.getElementById("fecha").value != "") {
    validarFechas();
  }
});

$.post("./api/default-select/mostrarEmpresas.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
  document.getElementById("filtroEmpresa").innerHTML = data;
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

document.getElementById("filtroEmpresa").addEventListener("change", () => {
  let empresa = document.getElementById("filtroEmpresa").value;
  $.post(
    "./api/default-select/mostrarTrabajadores.php",
    {
      empresa: empresa,
    },
    (data, status) => {
      mostrar(0);
      document.getElementById("filtroTrabajador").innerHTML = data;
      document.getElementById("filtroTrabajador").removeAttribute("disabled");
    }
  );
});

document.getElementById("filtroTrabajador").addEventListener("change", ()=>{
  let trabajador = document.getElementById("filtroTrabajador").value;
  mostrar(trabajador);
})

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
