

const mostrar = () => {
  $.post("./api/bitacora/mostrarBitacora.php", {}, (data, status) => {
    document.getElementById("tabla-contenido").innerHTML = data;
  });
};


$(document).ready(() => {
  mostrar();
});
