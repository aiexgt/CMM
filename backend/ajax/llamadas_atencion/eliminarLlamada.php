<?php

//* Validación contenido codigo
if(isset($_POST['codigo']) && isset($_POST['codigo']) != "")
{
    //* Enlace BD
    include("../../conexion.php");

    //* Recepción variables
    $codigo = $_POST['codigo'];
    

    $query = "DELETE FROM llamada_atencion WHERE id = $codigo";
    if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
    }

    unlink("../../../img/doc-llamadas/".$codigo.".pdf");

    //* Imprimir resultado
    echo $result;
}
?>