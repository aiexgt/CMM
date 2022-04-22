const btnNuevo = document.querySelector("#btn-nuevo");
const btnGuardar = document.querySelector("#btn-guardar");

let selectPais = document.querySelector("#pais");
let selectDepartamento = document.querySelector("#departamento");
let selectMunicipio = document.querySelector("#municipio");
let busqueda = document.querySelector("#busqueda");

const mostrar = () => {
    $.post("backend/ajax/empresas/mostrarEmpresas.php", {}, (data, status) => {
        document.querySelector("#tabla-contenido").innerHTML = data;
    });
}

const errorDF = (dato) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta ${dato}`
    })
}

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

    if(codigo == ""){
        errorDF("Código");
    }else if(nombre == ""){
        errorDF("Nombre");
    }else if(nit == ""){
        errorDF("NIT");
    }else if(pais == 0){
        errorDF("País");
    }else if(departamento == 0){
        errorDF("Departamento")
    }else if(municipio == 0){
        errorDF("Municipio");
    }else if(direccion == ""){
        errorDF("Dirección");
    }else if(email_principal == ""){
        errorDF("Email Principal");
    }else if(email_principal.indexOf("@") == -1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Email Principal Incorrecto`
        })
    }else if(telefono == ""){
        errorDF("Teléfono");
    }else{
        $.post("backend/ajax/empresas/guardarEmpresa.php", {
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
            usuario_id: usuario_id
        }, (data, status) => {

            if(data == "1"){
                let formData = new FormData();
            let files = $('#image')[0].files[0];
            formData.append('file',files);
            formData.append('codigo',codigo);

            $.ajax({
                url: 'backend/ajax/empresas/guardarImagen.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    if (response != 0) {
                        $(".card-img-top").attr("src", response);
                    } else {
                        alert('Formato de imagen incorrecto.');
                    }
                }
            });
                $(".modal").modal("hide");
                Swal.fire(
                    'Excelente!',
                    'La empresa se ha añadido!',
                    'success'
                  )
            }
        });
    }
}

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
    document.querySelector("#email_secundario").value = ""
    document.querySelector("#telefono").value = "";
    document.querySelector("#celular").value = "";
}

btnGuardar.addEventListener('click', () => {
    guardar();
})

btnNuevo.addEventListener('click', () => {
    limpiarCampos();
    $.post("backend/ajax/empresas/mostrarPaises.php", {}, (data, status) => {
        selectPais.innerHTML = data;
        selectDepartamento.setAttribute("disabled", "disabled");
        selectDepartamento.value = 0;
        selectMunicipio.setAttribute("disabled", "disabled");
        selectMunicipio.value = 0;
    })
})

selectPais.addEventListener('change', () => {
    $.post("backend/ajax/empresas/mostrarDepartamentos.php", {
        pais: selectPais.value
    }, (data, status) => {
        selectDepartamento.removeAttribute("disabled");
        selectDepartamento.innerHTML = data;
        selectMunicipio.setAttribute("disabled", "disabled");
        selectMunicipio.value = 0;
    })
})

selectDepartamento.addEventListener('change', () => {
    $.post("backend/ajax/empresas/mostrarMunicipios.php", {
        departamento: selectDepartamento.value
    }, (data, status) => {
        selectMunicipio.removeAttribute("disabled");
        selectMunicipio.innerHTML = data;
    })
})

busqueda.addEventListener('keyup', () => {
    $.post("backend/ajax/empresas/buscarEmpresa.php", {
        busqueda: busqueda.value
    }, (data, status) => {
        document.querySelector("#tabla-contenido").innerHTML = data;
    });
})


$(document).ready(() => {
    mostrar();
});
