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

let selectPais = document.getElementById("pais");
let selectDepartamento = document.getElementById("departamento");
let selectMunicipio = document.getElementById("municipio");

let uselectPais = document.getElementById("upais");
let uselectDepartamento = document.getElementById("udepartamento");
let uselectMunicipio = document.getElementById("umunicipio");
let busqueda = document.getElementById("busqueda");
let codigo_anterior;

const mostrar = () => {
  $.post("backend/ajax/empresas/mostrarEmpresas.php", {}, (data, status) => {
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
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let nit = document.getElementById("nit").value;
  let pais = selectPais.value;
  let departamento = selectDepartamento.value;
  let municipio = selectMunicipio.value;
  let direccion = document.getElementById("direccion").value;
  let codigo_postal = document.getElementById("codigo_postal").value;
  let pagina_web = document.getElementById("pagina_web").value;
  let email_principal = document.getElementById("email_principal").value;
  let email_secundario = document.getElementById("email_secundario").value;
  let telefono = document.getElementById("telefono").value;
  let celular = document.getElementById("celular").value;
  let usuario_id = sessionStorage.getItem("id");

  if (codigo == "") {
    errorDF("Código");
  } else if (nombre == "") {
    errorDF("Nombre");
  } else if (nit == "") {
    errorDF("NIT");
  } else if (pais == 0) {
    errorDF("País");
  } else if (departamento == 0) {
    errorDF("Departamento");
  } else if (municipio == 0) {
    errorDF("Municipio");
  } else if (direccion == "") {
    errorDF("Dirección");
  } else if (email_principal == "") {
    errorDF("Email Principal");
  } else if (email_principal.indexOf("@") == -1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Email Principal Incorrecto`,
    });
  } else if (telefono == "") {
    errorDF("Teléfono");
  } else {
    $.post(
      "backend/ajax/empresas/guardarEmpresa.php",
      {
        codigo: codigo,
        nombre: nombre,
        nit: nit,
        pais: pais,
        departamento: departamento,
        municipio: municipio,
        direccion: direccion,
        codigo_postal: codigo_postal,
        pagina_web: pagina_web,
        email_principal: email_principal,
        email_secundario: email_secundario,
        telefono: telefono,
        celular: celular,
        usuario_id: usuario_id,
      },
      (data, status) => {
        if (data == "1") {
          let formData = new FormData();
          if ($("#image").val() != "") {
            let files = $("#image")[0].files[0];
            formData.append("file", files);
            formData.append("codigo", codigo);

            $.ajax({
              url: "backend/ajax/empresas/guardarImagen.php",
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
          Swal.fire("Excelente!", "La empresa se ha añadido!", "success");
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
  }
};

const limpiarCampos = () => {
  document.getElementById("codigo").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("nit").value = "";
  document.getElementById("pais").value = 0;
  document.getElementById("departamento").value = 0;
  document.getElementById("municipio").value = 0;
  document.getElementById("direccion").value = "";
  document.getElementById("codigo_postal").value = "";
  document.getElementById("pagina_web").value = "";
  document.getElementById("image").value = "";
  document.getElementById("email_principal").value = "";
  document.getElementById("email_secundario").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("celular").value = "";
};

const ver = (codigo) => {
  let id = document.querySelector(`.id${codigo}`).textContent;
  $.post(
    "backend/ajax/empresas/buscarDetalles.php",
    {
      id: id,
    },
    function (data, status) {
      var unit = JSON.parse(data);

      codigo_anterior = unit.id;

      document.getElementById("ucodigo").setAttribute("disabled", "disabled");
      document.getElementById("ucodigo").value = unit.codigo;
      document.getElementById("unombre").setAttribute("disabled", "disabled");
      document.getElementById("unombre").value = unit.nombre;
      document.getElementById("unit").setAttribute("disabled", "disabled");
      document.getElementById("unit").value = unit.nit;
      document.getElementById("upais").setAttribute("disabled", "disabled");
      document
        .getElementById("udepartamento")
        .setAttribute("disabled", "disabled");
      document
        .getElementById("umunicipio")
        .setAttribute("disabled", "disabled");

      $.post("backend/ajax/empresas/mostrarPaises.php", {}, (data, status) => {
        document.getElementById("upais").innerHTML = data;
        document.getElementById("upais").value = unit.pais_id;
      });
      $.post(
        "backend/ajax/empresas/mostrarDepartamentos.php",
        {
          pais: unit.pais_id,
        },
        (data, status) => {
          document.getElementById("udepartamento").innerHTML = data;
          document.getElementById("udepartamento").value = unit.departamento_id;
        }
      );
      $.post(
        "backend/ajax/empresas/mostrarMunicipios.php",
        {
          departamento: unit.departamento_id,
        },
        (data, status) => {
          document.getElementById("umunicipio").innerHTML = data;
          document.getElementById("umunicipio").value = unit.municipio_id;
        }
      );

      document
        .getElementById("udireccion")
        .setAttribute("disabled", "disabled");
      document.getElementById("udireccion").value = unit.direccion;
      document
        .getElementById("ucodigo_postal")
        .setAttribute("disabled", "disabled");
      document.getElementById("ucodigo_postal").value = unit.codigo_postal;
      document
        .getElementById("upagina_web")
        .setAttribute("disabled", "disabled");
      document.getElementById("upagina_web").value = unit.pagina_web;
      document
        .getElementById("uemail_principal")
        .setAttribute("disabled", "disabled");
      document.getElementById("uemail_principal").value = unit.email_principal;
      document
        .getElementById("uemail_secundario")
        .setAttribute("disabled", "disabled");
      document.getElementById("uemail_secundario").value =
        unit.email_secundario;
      document.getElementById("utelefono").setAttribute("disabled", "disabled");
      document.getElementById("utelefono").value = unit.telefono;
      document.getElementById("ucelular").setAttribute("disabled", "disabled");
      document.getElementById("ucelular").value = unit.celular;
      document.getElementById("uimage").setAttribute("disabled", "disabled");
      document
        .getElementById("uimagen")
        .setAttribute("src", "img/logo-empresas/" + unit.id + ".jpg");
      document.getElementById("uestado").setAttribute("disabled", "disabled");
      document.getElementById("uestado").value = unit.estado;
      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    }
  );
  $("#exampleModala").modal("show");
  mostrar();
};

const quitarDisabled = () => {
  document.getElementById("ucodigo").removeAttribute("disabled");
  document.getElementById("unombre").removeAttribute("disabled");
  document.getElementById("unit").removeAttribute("disabled");
  document.getElementById("upais").removeAttribute("disabled");
  document.getElementById("udepartamento").removeAttribute("disabled");
  document.getElementById("umunicipio").removeAttribute("disabled");
  document.getElementById("udireccion").removeAttribute("disabled");
  document.getElementById("ucodigo_postal").removeAttribute("disabled");
  document.getElementById("umunicipio").removeAttribute("disabled");
  document.getElementById("udireccion").removeAttribute("disabled");
  document.getElementById("upagina_web").removeAttribute("disabled");
  document.getElementById("uimage").removeAttribute("disabled");
  document.getElementById("uemail_principal").removeAttribute("disabled");
  document.getElementById("uemail_secundario").removeAttribute("disabled");
  document.getElementById("utelefono").removeAttribute("disabled");
  document.getElementById("ucelular").removeAttribute("disabled");
  document.getElementById("uestado").removeAttribute("disabled");
  btnEditar.setAttribute("hidden", "hidden");
  btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let codigo = document.getElementById("ucodigo").value;
  let nombre = document.getElementById("unombre").value;
  let nit = document.getElementById("unit").value;
  let pais = document.getElementById("upais").value;
  let departamento = document.getElementById("udepartamento").value;
  let municipio = document.getElementById("umunicipio").value;
  let direccion = document.getElementById("udireccion").value;
  let codigo_postal = document.getElementById("ucodigo_postal").value;
  let pagina_web = document.getElementById("upagina_web").value;
  let email_principal = document.getElementById("uemail_principal").value;
  let email_secundario = document.getElementById("uemail_secundario").value;
  let telefono = document.getElementById("utelefono").value;
  let celular = document.getElementById("ucelular").value;
  let usuario_id = sessionStorage.getItem("id");
  let estado = document.getElementById("uestado").value;
  if (codigo == "") {
    errorDF("Código");
  } else if (nombre == "") {
    errorDF("Nombre");
  } else if (nit == "") {
    errorDF("NIT");
  } else if (pais == 0) {
    errorDF("País");
  } else if (departamento == 0) {
    errorDF("Departamento");
  } else if (municipio == 0) {
    errorDF("Municipio");
  } else if (direccion == "") {
    errorDF("Dirección");
  } else if (email_principal == "") {
    errorDF("Email Principal");
  } else if (email_principal.indexOf("@") == -1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Email Principal Incorrecto`,
    });
  } else if (telefono == "") {
    errorDF("Teléfono");
  } else {
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
          "backend/ajax/empresas/actualizarEmpresa.php",
          {
            codigo_anterior: codigo_anterior,
            codigo: codigo,
            nombre: nombre,
            nit: nit,
            pais: pais,
            departamento: departamento,
            municipio: municipio,
            direccion: direccion,
            codigo_postal: codigo_postal,
            pagina_web: pagina_web,
            email_principal: email_principal,
            email_secundario: email_secundario,
            telefono: telefono,
            celular: celular,
            usuario_id: usuario_id,
            estado: estado,
          },
          (data, status) => {
            if (data == "1") {
              if ($("#uimage").val() != "") {
                let formData = new FormData();

                let files = $("#uimage")[0].files[0];
                formData.append("file", files);
                formData.append("codigo", codigo);

                $.ajax({
                  url: "backend/ajax/empresas/actualizarImagen.php",
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

              Swal.fire("Excelente!", "La empresa se ha actualizado!", "success");
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
  let ucodigo = document.querySelector(`.codigo${codigo}`).textContent;
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
        "backend/ajax/empresas/eliminarEmpresa.php",
        {
          codigo: ucodigo,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "La empresa ha sido eliminada.", "success");
            mostrar();
          } else {
            Swal.fire("Error!", "No se puede eliminar empresa.", "error");
          }
        }
      );
    }
  });
};

btnActualizar.addEventListener("click", () => {
  actualizar();
});

btnEditar.addEventListener("click", () => {
  quitarDisabled();
});

btnGuardar.addEventListener("click", () => {
  guardar();
});

btnNuevo.addEventListener("click", () => {
  limpiarCampos();
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
    "backend/ajax/empresas/buscarEmpresa.php",
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
});
