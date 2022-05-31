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
const btnActualizard = document.querySelector("#btn-actualizard");
let id_cambio;
let selectPais = document.querySelector("#pais");
let selectDepartamento = document.querySelector("#departamento");
let selectMunicipio = document.querySelector("#municipio");
let uselectPais = document.querySelector("#upais");
let uselectDepartamento = document.querySelector("#udepartamento");
let uselectMunicipio = document.querySelector("#umunicipio");
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
  let observaciones = document.querySelector("#observaciones").value;

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
      id: localStorage.getItem("id"),
      observaciones: observaciones
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
  document.querySelector("#observaciones").value = "";
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
      document.querySelector("#uobservaciones").value = unit.observaciones;
      document.querySelector("#uobservaciones").setAttribute("disabled","disabled");

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
      id_cambio = unit.id;

      calculardiasDiscount();
      sumarMeses();

      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");

      $.post("backend/ajax/trabajadores/actualizarPeriodos.php", {
        prueba : document.querySelector("#uperiodo_prueba").value,
        cantidad : document.querySelector("#udias_laborados").value,
        id: unit.id
      }, (data, status) => {})

      calcularEsp(document.getElementById("udias_laborados").value);

    })
  $("#exampleModala").modal("show");
};

const limpiar = () => {
  document.getElementById("dpi").value = "";
  document.getElementById("cv").value = "";
  document.getElementById("apoliciaco").value = "";
  document.getElementById("apenal").value = "";
  document.getElementById("sempleo").value = "";
}

const doc = (codigo) => {
  id = document.querySelector(`.id${codigo}`).textContent;
  $("#exampleModalb").modal("show");
  document.querySelector(".nombre").textContent = 
  (document.querySelector(`.nombre${codigo}`).textContent + 
  document.querySelector(`.apellido${codigo}`).textContent)

  $.post("backend/ajax/documentos/verificarDocumento.php",{
    ruta: `doc-dpi/${id}.pdf`
  },(data, status) => {
    if(data == "1"){
      document.querySelector(".a1").innerHTML = 
      `<a href="img/doc-dpi/${id}.pdf" target="_blank">
        <button class="btn btn-primary" type="button">
        Ver
        </button>
      </a>`
    }else{
      document.querySelector(".a1").innerHTML = "";
    }
  })

  $.post("backend/ajax/documentos/verificarDocumento.php",{
    ruta: `doc-cv/${id}.pdf`
  },(data, status) => {
    if(data == "1"){
      document.querySelector(".a2").innerHTML = 
      `<a href="img/doc-cv/${id}.pdf" target="_blank">
        <button class="btn btn-primary" type="button">
        Ver
        </button>
      </a>`
    }else{
      document.querySelector(".a2").innerHTML = "";
    }
  })

  $.post("backend/ajax/documentos/verificarDocumento.php",{
    ruta: `doc-apoliciaco/${id}.pdf`
  },(data, status) => {
    if(data == "1"){
      document.querySelector(".a3").innerHTML = 
      `<a href="img/doc-apoliciaco/${id}.pdf" target="_blank">
        <button class="btn btn-primary" type="button">
        Ver
        </button>
      </a>`
    }else{
      document.querySelector(".a3").innerHTML = "";
    }
  })

  $.post("backend/ajax/documentos/verificarDocumento.php",{
    ruta: `doc-apenal/${id}.pdf`
  },(data, status) => {
    if(data == "1"){
      document.querySelector(".a4").innerHTML = 
      `<a href="img/doc-apenal/${id}.pdf" target="_blank">
        <button class="btn btn-primary" type="button">
        Ver
        </button>
      </a>`
    }else{
      document.querySelector(".a4").innerHTML = "";
    }
  })

  $.post("backend/ajax/documentos/verificarDocumento.php",{
    ruta: `doc-sempleo/${id}.pdf`
  },(data, status) => {
    if(data == "1"){
      document.querySelector(".a5").innerHTML = 
      `<a href="img/doc-sempleo/${id}.pdf" target="_blank">
        <button class="btn btn-primary" type="button">
        Ver
        </button>
      </a>`
    }else{
      document.querySelector(".a5").innerHTML = "";
    }
  })
  
  
};

