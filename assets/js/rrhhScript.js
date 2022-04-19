function mostrarTrabajadores() {
    $.post("backend/ajax/mostrarTrabajadores.php", {}, function (data, status) {
        document.querySelector("#body-table").innerHTML = data;
    });
}

mostrarTrabajadores();