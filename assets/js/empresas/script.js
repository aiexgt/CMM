function mostrar() {
    $.post("backend/ajax/empresas/mostrarEmpresas.php", {}, (data, status) => {
        document.querySelector("#tabla-contenido").innerHTML = data;
    });
}

const nuevo = document.querySelector("#btn-nuevo");

nuevo.addEventListener('click', () => {
    $.post("backend/ajax/empresas/mostrarPaises.php", {}, (data, status) => {
        document.querySelector("#pais").innerHTML = data;
    })
})

$(document).ready(() => {
    mostrar();
});