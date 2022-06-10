<?php

//* Validación contenido codigo
if(isset($_POST['codigo']) && isset($_POST['codigo']) != "")
{
    //* Enlace BD
    include("../conexion.php");

    //* Recepción variables
    $codigo = $_POST['codigo'];

    $query = "DELETE FROM estado_trabajo WHERE id = $codigo";
    if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
    }

    //* Imprimir resultado
    echo $result;
}
?>