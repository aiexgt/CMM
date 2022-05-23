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
let id_cambio;

let bempresa = document.querySelector("#bempresa");
let bpuesto = document.querySelector("#bpuesto");
let busqueda = document.querySelector("#busqueda");


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
  let id = document.querySelector(`.id${codigo}`).textContent;
  id_cambio = id;
  $.post(
    "backend/ajax/documentos/buscarDetalles.php",
    {
      id:id
    },
    function (data, status) {
      var unit = JSON.parse(data);

    })
  $("#exampleModala").modal("show");
};


const actualizar = () => {
  
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
