const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");
let busqueda = document.querySelector("#busqueda");
let id_cambio;

let selectPais = document.querySelector("#pais");
let selectDepartamento = document.querySelector("#departamento");
let selectMunicipio = document.querySelector("#municipio");

const mostrar = () => {
  $.post("backend/ajax/trabajadores/mostrarTrabajadores.php", {}, (data, status) => {
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
  let cui = document.querySelector("#cui").value;
  let nombre = document.querySelector("#nombre").value;
  let apellido = document.querySelector("#apellido").value;
  let estado_civil = document.querySelector("#estado_civil").value;
  let fecha_nacimiento = document.querySelector("#fecha_nacimiento").value;
  let fecha_inicio = document.querySelector("#fecha_inicio").value;
  let fecha_igss = document.querySelector("#fecha_igss").value;
  let numero_igss = document.querySelector("#numero_igss").value;
  let puesto = document.querySelector("#puesto").value;
  let telefono = document.querySelector("#telefono").value;
  let celular = document.querySelector("#celular").value;
  let correo = document.querySelector("#correo").value;
  let pais = document.querySelector("#pais").value;
  let departamento = document.querySelector("#departamento").value;
  let municipio = document.querySelector("#municipio").value;
  let salario = document.querySelector("#salario").value;
  let direccion = document.querySelector("#direccion").value;
  let estado_laboral = document.querySelector("#estado_laboral").value;

  if(cui == ""){
    errorDF("CUI");
  }else if(nombre == ""){
    errorDF("Nombre");
  }else if(apellido == ""){
    errorDF("Apellido");
  }else if(estado_civil == 0){
    errorDF("Estado Civil");
  }else if(fecha_nacimiento == ""){
    errorDF("Fecha Nacimiento");
  }else if(fecha_inicio == ""){
    errorDF("Fecha Inicio");
  }else if(puesto == 0){
    errorDF("Puesto");
  }else if(telefono == ""){
    errorDF("Teléfono");
  }else if(pais == 0){
    errorDF("País");
  }else if(departamento == 0){
    errorDF("Departamento");
  }else if(municipio == 0){
    errorDF("Municipio");
  }else if(estado_laboral == 0){
    errorDF("Estado Laboral");
  }else{
    $.post("backend/ajax/trabajadores/guardarTrabajador.php", {
      cui: cui,
      nombre: nombre,
      apellido: apellido,
      estado_civil: estado_civil,
      fecha_nacimiento: fecha_nacimiento,
      fecha_inicio: fecha_inicio,
      fecha_igss: fecha_igss,
      numero_igss: numero_igss,
      puesto: puesto,
      telefono: telefono,
      celular: celular,
      correo: correo,
      pais: pais,
      departamento: departamento,
      municipio: municipio,
      salario: salario,
      direccion: direccion,
      estado_laboral: estado_laboral,
      id: localStorage.getItem("id")
    }, (data, status) => {
      if(data == "1"){
        $("#exampleModal").modal("hide");
          Swal.fire("Excelente!", "El trabajador se ha añadido!", "success");
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
};

const ver = (codigo) => {
  limpiarCampos();
  let id = document.querySelector(`.id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "backend/ajax/roles/buscarDetalles.php",
    {
      id:id
    },
    function (data, status) {
      var unit = JSON.parse(data);
      document.querySelector("#unombre").value = unit.nombre;
      document.querySelector("#unombre").setAttribute("disabled","disabled");
      document.querySelector("#udescripcion").value = unit.descripcion;
      document.querySelector("#udescripcion").setAttribute("disabled","disabled");
      document.querySelector("#uestado").value = unit.estado;
      document.querySelector("#uestado").setAttribute("disabled","disabled");
      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");
    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.querySelector("#unombre").removeAttribute("disabled");
    document.querySelector("#udescripcion").removeAttribute("disabled");
    document.querySelector("#uestado").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let nombre = document.querySelector("#unombre").value;
  let descripcion = document.querySelector("#udescripcion").value;
  let estado = document.querySelector("#uestado").value;
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $.post(
          "backend/ajax/roles/actualizarRol.php",
          {
            nombre:nombre,
            descripcion:descripcion,
            estado: estado,
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

$.post("backend/ajax/empresas/mostrarPaises.php", {}, (data, status) => {
  selectPais.innerHTML = data;
  selectDepartamento.setAttribute("disabled", "disabled");
  selectDepartamento.value = 0;
  selectMunicipio.setAttribute("disabled", "disabled");
  selectMunicipio.value = 0;
});

selectPais.addEventListener("change", () => {
  $.post(
    "backend/ajax/empresas/mostrarDepartamentos.php",
    {
      pais: selectPais.value,
    },
    (data, status) => {
      selectDepartamento.removeAttribute("disabled");
      selectDepartamento.innerHTML = data;
      selectMunicipio.setAttribute("disabled", "disabled");
      selectMunicipio.value = 0;
    }
  );
});

selectDepartamento.addEventListener("change", () => {
  $.post(
    "backend/ajax/empresas/mostrarMunicipios.php",
    {
      departamento: selectDepartamento.value,
    },
    (data, status) => {
      selectMunicipio.removeAttribute("disabled");
      selectMunicipio.innerHTML = data;
    }
  );
});

busqueda.addEventListener("keyup", () => {
  $.post(
    "backend/ajax/roles/buscarRol.php",
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
