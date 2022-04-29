const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");
let busqueda = document.querySelector("#busqueda");
let id_cambio;

let selectPais = document.querySelector("#pais");
let selectDepartamento = document.querySelector("#departamento");
let selectMunicipio = document.querySelector("#municipio");
let uselectPais = document.querySelector("#upais");
let uselectDepartamento = document.querySelector("#udepartamento");
let uselectMunicipio = document.querySelector("#umunicipio");

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
  let empresa = document.querySelector("#empresa").value;

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
  }else if(empresa == 0){
    errorDF("Empresa");
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
      empresa: empresa,
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

const limpiarCamposN = () => {
  document.querySelector("#cui").value = "";
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#estado_civil").value = 0;
  document.querySelector("#fecha_nacimiento").value = "2002-01-01";
  document.querySelector("#fecha_inicio").value = "";
  document.querySelector("#fecha_igss").value = "";
  document.querySelector("#numero_igss").value = "";
  document.querySelector("#puesto").value = 0;
  document.querySelector("#telefono").value = "";
  document.querySelector("#celular").value = "";
  document.querySelector("#correo").value = "";
  document.querySelector("#pais").value = 0;
  document.querySelector("#departamento").value = 0;
  document.querySelector("#municipio").value = 0;
  document.querySelector("#salario").value = "";
  document.querySelector("#direccion").value = "";
  document.querySelector("#estado_laboral").value = 0;
  document.querySelector("#empresa").value = 0;
};


const calculardiasDiscount = () => {
  var timeStart = new Date(document.getElementById("ufecha_inicio").value);
  if((document.getElementById("ufecha_finalizacion").value) != ""){
    var timeEnd = new Date(document.getElementById("ufecha_finalizacion").value);
    if (timeEnd > timeStart)
    {
        var diff = timeEnd.getTime() - timeStart.getTime();
        document.getElementById("udias_laborados").value = Math.round(diff / (1000 * 60 * 60 * 24)) -1;
    }
  }else{
    var actualDate = new Date();
    if (actualDate > timeStart)
    {
        var diff = actualDate.getTime() - timeStart.getTime();
        document.getElementById("udias_laborados").value = Math.round(diff / (1000 * 60 * 60 * 24)) -1;
    }
  }
}

const sumarMeses = () => {
  var d = new Date(document.querySelector("#ufecha_inicio").value);
  var strDate = d.getFullYear() + "-";
  if(d.getMonth() <= 7){
    strDate += "0" + (d.getMonth()+3) + "-";
  }else{
    strDate += (d.getMonth()+3) + "-";
  }
  if(d.getDate() <= 9){
    strDate += "0" + (d.getDate());
  }else{
    strDate += d.getDate();
  }
  document.getElementById("uperiodo_prueba").value = strDate;

}

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "backend/ajax/trabajadores/buscarDetalles.php",
    {
      id:id
    },
    function (data, status) {
      var unit = JSON.parse(data);
      document.querySelector("#ucui").value = unit.cui;
      document.querySelector("#ucui").setAttribute("disabled","disabled");
      document.querySelector("#unombre").value = unit.nombre;
      document.querySelector("#unombre").setAttribute("disabled","disabled");
      document.querySelector("#uapellido").value = unit.apellido;
      document.querySelector("#uapellido").setAttribute("disabled","disabled");
      document.querySelector("#uestado_civil").value = unit.estado_civil_id;
      document.querySelector("#uestado_civil").setAttribute("disabled","disabled");
      document.querySelector("#ufecha_nacimiento").value = unit.fecha_nacimiento;
      document.querySelector("#ufecha_nacimiento").setAttribute("disabled","disabled");
      document.querySelector("#ufecha_inicio").value = unit.fecha_inicio;
      document.querySelector("#ufecha_inicio").setAttribute("disabled","disabled");
      document.querySelector("#ufecha_igss").value = unit.fecha_igss;
      document.querySelector("#ufecha_igss").setAttribute("disabled","disabled");
      document.querySelector("#unumero_igss").value = unit.numero_igss;
      document.querySelector("#unumero_igss").setAttribute("disabled","disabled");
      document.querySelector("#upuesto").value = unit.puesto_id;
      document.querySelector("#upuesto").setAttribute("disabled","disabled");
      document.querySelector("#utelefono").value = unit.telefono;
      document.querySelector("#utelefono").setAttribute("disabled","disabled");
      document.querySelector("#ucelular").value = unit.celular;
      document.querySelector("#ucelular").setAttribute("disabled","disabled");
      document.querySelector("#ucorreo").value = unit.correo;
      document.querySelector("#ucorreo").setAttribute("disabled","disabled");
      document.querySelector("#upais").value = unit.pais_id;
      document.querySelector("#upais").setAttribute("disabled","disabled");
      document.querySelector("#udepartamento").value = unit.departamento_id;
      document.querySelector("#udepartamento").setAttribute("disabled","disabled");
      document.querySelector("#umunicipio").value = unit.municipio_id;
      document.querySelector("#umunicipio").setAttribute("disabled","disabled");
      document.querySelector("#usalario").value = unit.salario;
      document.querySelector("#usalario").setAttribute("disabled","disabled");
      document.querySelector("#udireccion").value = unit.direccion;
      document.querySelector("#udireccion").setAttribute("disabled","disabled");
      document.querySelector("#uestado_laboral").value = unit.estado_trabajo_id;
      document.querySelector("#uestado_laboral").setAttribute("disabled","disabled");
      document.querySelector("#uempresa").value = unit.empresa_id;
      document.querySelector("#uempresa").setAttribute("disabled","disabled");
      document.querySelector("#udias_laborados").setAttribute("disabled","disabled");
      document.querySelector("#uperiodo_prueba").setAttribute("disabled","disabled");
      document.querySelector("#ufecha_finalizacion").value = unit.fecha_finalizacion;
      document.querySelector("#ufecha_finalizacion").setAttribute("disabled","disabled");

      $.post("backend/ajax/trabajadores/mostrarPaises.php", {}, (data, status) => {
        document.querySelector("#upais").innerHTML = data;
        document.querySelector("#upais").value = unit.pais_id;
      });
      $.post(
        "backend/ajax/trabajadores/mostrarDepartamentos.php",
        {
          pais: unit.pais_id,
        },
        (data, status) => {
          document.querySelector("#udepartamento").innerHTML = data;
          document.querySelector("#udepartamento").value = unit.departamento_id;
        }
      );
      $.post(
        "backend/ajax/trabajadores/mostrarMunicipios.php",
        {
          departamento: unit.departamento_id,
        },
        (data, status) => {
          document.querySelector("#umunicipio").innerHTML = data;
          document.querySelector("#umunicipio").value = unit.municipio_id;
        }
      );

      calculardiasDiscount();
      sumarMeses();

      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");

      $.post("backend/ajax/trabajadores/actualizarPeriodos.php", {
        prueba : document.querySelector("#uperiodo_prueba").value,
        cantidad : document.querySelector("#udias_laborados").value,
        id: unit.id
      }, (data, status) => {})

    })
  $("#exampleModala").modal("show");
};

