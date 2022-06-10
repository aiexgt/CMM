<?php

	//* Validación de campos necesarios
	if(isset($_POST['id']))
	{
		
		//* Enlace BD
		include("../conexion.php");

		//* Recibir variables
		$fecha = $_POST['fecha'];
		$asunto = $_POST['asunto'];
		$observaciones = $_POST['observaciones'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = 'UPDATE llamada_atencion SET 
        fecha = "'.$fecha.'",
		asunto = "'.$asunto.'",
		observaciones = "'.$observaciones.'" WHERE id = '.$id;

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>