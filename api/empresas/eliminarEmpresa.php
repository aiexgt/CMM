<?php

//* Validación contenido codigo
if(isset($_POST['codigo']) && isset($_POST['codigo']) != "")
{
    //* Enlace BD
    include("../conexion.php");

    //* Recepción variables
    $codigo = $_POST['codigo'];

    $query = "SELECT id FROM empresas WHERE codigo = '".$codigo."' LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($result);

    unlink("../../../img/logo-empresas/".$row['id'].".jpg");

    $query = "DELETE FROM empresas WHERE codigo = '$codigo'";
    if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
    }

    //* Imprimir resultado
    echo $result;
}
?>