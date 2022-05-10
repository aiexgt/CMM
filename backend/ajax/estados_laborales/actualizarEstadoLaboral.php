<?php

	//* Validación de campos necesarios
	if(isset($_POST['nombre']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
        $nombre = $_POST['nombre'];
		$descripcion = $_POST['descripcion'];
        $id = $_POST['id'];

		//* Insertar datos
		$query = "UPDATE estado_trabajo SET 
        nombre = '$nombre',
        descripcion = '$descripcion' WHERE id = $id";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>