function mostrarTrabajadores() {
    $.post("backend/ajax/personas/mostrarTrabajadores.php", {}, function (data, status) {
        document.querySelector(".tabla-Trabajadores").innerHTML = data;
    });
}

mostrarTrabajadores();