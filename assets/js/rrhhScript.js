function mostrarTrabajadores() {
    $.post("backend/ajax/mostrarTrabajadores.php", {}, function (data, status) {
        document.querySelector(".tabla-Trabajadores").innerHTML = data;
    });
}

mostrarTrabajadores();