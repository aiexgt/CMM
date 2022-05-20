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
    document.querySelector("#busuario").innerHTML = usuarioD.toUpperCase();
}

const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");
const btnEditar = document.querySelector("#btn-editar");
const btnActualizar = document.querySelector("#btn-actualizar");

let selectPais = document.querySelector("#pais");
let selectDepartamento = document.querySelector("#departamento");
let selectMunicipio = document.querySelector("#municipio");

let uselectPais = document.querySelector("#upais");
let uselectDepartamento = document.querySelector("#udepartamento");
let uselectMunicipio = document.querySelector("#umunicipio");
let busqueda = document.querySelector("#busqueda");
let codigo_anterior;

const mostrar = () => {
  $.post("backend/ajax/empresas/mostrarEmpresas.php", {}, (data, status) => {
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
  let codigo = document.querySelector("#codigo").value;
  let nombre = document.querySelector("#nombre").value;
  let nit = document.querySelector("#nit").value;
  let pais = selectPais.value;
  let departamento = selectDepartamento.value;
  let municipio = selectMunicipio.value;
  let direccion = document.querySelector("#direccion").value;
  let codigo_postal = document.querySelector("#codigo_postal").value;
  let pagina_web = document.querySelector("#pagina_web").value;
  let email_principal = document.querySelector("#email_principal").value;
  let email_secundario = document.querySelector("#email_secundario").value;
  let telefono = document.querySelector("#telefono").value;
  let celular = document.querySelector("#celular").value;
  let usuario_id = localStorage.getItem("id");

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
  document.querySelector("#codigo").value = "";
  document.querySelector("#nombre").value = "";
  document.querySelector("#nit").value = "";
  document.querySelector("#pais").value = 0;
  document.querySelector("#departamento").value = 0;
  document.querySelector("#municipio").value = 0;
  document.querySelector("#direccion").value = "";
  document.querySelector("#codigo_postal").value = "";
  document.querySelector("#pagina_web").value = "";
  document.querySelector("#image").value = "";
  document.querySelector("#email_principal").value = "";
  document.querySelector("#email_secundario").value = "";
  document.querySelector("#telefono").value = "";
  document.querySelector("#celular").value = "";
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

      document.querySelector("#ucodigo").setAttribute("disabled", "disabled");
      document.querySelector("#ucodigo").value = unit.codigo;
      document.querySelector("#unombre").setAttribute("disabled", "disabled");
      document.querySelector("#unombre").value = unit.nombre;
      document.querySelector("#unit").setAttribute("disabled", "disabled");
      document.querySelector("#unit").value = unit.nit;
      document.querySelector("#upais").setAttribute("disabled", "disabled");
      document
        .querySelector("#udepartamento")
        .setAttribute("disabled", "disabled");
      document
        .querySelector("#umunicipio")
        .setAttribute("disabled", "disabled");

      $.post("backend/ajax/empresas/mostrarPaises.php", {}, (data, status) => {
        document.querySelector("#upais").innerHTML = data;
        document.querySelector("#upais").value = unit.pais_id;
      });
      $.post(
        "backend/ajax/empresas/mostrarDepartamentos.php",
        {
          pais: unit.pais_id,
        },
        (data, status) => {
          document.querySelector("#udepartamento").innerHTML = data;
          document.querySelector("#udepartamento").value = unit.departamento_id;
        }
      );
      $.post(
        "backend/ajax/empresas/mostrarMunicipios.php",
        {
          departamento: unit.departamento_id,
        },
        (data, status) => {
          document.querySelector("#umunicipio").innerHTML = data;
          document.querySelector("#umunicipio").value = unit.municipio_id;
        }
      );

      document
        .querySelector("#udireccion")
        .setAttribute("disabled", "disabled");
      document.querySelector("#udireccion").value = unit.direccion;
      document
        .querySelector("#ucodigo_postal")
        .setAttribute("disabled", "disabled");
      document.querySelector("#ucodigo_postal").value = unit.codigo_postal;
      document
        .querySelector("#upagina_web")
        .setAttribute("disabled", "disabled");
      document.querySelector("#upagina_web").value = unit.pagina_web;
      document
        .querySelector("#uemail_principal")
        .setAttribute("disabled", "disabled");
      document.querySelector("#uemail_principal").value = unit.email_principal;
      document
        .querySelector("#uemail_secundario")
        .setAttribute("disabled", "disabled");
      document.querySelector("#uemail_secundario").value =
        unit.email_secundario;
      document.querySelector("#utelefono").setAttribute("disabled", "disabled");
      document.querySelector("#utelefono").value = unit.telefono;
      document.querySelector("#ucelular").setAttribute("disabled", "disabled");
      document.querySelector("#ucelular").value = unit.celular;
      document.querySelector("#uimage").setAttribute("disabled", "disabled");
      document
        .querySelector("#uimagen")
        .setAttribute("src", "img/logo-empresas/" + unit.id + ".jpg");
      document.querySelector("#uestado").setAttribute("disabled", "disabled");
      document.querySelector("#uestado").value = unit.estado;
      btnActualizar.setAttribute("hidden", "hidden");
      btnEditar.removeAttribute("hidden");
    }
  );
  $("#exampleModala").modal("show");
  mostrar();
};

const quitarDisabled = () => {
  document.querySelector("#ucodigo").removeAttribute("disabled");
  document.querySelector("#unombre").removeAttribute("disabled");
  document.querySelector("#unit").removeAttribute("disabled");
  document.querySelector("#upais").removeAttribute("disabled");
  document.querySelector("#udepartamento").removeAttribute("disabled");
  document.querySelector("#umunicipio").removeAttribute("disabled");
  document.querySelector("#udireccion").removeAttribute("disabled");
  document.querySelector("#ucodigo_postal").removeAttribute("disabled");
  document.querySelector("#umunicipio").removeAttribute("disabled");
  document.querySelector("#udireccion").removeAttribute("disabled");
  document.querySelector("#upagina_web").removeAttribute("disabled");
  document.querySelector("#uimage").removeAttribute("disabled");
  document.querySelector("#uemail_principal").removeAttribute("disabled");
  document.querySelector("#uemail_secundario").removeAttribute("disabled");
  document.querySelector("#utelefono").removeAttribute("disabled");
  document.querySelector("#ucelular").removeAttribute("disabled");
  document.querySelector("#uestado").removeAttribute("disabled");
  btnEditar.setAttribute("hidden", "hidden");
  btnActualizar.removeAttribute("hidden");
};

const actualizar = () => {
  let codigo = document.querySelector("#ucodigo").value;
  let nombre = document.querySelector("#unombre").value;
  let nit = document.querySelector("#unit").value;
  let pais = document.querySelector("#upais").value;
  let departamento = document.querySelector("#udepartamento").value;
  let municipio = document.querySelector("#umunicipio").value;
  let direccion = document.querySelector("#udireccion").value;
  let codigo_postal = document.querySelector("#ucodigo_postal").value;
  let pagina_web = document.querySelector("#upagina_web").value;
  let email_principal = document.querySelector("#uemail_principal").value;
  let email_secundario = document.querySelector("#uemail_secundario").value;
  let telefono = document.querySelector("#utelefono").value;
  let celular = document.querySelector("#ucelular").value;
  let usuario_id = localStorage.getItem("id");
  let estado = document.querySelector("#uestado").value;
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
      document.querySelector("#tabla-contenido").innerHTML = data;
    }
  );
});

$(document).ready(() => {
  mostrar();
});
