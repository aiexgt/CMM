const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardar = document.getElementById("btn-guardar");
const btnEditar = document.getElementById("btn-editar");
const btnActualizar = document.getElementById("btn-actualizar");
const btnVer = document.getElementById("verComprobante");
let busqueda = document.getElementById("busqueda");
let id_cambio;

const mostrar = () => {
  $.post("./api/feriados/mostrarFeriados.php", {}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};

const guardar = () => {
  
  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("descripcion").value;
  let fecha = document.getElementById("fecha").value;
  if(nombre == 0){
    errorDF("Nombre");
  }else if(fecha == ""){
    errorDF("Fecha");
  }else{
    $.post("./api/feriados/guardarFeriado.php",{
      nombre,
      fecha,
      descripcion
    }, (data, statur) => {
      if (data == "1") {
        $("#exampleModal").modal("hide");
        Swal.fire("Excelente!", "El feriado ha sido guardado!", "success");
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
    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("descripcion").value = "";
};

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  $.post(
    "./api/feriados/buscarDetalles.php",
    {
      id: id,
    },
    function (data, status) {
      var unit = JSON.parse(data);
      id_cambio = unit.id;
      document.getElementById("unombre").value = unit.nombre;
      document.getElementById("unombre").setAttribute("disabled","disabled");
      document.getElementById("ufecha").value = unit.fecha;
      document.getElementById("ufecha").setAttribute("disabled","disabled");
      document.getElementById("udescripcion").value = unit.descripcion;
      document.getElementById("udescripcion").setAttribute("disabled","disabled");
      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.getElementById("unombre").removeAttribute("disabled","disabled");
    document.getElementById("ufecha").removeAttribute("disabled","disabled");
    document.getElementById("udescripcion").removeAttribute("disabled","disabled");
    btnEditar.setAttribute("hidden", "hidden");
    btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let nombre = document.getElementById("unombre").value;
  let descripcion = document.getElementById("udescripcion").value;
  let fecha = document.getElementById("ufecha").value;
  if(nombre == 0){
    errorDF("Nombre");
  }else if(fecha == ""){
    errorDF("Fecha");
  }else{
    $.post("./api/feriados/actualizarFeriado.php",{
      nombre,
      fecha,
      descripcion,
      id: id_cambio
    }, (data, status) => {
      if (data == "1") {
        Swal.fire("Excelente!", "El feriado se ha actualizado!", "success");
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
        "./api/feriados/eliminarFeriado.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "El feriado ha sido eliminado.", "success");
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


busqueda.addEventListener("change", () => {
  $.post(
    "./api/feriados/buscarFeriado.php",
    {
      busqueda: busqueda.value,
    },
    (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    }
  );
});


$(document).ready(() => {
  mostrar();
  limpiarCampos();
});
