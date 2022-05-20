<?php
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$trabajador = $_POST['trabajador'];
		$fecha = $_POST['fecha'];
		$cantidad = $_POST['cantidad'];
		$disponibles = $_POST['disponibles'];
		$fecha_fin = $_POST['fecha_fin'];
		$observaciones = $_POST['observaciones'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = "INSERT INTO vacaciones (persona_id, fecha_inicio, cantidad, fecha_fin, observaciones, usuario_id) 
		VALUES($trabajador, '$fecha', $cantidad, '$fecha_fin', '$observaciones', $id)";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		$query = "SELECT vacaciones_ocupadas FROM personas WHERE id = $trabajador";
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }
		$row = mysqli_fetch_assoc($result);

		$ocupadas = $cantidad + $row['vacaciones_ocupadas'];

		$disponibles = $disponibles - $cantidad;

		$query = "UPDATE personas SET 
        vacaciones_disponibles = $disponibles,
		vacaciones_ocupadas = $ocupadas WHERE id = $trabajador";
		
		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }
		//* Imprimir datos
	    echo $result;
?>