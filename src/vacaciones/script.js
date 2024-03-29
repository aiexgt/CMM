const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
const btnVer = document.getElementById("verComprobante");
const btnGenerarG = document.getElementById("generarComprobanteG");
const btnVerG = document.getElementById("verComprobanteG");
const btnGenerarReporte = document.getElementById("btn-generarReporte");
let id_cambio;

const mostrar = (trabajador) => {
  $.post("./api/vacaciones/mostrarVacaciones.php", {trabajador}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};

const guardar = () => {
  let fechat = document.getElementById("fecha-temp").value;
  let trabajador = document.getElementById("trabajador").value;
  let fecha = document.getElementById("fecha").value;
  let cantidad = parseInt(document.getElementById("cantidad").value);
  let disponibles = parseInt(document.getElementById("disponiblespa").value);
  let fecha_fin = document.getElementById("fecha_fin").value;
  let observaciones = document.getElementById("observaciones").value;
  let periodo = document.getElementById("periodo").value;
  if (trabajador == 0) {
    errorDF("Trabajador");
  } else if (fechat == "") {
    errorDF("Fecha");
  } else if (fecha == "") {
    errorDF("Fecha");
  } else if (cantidad <= 0) {
    errorDF("Cantidad Valida");
  } else if (disponibles - cantidad < 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Días Insuficientes`,
    });
  } else {
    $.post(
      "./api/vacaciones/guardarVacacion.php",
      {
        trabajador,
        fecha,
        cantidad,
        fecha_fin,
        observaciones,
        disponibles,
        periodo,
        fechat,
        id: sessionStorage.getItem("id"),
      },
      (data, statur) => {
        if (data == "1") {
          if ($("#image").val() != "") {
            let formData = new FormData();
            let files = $("#image")[0].files[0];
            formData.append("file", files);
            $.ajax({
              url: "./api/vacaciones/guardarDocumentoS.php",
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
          } else {
            $.post(
              "./api/vacaciones/generarDocumentoS.php",
              {
                trabajador,
                fecha,
                fecha_fin,
                cantidad,
                periodo,
                fechat,
              },
              (data, status) => {}
            );
          }
          $("#exampleModal").modal("hide");
          Swal.fire(
            "Excelente!",
            "El registro de vacaciones se ha añadido!",
            "success"
          );
          limpiarCampos();
          mostrar();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha Ocurrido un error!",
          });
        }
      }
    );
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
  document.getElementById("disponiblespa").value = 0;
  document.getElementById("acumulados").value = 0;
  document.getElementById("ocupadas").value = 0;
  document.getElementById("periodo").value = "";
  document.getElementById("saldo").value = 0;
};

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  $.post(
    "./api/vacaciones/buscarDetalles.php",
    {
      id: id,
    },
    function (data, status) {
      var unit = JSON.parse(data);
      id_cambio = unit.id;
      document.getElementById("utrabajador").value = document.querySelector(
        `.persona${codigo}`
      ).textContent;
      document
        .getElementById("utrabajador")
        .setAttribute("disabled", "disabled");
      document.getElementById("ufecha").value = unit.fecha_inicio;
      document.getElementById("ufecha").setAttribute("disabled", "disabled");
      document.getElementById("ucantidad").value = unit.cantidad;
      document.getElementById("ucantidad").setAttribute("disabled", "disabled");
      document.getElementById("ufecha_fin").value = unit.fecha_fin;
      document
        .getElementById("ufecha_fin")
        .setAttribute("disabled", "disabled");
      document.getElementById("uobservaciones").value = unit.observaciones;
      document
        .getElementById("uobservaciones")
        .setAttribute("disabled", "disabled");
      document.getElementById("ufechah").value = unit.fecha;
      document.getElementById("ufechah").setAttribute("disabled", "disabled");
      document.getElementById("uperiodo").value = unit.periodo;
      document.getElementById("uperiodo").setAttribute("disabled", "disabled");
      document.getElementById("uimage").setAttribute("disabled", "disabled");
      document.getElementById("uimageg").setAttribute("disabled", "disabled");

      $.post(
        "./api/funciones/verificarDocumento.php",
        {
          ruta: `doc-vacacionesg/${id}.pdf`,
        },
        (data, status) => {
          if (data == "1") {
            document
              .getElementById("generarComprobanteG")
              .setAttribute("hidden", "hidden");
            document
              .getElementById("verComprobanteG")
              .removeAttribute("hidden", "hidden");
          } else {
            document
              .getElementById("generarComprobanteG")
              .removeAttribute("hidden", "hidden");
            document
              .getElementById("verComprobanteG")
              .setAttribute("hidden", "hidden");
          }
        }
      );

      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    }
  );
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
  document
    .getElementById("uobservaciones")
    .removeAttribute("disabled", "disabled");
  document.getElementById("uimage").removeAttribute("disabled", "disabled");
  document.getElementById("uimageg").removeAttribute("disabled", "disabled");
  btnEditar.setAttribute("hidden", "hidden");
  btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let trabajador = document.getElementById("utrabajador").value;
  let fecha = document.getElementById("ufecha").value;
  let cantidad = document.getElementById("ucantidad").value;
  let fecha_fin = document.getElementById("ufecha_fin").value;
  let observaciones = document.getElementById("uobservaciones").value;
  if (trabajador == 0) {
    errorDF("Trabajador");
  } else if (fecha == "") {
    errorDF("Fecha");
  } else {
    $.post(
      "./api/vacaciones/actualizarVacacion.php",
      {
        trabajador: trabajador,
        fecha: fecha,
        cantidad: cantidad,
        fecha_fin: fecha_fin,
        observaciones: observaciones,
        id: id_cambio,
      },
      (data, status) => {
        if (data == "1") {
          if ($("#uimage").val() != "") {
            let formData = new FormData();
            let files = $("#uimage")[0].files[0];
            formData.append("file", files);
            formData.append("id", id_cambio);
            $.ajax({
              url: "./api/vacaciones/actualizarImagen.php",
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
          if ($("#uimageg").val() != "") {
            let formData = new FormData();
            let files = $("#uimageg")[0].files[0];
            formData.append("file", files);
            formData.append("id", id_cambio);
            $.ajax({
              url: "./api/vacaciones/actualizarImagenG.php",
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

          Swal.fire(
            "Excelente!",
            "El registro ha sido actualizado!",
            "success"
          );
          $("#exampleModala").modal("hide");
          mostrar();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha Ocurrido un error!",
          });
        }
      }
    );
  }
};

const calculardiasDiscount = (fecha_inicio) => {
  var timeStart = new Date(fecha_inicio);

  var actualDate = new Date();
  if (actualDate > timeStart) {
    var diff = actualDate.getTime() - timeStart.getTime();
    let dias_calculados = Math.round(diff / (1000 * 60 * 60 * 24)) - 1;
    return dias_calculados;
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
        "./api/vacaciones/eliminarVacacion.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data.endsWith("1")) {
            Swal.fire(
              "Eliminado!",
              "El registro ha sido eliminada.",
              "success"
            );
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

const generarG = () => {
  $.post(
    "./api/vacaciones/buscarDetalles.php",
    {
      id: id_cambio,
    },
    function (data, status) {
      var unit = JSON.parse(data);
      $.post(
        "./api/vacaciones/generarDocumentoG.php",
        {
          id: id_cambio,
          trabajador: unit.persona_id,
          fecha: unit.fecha_inicio,
          fecha_fin: unit.fecha_fin,
          cantidad: unit.cantidad,
          periodo: unit.periodo,
          fechat: unit.fecha,
        },
        (data, status) => {
          document
            .getElementById("generarComprobanteG")
            .setAttribute("hidden", "hidden");
          document
            .getElementById("verComprobanteG")
            .removeAttribute("hidden", "hidden");
        }
      );
    }
  );
};

btnNuevo.addEventListener("click", () => {
  limpiarCampos();
});

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
  window.open(`img/doc-vacaciones/${id_cambio}.pdf`, "_blank");
});

btnVerG.addEventListener("click", () => {
  window.open(`img/doc-vacacionesg/${id_cambio}.pdf`, "_blank");
});

btnGenerarG.addEventListener("click", () => {
  generarG();
});

document.getElementById("trabajador").addEventListener("change", () => {
  let trabajador = document.getElementById("trabajador").value;
  $.post(
    "./api/vacaciones/consultarVacaciones.php",
    {
      id: trabajador,
    },
    (data, status) => {
      var unit = JSON.parse(data);
      let dias = parseInt(calculardiasDiscount(unit.fecha_inicio)); //Dias laborados
      let ocupadas = parseInt(unit.vacaciones_ocupadas); //Dias ocupados

      let fecha = new Date(unit.fecha_inicio);
      fecha = fecha.setDate(fecha.getDate() + 1);
      fecha = new Date(fecha);
      fecha = fecha.getFullYear();
      while (ocupadas >= 15) {
        ocupadas -= 15;
        fecha++;
      }
      let dias_disponibles = 0;
      while (dias > 365) {
        dias_disponibles += 15;
        dias -= 365;
      }
      let acu = parseFloat(((15 / 365) * dias).toFixed(2));
      let dis = parseFloat(
        dias_disponibles - parseInt(unit.vacaciones_ocupadas)
      );
      let dpa = 0;
      document.getElementById("ocupadas").value = unit.vacaciones_ocupadas;
      if (dis < 0) {
        dpa = 15 + dis;
      } else {
        dpa = 15 - ocupadas;
      }
      document.getElementById("disponiblespa").value = dpa;
      document.getElementById("periodo").value = fecha + "-" + (fecha + 1);
      document.getElementById("acumulados").value = acu;
      document.getElementById("disponibles").value = dis;
      document.getElementById("saldo").value = (acu + dis).toFixed(2);
    }
  );
});

document.getElementById("empresa").addEventListener("change", () => {
  let empresa = document.getElementById("empresa").value;
  $.post(
    "./api/default-select/mostrarTrabajadores.php",
    {
      empresa: empresa,
    },
    (data, status) => {
      document.getElementById("trabajador").innerHTML = data;
      document.getElementById("trabajador").removeAttribute("disabled");
    }
  );
});

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
  document.getElementById("empresaReporte").innerHTML = data;
});

document.getElementById("filtroTrabajador").addEventListener("change", ()=>{
    let trabajador = document.getElementById("filtroTrabajador").value;
    mostrar(trabajador);
})


btnGenerarReporte.addEventListener("click", ()=>{
  const empresa = document.getElementById("empresaReporte").value;
  const fecha = document.getElementById("fechaReporte").value;
  if(empresa > 0 && fecha != ""){
    $.post('./api/vacaciones/generarReporte.php', {
      empresa,
      fecha
    }, (data, status) => {
        window.open(`img/doc-vacacionesGen/reporte.pdf`, "_blank");
    })
  }
})

$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
