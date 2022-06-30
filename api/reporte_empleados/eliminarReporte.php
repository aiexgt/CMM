<?php

//* Validación contenido codigo
if(isset($_POST['codigo']) && isset($_POST['codigo']) != "")
{
    //* Enlace BD
    include("../conexion.php");

    //* Recepción variables
    $codigo = $_POST['codigo'];
    

    $query = "DELETE FROM reporte_empleados WHERE id = $codigo";
    if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
    }

    unlink("../../img/rep-empleados/".$codigo.".pdf");

    //* Imprimir resultado
    echo $result;
}
?>