<?php

	//* Validación de campos necesarios
	if(isset($_POST['trabajador']))
	{
		
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
		$query = "UPDATE ausencias SET 
        persona_id = $trabajador,
        fecha_inicio = '$fecha',
		cantidad = $cantidad,
		fecha_fin = '$fecha_fin',
		asunto = '$asunto',
		descripcion = '$descripcion' WHERE id = $id";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>