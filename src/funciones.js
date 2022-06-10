const errorDF = (dato) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Falta ${dato}`,
    });
};

const calcularDiasHoy = (fecha_inicio) => {
  let timeStart = new Date(fecha_inicio);
    let actualDate = new Date();
    if (actualDate > timeStart)
    {
        let diff = actualDate.getTime() - timeStart.getTime();
        let dias_calculados = Math.round(diff / (1000 * 60 * 60 * 24)) -1;
        return dias_calculados;
    }
};

function stringToDate(dateString){
  dateString = dateString.split('-');
  return new Date(dateString[0], dateString[1] - 1, dateString[2]);
};

const calcularDiasSD = (fecha_inicio, fecha_fin) => {
  //let date1 = stringToDate(document.getElementById("fecha").value);
  //let date2 = stringToDate(document.getElementById("fecha_fin").value);
  let date1 = stringToDate(fecha_inicio);
  let date2 = stringToDate(fecha_fin);
  delta = (date2-date1) / (1000 * 60 * 60 * 24) + 1; // calcula el tiempo total
    weeks = 0;
    for(i = 0; i < delta; i++){
                     if (date1.getDay () == 0) weeks ++; // agrega 1 si es domingo
        date1 = date1.valueOf();
        date1 += 1000 * 60 * 60 * 24;
        date1 = new Date(date1);
    }
    $.post("./api/funciones/consultarFeriados.php", {
      fecha_inicio,
      fecha_fin
    }, (data, status) => {
      var unit = JSON.parse(data);
      let dias_calculados = (delta - weeks - parseInt(unit.dias));
      document.getElementById("cantidad").value = dias_calculados;
    });
}
