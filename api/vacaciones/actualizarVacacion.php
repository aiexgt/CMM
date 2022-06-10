<?php

	//* Validación de campos necesarios
	if(isset($_POST['id']))
	{
		
		//* Enlace BD
		include("../conexion.php");

		//* Recibir variables
		$fecha = $_POST['fecha'];
        $cantidad = $_POST['cantidad'];
		$fecha_fin = $_POST['fecha_fin'];
		$observaciones = $_POST['observaciones'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = 'UPDATE vacaciones SET 
        fecha_inicio = "'.$fecha.'",
		cantidad = '.$cantidad.',
		fecha_fin = "'.$fecha_fin.'",
		observaciones = "'.$observaciones.'" WHERE id = '.$id;

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>