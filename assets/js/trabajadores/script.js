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
const btnActualizard = document.getElementById("btn-actualizard");
let id_cambio;
let selectPais = document.getElementById("pais");
let selectDepartamento = document.getElementById("departamento");
let selectMunicipio = document.getElementById("municipio");
let uselectPais = document.getElementById("upais");
let uselectDepartamento = document.getElementById("udepartamento");
let uselectMunicipio = document.getElementById("umunicipio");
let bempresa = document.getElementById("bempresa");
let bpuesto = document.getElementById("bpuesto");
let busqueda = document.getElementById("busqueda");


//* Funciones

const mostrar = () => {
  $.post("backend/ajax/trabajadores/mostrarTrabajadores.php", {}, (data, status) => {
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
  let cui = document.getElementById("cui").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let estado_civil = document.getElementById("estado_civil").value;
  let fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
  let fecha_inicio = document.getElementById("fecha_inicio").value;
  let fecha_igss = document.getElementById("fecha_igss").value;
  let numero_igss = document.getElementById("numero_igss").value;
  let puesto = document.getElementById("puesto").value;
  let telefono = document.getElementById("telefono").value;
  let celular = document.getElementById("celular").value;
  let correo = document.getElementById("correo").value;
  let pais = document.getElementById("pais").value;
  let departamento = document.getElementById("departamento").value;
  let municipio = document.getElementById("municipio").value;
  let salario = document.getElementById("salario").value;
  let direccion = document.getElementById("direccion").value;
  let estado_laboral = document.getElementById("estado_laboral").value;
  let empresa = document.getElementById("empresa").value;
  let observaciones = document.getElementById("observaciones").value;

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
  document.getElementById("cui").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("estado_civil").value = 0;
  document.getElementById("fecha_nacimiento").value = "2002-01-01";
  document.getElementById("fecha_inicio").value = "";
  document.getElementById("fecha_igss").value = "";
  document.getElementById("numero_igss").value = "";
  document.getElementById("puesto").value = 0;
  document.getElementById("telefono").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("pais").value = 0;
  document.getElementById("departamento").value = 0;
  document.getElementById("municipio").value = 0;
  document.getElementById("salario").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("estado_laboral").value = 0;
  document.getElementById("empresa").value = 0;
  document.getElementById("observaciones").value = "";
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
  var d = new Date(document.getElementById("ufecha_inicio").value);
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
      document.getElementById("ucui").value = unit.cui;
      document.getElementById("ucui").setAttribute("disabled","disabled");
      document.getElementById("unombre").value = unit.nombre;
      document.getElementById("unombre").setAttribute("disabled","disabled");
      document.getElementById("uapellido").value = unit.apellido;
      document.getElementById("uapellido").setAttribute("disabled","disabled");
      document.getElementById("uestado_civil").value = unit.estado_civil_id;
      document.getElementById("uestado_civil").setAttribute("disabled","disabled");
      document.getElementById("ufecha_nacimiento").value = unit.fecha_nacimiento;
      document.getElementById("ufecha_nacimiento").setAttribute("disabled","disabled");
      document.getElementById("ufecha_inicio").value = unit.fecha_inicio;
      document.getElementById("ufecha_inicio").setAttribute("disabled","disabled");
      document.getElementById("ufecha_igss").value = unit.fecha_igss;
      document.getElementById("ufecha_igss").setAttribute("disabled","disabled");
      document.getElementById("unumero_igss").value = unit.numero_igss;
      document.getElementById("unumero_igss").setAttribute("disabled","disabled");
      document.getElementById("upuesto").value = unit.puesto_id;
      document.getElementById("upuesto").setAttribute("disabled","disabled");
      document.getElementById("utelefono").value = unit.telefono;
      document.getElementById("utelefono").setAttribute("disabled","disabled");
      document.getElementById("ucelular").value = unit.celular;
      document.getElementById("ucelular").setAttribute("disabled","disabled");
      document.getElementById("ucorreo").value = unit.correo;
      document.getElementById("ucorreo").setAttribute("disabled","disabled");
      document.getElementById("upais").value = unit.pais_id;
      document.getElementById("upais").setAttribute("disabled","disabled");
      document.getElementById("udepartamento").value = unit.departamento_id;
      document.getElementById("udepartamento").setAttribute("disabled","disabled");
      document.getElementById("umunicipio").value = unit.municipio_id;
      document.getElementById("umunicipio").setAttribute("disabled","disabled");
      document.getElementById("usalario").value = unit.salario;
      document.getElementById("usalario").setAttribute("disabled","disabled");
      document.getElementById("udireccion").value = unit.direccion;
      document.getElementById("udireccion").setAttribute("disabled","disabled");
      document.getElementById("uestado_laboral").value = unit.estado_trabajo_id;
      document.getElementById("uestado_laboral").setAttribute("disabled","disabled");
      document.getElementById("uempresa").value = unit.empresa_id;
      document.getElementById("uempresa").setAttribute("disabled","disabled");
      document.getElementById("udias_laborados").setAttribute("disabled","disabled");
      document.getElementById("uperiodo_prueba").setAttribute("disabled","disabled");
      document.getElementById("ufecha_finalizacion").value = unit.fecha_finalizacion;
      document.getElementById("ufecha_finalizacion").setAttribute("disabled","disabled");
      document.getElementById("uobservaciones").value = unit.observaciones;
      document.getElementById("uobservaciones").setAttribute("disabled","disabled");

      $.post("backend/ajax/trabajadores/mostrarPaises.php", {}, (data, status) => {
        document.getElementById("upais").innerHTML = data;
        document.getElementById("upais").value = unit.pais_id;
      });
      $.post(
        "backend/ajax/trabajadores/mostrarDepartamentos.php",
        {
          pais: unit.pais_id,
        },
        (data, status) => {
          document.getElementById("udepartamento").innerHTML = data;
          document.getElementById("udepartamento").value = unit.departamento_id;
        }
      );
      $.post(
        "backend/ajax/trabajadores/mostrarMunicipios.php",
        {
          departamento: unit.departamento_id,
        },
        (data, status) => {
          document.getElementById("umunicipio").innerHTML = data;
          document.getElementById("umunicipio").value = unit.municipio_id;
        }
      );
      id_cambio = unit.id;

      calculardiasDiscount();
      sumarMeses();

      btnEditar.removeAttribute("hidden");
      btnActualizar.setAttribute("hidden","hidden");

      $.post("backend/ajax/trabajadores/actualizarPeriodos.php", {
        prueba : document.getElementById("uperiodo_prueba").value,
        cantidad : document.getElementById("udias_laborados").value,
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
    document.getElementById("ucui").removeAttribute("disabled");
    document.getElementById("unombre").removeAttribute("disabled");
    document.getElementById("uapellido").removeAttribute("disabled");
    document.getElementById("uestado_civil").removeAttribute("disabled");
    document.getElementById("ufecha_nacimiento").removeAttribute("disabled");
    document.getElementById("ufecha_inicio").removeAttribute("disabled");
    document.getElementById("ufecha_finalizacion").removeAttribute("disabled");
    document.getElementById("ufecha_igss").removeAttribute("disabled");
    document.getElementById("unumero_igss").removeAttribute("disabled");
    document.getElementById("upuesto").removeAttribute("disabled");
    document.getElementById("utelefono").removeAttribute("disabled");
    document.getElementById("ucelular").removeAttribute("disabled");
    document.getElementById("ucorreo").removeAttribute("disabled");
    document.getElementById("upais").removeAttribute("disabled");
    document.getElementById("udepartamento").removeAttribute("disabled");
    document.getElementById("umunicipio").removeAttribute("disabled");
    document.getElementById("usalario").removeAttribute("disabled");
    document.getElementById("uempresa").removeAttribute("disabled");
    document.getElementById("uestado_laboral").removeAttribute("disabled");
    document.getElementById("udireccion").removeAttribute("disabled");
    document.getElementById("uobservaciones").removeAttribute("disabled");
    btnEditar.setAttribute("hidden","hidden");
    btnActualizar.removeAttribute("hidden");
  
};

const actualizar = () => {
  let cui = document.getElementById("ucui").value;
  let nombre = document.getElementById("unombre").value;
  let apellido = document.getElementById("uapellido").value;
  let estado_civil = document.getElementById("uestado_civil").value;
  let fecha_nacimiento = document.getElementById("ufecha_nacimiento").value;
  let fecha_inicio = document.getElementById("ufecha_inicio").value;
  let fecha_finalizacion = document.getElementById("ufecha_finalizacion").value;
  let fecha_igss = document.getElementById("ufecha_igss").value;
  let numero_igss = document.getElementById("unumero_igss").value;
  let puesto = document.getElementById("upuesto").value;
  let telefono = document.getElementById("utelefono").value;
  let celular = document.getElementById("ucelular").value;
  let correo = document.getElementById("ucorreo").value;
  let pais = document.getElementById("upais").value;
  let departamento = document.getElementById("udepartamento").value;
  let municipio = document.getElementById("umunicipio").value;
  let salario = parseFloat(document.getElementById("usalario").value);
  let direccion = document.getElementById("udireccion").value;
  let estado_laboral = document.getElementById("uestado_laboral").value;
  let empresa = document.getElementById("uempresa").value;
  let observaciones = document.getElementById("uobservaciones").value;
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
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "e"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      empresa: bempresa.value
    }, (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "p"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      puesto: bpuesto.value
    }, (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "te"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      empresa: bempresa.value
    }, (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "tp"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "ep"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      empresa: bempresa.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else if(tipoBusqueda == "tep"){
    $.post("backend/ajax/trabajadores/buscarTrabajador.php", {
      tipo: tipoBusqueda,
      busqueda: busqueda.value,
      empresa: bempresa.value,
      puesto: bpuesto.value
    }, (data, status) => {
      document.getElementById("tabla-contenido").innerHTML = data;
    });
  }else{
    mostrar();
  }

}

$.post("backend/ajax/trabajadores/mostrarEstadoCivil.php", {}, (data, status) => {
  document.getElementById("estado_civil").innerHTML = data;
  document.getElementById("uestado_civil").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarPuestos.php", {}, (data, status) => {
  document.getElementById("puesto").innerHTML = data;
  document.getElementById("upuesto").innerHTML = data;
  document.getElementById("bpuesto").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEstadoLaboral.php", {}, (data, status) => {
  document.getElementById("estado_laboral").innerHTML = data;
  document.getElementById("uestado_laboral").innerHTML = data;
});

$.post("backend/ajax/trabajadores/mostrarEmpresa.php", {}, (data, status) => {
  document.getElementById("empresa").innerHTML = data;
  document.getElementById("uempresa").innerHTML = data;
  document.getElementById("bempresa").innerHTML = data;
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
