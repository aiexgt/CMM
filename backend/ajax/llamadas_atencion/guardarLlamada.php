<?php
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$trabajador = $_POST['trabajador'];
		$fecha = $_POST['fecha'];
		$asunto = $_POST['asunto'];
		$observaciones = $_POST['observaciones'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = "INSERT INTO llamada_atencion (persona_id, fecha, asunto, observaciones, usuario_id) 
		VALUES($trabajador, '$fecha', '$asunto', '$observaciones', $id)";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
?>