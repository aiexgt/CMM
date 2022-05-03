const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");
let busqueda = document.querySelector("#busqueda");
let id_cambio;

const mostrar = () => {
  $.post("backend/ajax/ausencias/mostrarAusencias.php", {}, (data, status) => {
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
  limpiarCampos();
  let trabajador = document.getElementById("trabajador").value;
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
      trabajador: trabajador,
      fecha: fecha,
      cantidad: cantidad,
      fecha_fin: fecha_fin,
      asunto: asunto,
      descripcion: descripcion,
      id: localStorage.getItem("id")
    }, (data, statur) => {
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
    document.getElementById("trabajador").value = 0;
    document.getElementById("fecha").value = "";
    document.getElementById("cantidad").value = null;
    document.getElementById("fecha_fin").value = "";
    document.getElementById("asunto").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("image").value = "";
};

const ver = (codigo) => {
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    
  
};

const actualizar = () => {
  
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
        "backend/ajax/roles/eliminarRol.php",
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

$.post("backend/ajax/ausencias/mostrarTrabajadores.php", {}, (data, status) => {
  document.querySelector("#trabajador").innerHTML = data;
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

document.getElementById("cantidad").addEventListener('keyup',() => {

    var d = new Date(document.querySelector("#fecha").value);
    var strDate = d.getFullYear() + "-";
    if(d.getMonth() <= 9){
      strDate += "0" + (d.getMonth()+1) + "-";
    }else{
      strDate += (d.getMonth()+1) + "-";
    }
    if(document.getElementById("cantidad") <= 9){
      strDate += "0" + (d.getDate() + parseInt(document.getElementById("cantidad").value));
    }else{
      strDate += (d.getDate() + parseInt(document.getElementById("cantidad").value));
    }
    document.getElementById("fecha_fin").value = strDate;
    console.log(strDate)
  
})

busqueda.addEventListener("keyup", () => {
  $.post(
    "backend/ajax/ausencias/buscarAusencias.php",
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
