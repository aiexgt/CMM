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
const btnActualizar = document.querySelector("#btn-actualizar");

let bempresa = document.querySelector("#bempresa");
let bpuesto = document.querySelector("#bpuesto");
let busqueda = document.querySelector("#busqueda");
let id;

//* Funciones

const mostrar = () => {
  $.post("backend/ajax/documentos/mostrarTrabajadores.php", {}, (data, status) => {
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

const ver = (codigo) => {
  id = document.querySelector(`.id${codigo}`).textContent;
  $("#exampleModala").modal("show");
};


const actualizar = () => {
  let estado = 1;
  if ($("#dpi").val() != "") {
    let formData = new FormData();
    let files = $("#dpi")[0].files[0];
    formData.append("file", files);
    formData.append("id", id);
    $.ajax({
      url: "backend/ajax/documentos/guardarDpi.php",
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
  if ($("#cv").val() != "") {
    let formData = new FormData();
    let files = $("#cv")[0].files[0];
    formData.append("file", files);
    formData.append("id", id);
    $.ajax({
      url: "backend/ajax/documentos/guardarCv.php",
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
  if ($("#apoliciaco").val() != "") {
    let formData = new FormData();
    let files = $("#apoliciaco")[0].files[0];
    formData.append("file", files);
    formData.append("id", id);
    $.ajax({
      url: "backend/ajax/documentos/guardarApoliciaco.php",
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
  if ($("#apenal").val() != "") {
    let formData = new FormData();
    let files = $("#apenal")[0].files[0];
    formData.append("file", files);
    formData.append("id", id);
    $.ajax({
      url: "backend/ajax/documentos/guardarApenal.php",
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
  if ($("#sempleo").val() != "") {
    let formData = new FormData();
    let files = $("#sempleo")[0].files[0];
    formData.append("file", files);
    formData.append("id", id);
    $.ajax({
      url: "backend/ajax/documentos/guardarSempleo.php",
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

  setTimeout(() => {
    if(estado == 1){
      $("#exampleModala").modal("hide");
      Swal.fire("Excelente!", "Los cambios se han guardado!", "success");
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha Ocurrido un error!',
      })
    }
  },2000)
};

const buscar = () => {
  let tipoBusqueda = "";
  if(busqueda.value != ""){
    tipoBusqueda += "t";
  }
  if(bempresa.value != 0){
    tipoBusqueda += "e";
  }
  if(bpuesto.value != 0){
    tipoBusqueda += "p";
  }

  if(tipoBusqueda == "t"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "e"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      empresa: bempresa.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "p"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "te"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      empresa: bempresa.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "tp"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "ep"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      empresa: bempresa.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "tep"){
    $.post("backend/ajax/documentos/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      empresa: bempresa.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else{
    mostrar();
  }

}

$.post("backend/ajax/documentos/mostrarPuestos.php", {}, (data, status) => {
  document.querySelector("#bpuesto").innerHTML = data;
});


$.post("backend/ajax/documentos/mostrarEmpresa.php", {}, (data, status) => {
  document.querySelector("#bempresa").innerHTML = data;
});

document.getElementById("cdpi").addEventListener("click", () => {
  window.open(`img/doc-dpi/${id}.pdf`,'_blank')
});

document.getElementById("ccv").addEventListener("click", () => {
  window.open(`img/doc-cv/${id}.pdf`,'_blank')
});

document.getElementById("capoliciaco").addEventListener("click", () => {
  window.open(`img/doc-apoliciaco/${id}.pdf`,'_blank')
});

document.getElementById("capenal").addEventListener("click", () => {
  window.open(`img/doc-apenal/${id}.pdf`,'_blank')
});

document.getElementById("csempleo").addEventListener("click", () => {
  window.open(`img/doc-sempleo/${id}.pdf`,'_blank')
});


btnActualizar.addEventListener("click", () => {
  actualizar();
});


busqueda.addEventListener("keyup", () => {
  buscar();
});

bempresa.addEventListener("change", () => {
  buscar();
});

bpuesto.addEventListener("change", () => {
  buscar();
});

$(document).ready(() => {
  mostrar();
});
