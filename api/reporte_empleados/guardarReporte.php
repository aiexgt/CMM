<?php

	//* Validación de campos necesarios
	if(isset($_POST['empresa']) && isset($_POST['empresa']))
	{
		
		//* Enlace BD
		include("../conexion.php");

		//* Recibir variables
		$empresa = $_POST['empresa'];
		$fechaInicio = $_POST['fechaInicio'];
		$fechaFin = $_POST['fechaFin'];
		$id = $_POST['id'];


		//* Insertar datos
		$query ='INSERT INTO reporte_empleados (fecha_inicio, fecha_fin, empresa_id, usuario_id) 
		VALUES("'.$fechaInicio.'","'.$fechaFin.'",'.$empresa.','.$id.')';

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>