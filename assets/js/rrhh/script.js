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
let id_cambio;
let bempresa = document.querySelector("#bempresa");
let bpuesto = document.querySelector("#bpuesto");
let busqueda = document.querySelector("#busqueda");


//* Funciones

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

};

const limpiarCamposN = () => {

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
};

const sumarMeses = () => {
  var d = new Date(document.querySelector("#ufecha_inicio").value);
  let dia = d.getDate()+1;
  let mes = d.getMonth()+3;
  let anio = d.getFullYear();
  if(mes > 12){
    anio++;
    mes = mes - 12;
  }
  if(mes < 10){
    mes = "0" + mes;
  }
  if(dia < 10){
    dia = "0" + dia;
  }
  let strDate = anio + "-" + mes + "-" + dia;
  document.getElementById("uperiodo_prueba").value = strDate;

};

const calcularEsp = (cantidad) => {
  let anios = 0;
  let meses = 0;
  while(cantidad > 365){
      anios ++;
      cantidad -= 365;
  }
  while(cantidad > 30){
      meses ++;
      cantidad -= 30;
  }
  let texto = "";

  if(anios == 1){
    texto += "1 año";
  }else if(anios > 1){
    texto += anios + " años";
  }

  if(meses == 1){
    texto += " 1 mes";
  }else if(meses > 1){
    texto += " " + meses + " meses";
  }

  if(cantidad == 1){
    texto += " 1 día";
  }else if(cantidad > 1){
    texto += " " + cantidad + " días";
  }

  document.getElementById("tiempo").textContent = texto;
}

const ver = (codigo) => {
  
};

const quitarDisabled = () => {

};

const actualizar = () => {
  
};

const eliminar = (codigo) => {

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
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "e"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      empresa: bempresa.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "p"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "te"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      empresa: bempresa.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "tp"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "ep"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      empresa: bempresa.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.querySelector("#tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "tep"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
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

$.post("backend/ajax/trabajadores/mostrarPuestos.php", {}, (data, status) => {
  document.querySelector("#bpuesto").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEmpresa.php", {}, (data, status) => {
  document.querySelector("#bempresa").innerHTML = data;
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
