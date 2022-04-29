<?php

	//* Validación de campos necesarios
	if(isset($_POST['prueba']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
        $prueba = $_POST['prueba'];
		$cantidad = $_POST['cantidad'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = "UPDATE personas SET 
        periodo_prueba = '$prueba',
        dias_laborados = '$cantidad' WHERE id = $id";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>