const actualizarDoc = () => {
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
      limpiar();
      $("#exampleModalb").modal("hide");
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

const quitarDisabled = () => {
    document.querySelector("#ucui").removeAttribute("disabled");
    document.querySelector("#unombre").removeAttribute("disabled");
    document.querySelector("#uapellido").removeAttribute("disabled");
    document.querySelector("#uestado_civil").removeAttribute("disabled");
    document.querySelector("#ufecha_nacimiento").removeAttribute("disabled");
    document.querySelector("#ufecha_inicio").removeAttribute("disabled");
    document.querySelector("#ufecha_finalizacion").removeAttribute("disabled");
    document.querySelector("#ufecha_igss").removeAttribute("disabled");
    document.querySelector("#unumero_igss").removeAttribute("disabled");
    document.querySelector("#upuesto").removeAttribute("disabled");
    document.querySelector("#utelefono").removeAttribute("disabled");
    document.querySelector("#ucelular").removeAttribute("disabled");
    document.querySelector("#ucorreo").removeAttribute("disabled");
    document.querySelector("#upais").removeAttribute("disabled");
    document.querySelector("#udepartamento").removeAttribute("disabled");
    document.querySelector("#umunicipio").removeAttribute("disabled");
    document.querySelector("#usalario").removeAttribute("disabled");
    document.querySelector("#uempresa").removeAttribute("disabled");
    document.querySelector("#uestado_laboral").removeAttribute("disabled");
    document.querySelector("#udireccion").removeAttribute("disabled");
    document.querySelector("#uobservaciones").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let cui = document.querySelector("#ucui").value;
  let nombre = document.querySelector("#unombre").value;
  let apellido = document.querySelector("#uapellido").value;
  let estado_civil = document.querySelector("#uestado_civil").value;
  let fecha_nacimiento = document.querySelector("#ufecha_nacimiento").value;
  let fecha_inicio = document.querySelector("#ufecha_inicio").value;
  let fecha_finalizacion = document.querySelector("#ufecha_finalizacion").value;
  let fecha_igss = document.querySelector("#ufecha_igss").value;
  let numero_igss = document.querySelector("#unumero_igss").value;
  let puesto = document.querySelector("#upuesto").value;
  let telefono = document.querySelector("#utelefono").value;
  let celular = document.querySelector("#ucelular").value;
  let correo = document.querySelector("#ucorreo").value;
  let pais = document.querySelector("#upais").value;
  let departamento = document.querySelector("#udepartamento").value;
  let municipio = document.querySelector("#umunicipio").value;
  let salario = parseFloat(document.querySelector("#usalario").value);
  let direccion = document.querySelector("#udireccion").value;
  let estado_laboral = document.querySelector("#uestado_laboral").value;
  let empresa = document.querySelector("#uempresa").value;
  let observaciones = document.querySelector("#uobservaciones").value;
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
          "backend/ajax/trabajadores/actualizarTrabajador.php",
          {
            cui: cui,
            nombre: nombre,
            apellido: apellido,
            estado_civil: estado_civil,
            fecha_nacimiento: fecha_nacimiento,
            fecha_inicio: fecha_inicio,
            fecha_finalizacion: fecha_finalizacion,
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
            empresa: empresa,
            estado_laboral: estado_laboral,
            direccion: direccion,
            id: id_cambio,
            observaciones: observaciones
          },
          (data, status) => {
            if (data == "1") {
              Swal.fire("Excelente!", "El trabajador ha sido actualizado!", "success");
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
        "backend/ajax/trabajadores/eliminarTrabajador.php",
        {
          codigo: id,
        },
        (data, status) => {
          if (data == "1") {
            Swal.fire("Eliminado!", "El trabajador ha sido eliminada.", "success");
            mostrar();
          } else {
            Swal.fire("Error!", "No se puede eliminar el trabajador.", "error");
          }
        }
      );
    }
  });
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

$.post("backend/ajax/trabajadores/mostrarEstadoCivil.php", {}, (data, status) => {
  document.querySelector("#estado_civil").innerHTML = data;
  document.querySelector("#uestado_civil").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarPuestos.php", {}, (data, status) => {
  document.querySelector("#puesto").innerHTML = data;
  document.querySelector("#upuesto").innerHTML = data;
  document.querySelector("#bpuesto").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEstadoLaboral.php", {}, (data, status) => {
  document.querySelector("#estado_laboral").innerHTML = data;
  document.querySelector("#uestado_laboral").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEmpresa.php", {}, (data, status) => {
  document.querySelector("#empresa").innerHTML = data;
  document.querySelector("#uempresa").innerHTML = data;
  document.querySelector("#bempresa").innerHTML = data;
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

btnActualizard.addEventListener("click", () => {
  actualizarDoc();
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
  limpiarCamposN();
});
