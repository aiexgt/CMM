<?php
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$trabajador = $_POST['trabajador'];
		$fecha = $_POST['fecha'];
		$cantidad = $_POST['cantidad'];
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

		//* Imprimir datos
	    echo $result;
?>