const quitarDisabled = () => {
    document.querySelector("#ucui").removeAttribute("disabled");
    document.querySelector("#unombre").removeAttribute("disabled");
    document.querySelector("#uapellido").removeAttribute("disabled");
    document.querySelector("#uestado_civil").removeAttribute("disabled");
    document.querySelector("#ufecha_nacimiento").removeAttribute("disabled");
    document.querySelector("#ufecha_inicio").removeAttribute("disabled");
    document.querySelector("#ufecha_finalizacion").removeAttribute("disabled");
    console.log(document.querySelector("#ufecha_finalizacion"))
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
  limpiarCamposN();
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

$.post("backend/ajax/trabajadores/mostrarEstadoCivil.php", {}, (data, status) => {
  document.querySelector("#estado_civil").innerHTML = data;
  document.querySelector("#uestado_civil").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarPuestos.php", {}, (data, status) => {
  document.querySelector("#puesto").innerHTML = data;
  document.querySelector("#upuesto").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEstadoLaboral.php", {}, (data, status) => {
  document.querySelector("#estado_laboral").innerHTML = data;
  document.querySelector("#uestado_laboral").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEmpresa.php", {}, (data, status) => {
  document.querySelector("#empresa").innerHTML = data;
  document.querySelector("#uempresa").innerHTML = data;
});


$.post("backend/ajax/trabajadores/mostrarPaises.php", {}, (data, status) => {
  selectPais.innerHTML = data;
  selectDepartamento.setAttribute("disabled", "disabled");
  selectDepartamento.value = 0;
  selectMunicipio.setAttribute("disabled", "disabled");
  selectMunicipio.value = 0;
});

selectPais.addEventListener("change", () => {
  $.post(
    "backend/ajax/trabajadores/mostrarDepartamentos.php",
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
    "backend/ajax/trabajadores/mostrarMunicipios.php",
    {
      departamento: selectDepartamento.value,
    },
    (data, status) => {
      selectMunicipio.removeAttribute("disabled");
      selectMunicipio.innerHTML = data;
    }
  );
});

uselectPais.addEventListener("change", () => {
  $.post(
    "backend/ajax/empresas/mostrarDepartamentos.php",
    {
      pais: uselectPais.value,
    },
    (data, status) => {
      uselectDepartamento.removeAttribute("disabled");
      uselectDepartamento.innerHTML = data;
      uselectMunicipio.setAttribute("disabled", "disabled");
      uselectMunicipio.value = 0;
    }
  );
});

uselectDepartamento.addEventListener("change", () => {
  $.post(
    "backend/ajax/empresas/mostrarMunicipios.php",
    {
      departamento: uselectDepartamento.value,
    },
    (data, status) => {
      uselectMunicipio.removeAttribute("disabled");
      uselectMunicipio.innerHTML = data;
    }
  );
});

busqueda.addEventListener("keyup", () => {
  $.post(
    "backend/ajax/trabajadores/buscarTrabajador.php",
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
  limpiarCamposN();
});
