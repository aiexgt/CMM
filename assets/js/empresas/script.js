function mostrar() {
    $.post("backend/ajax/empresas/mostrar.php", {}, function (data, status) {
        document.querySelector("#tabla-contenido").innerHTML = data;
    });
}

mostrar();