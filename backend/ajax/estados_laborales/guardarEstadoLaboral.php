<?php

	//* Validación de campos necesarios
	if(isset($_POST['nombre']) && isset($_POST['descripcion']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$nombre = $_POST['nombre'];
		$descripcion = $_POST['descripcion'];


		//* Insertar datos
		$query = 'INSERT INTO estado_trabajo (nombre, descripcion) 
		VALUES("'.$nombre.'","'.$descripcion.'")';

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>