<?php

	//* Validación de campos necesarios
	if(isset($_POST['id']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$nombre = $_POST['nombre'];
		$descripcion = $_POST['descripcion'];
		$fecha = $_POST['fecha'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = 'UPDATE feriados SET 
        nombre = "'.$nombre.'",
		descripcion = "'.$descripcion.'",
		fecha = "'.$fecha.'" WHERE id = '.$id;

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>