<?php
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$trabajador = $_POST['trabajador'];
		$fecha = $_POST['fecha'];
		$cantidad = $_POST['cantidad'];
		$fecha_fin = $_POST['fecha_fin'];
		$asunto = $_POST['asunto'];
		$descripcion = $_POST['descripcion'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = "INSERT INTO ausencias (persona_id, fecha_inicio, cantidad, fecha_fin, asunto, descripcion, usuario_id) 
		VALUES($trabajador, '$fecha', $cantidad, '$fecha_fin', '$asunto', '$descripcion', $id)";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
?>