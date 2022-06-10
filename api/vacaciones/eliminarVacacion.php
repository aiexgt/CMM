<?php

//* Validación contenido codigo
if(isset($_POST['codigo']) && isset($_POST['codigo']) != "")
{
    //* Enlace BD
    include("../conexion.php");

    //* Recepción variables
    $codigo = $_POST['codigo'];
    
    $query = "SELECT persona_id, cantidad FROM vacaciones WHERE id = $codigo";
	if (!$result = mysqli_query($con, $query)) {
	    exit(mysqli_error($con));
	}
    $row = mysqli_fetch_assoc($result);

    $query = "SELECT vacaciones_ocupadas, vacaciones_disponibles FROM personas WHERE id = ". $row['persona_id'];
	if (!$result = mysqli_query($con, $query)) {
	    exit(mysqli_error($con));
	}
	$row2 = mysqli_fetch_assoc($result);

    $disponibles = $row2['vacaciones_disponibles'] + $row['cantidad'];

    $ocupadas = $row2['vacaciones_ocupadas'] - $row['cantidad'];

    $query = "UPDATE personas SET 
        vacaciones_disponibles = $disponibles,
		vacaciones_ocupadas = $ocupadas WHERE id = ". $row['persona_id'];
		
		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

    $query = "DELETE FROM vacaciones WHERE id = $codigo";
    if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
    }

    unlink("../../img/doc-vacaciones/".$codigo.".pdf");

    //* Imprimir resultado
    echo $result;
}
?>