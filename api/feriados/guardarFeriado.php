<?php
		
		//* Enlace BD
		include("../conexion.php");

		//* Recibir variables
		$nombre = $_POST['nombre'];
		$fecha = $_POST['fecha'];
		$descripcion = $_POST['descripcion'];

		//* Insertar datos
		$query = 'INSERT INTO feriados (nombre, fecha, descripcion) 
		VALUES("'.$nombre.'", "'.$fecha.'", "'.$descripcion.'")';

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
?>