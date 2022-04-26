<?php

	//* Validación de campos necesarios
	if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['usuario']) && 
	isset($_POST['password']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
        $nombre = $_POST['nombre'];
		$apellido = $_POST['apellido'];
		$usuario = $_POST['usuario'];
		$password = $_POST['password'];
		$rol = $_POST['rol'];
		$estado = $_POST['estado'];
		$id = $_POST['id'];

		//* Insertar datos
		$query = "UPDATE usuarios SET 
        nombre = '$nombre',
        apellido = '$apellido',
        usuario = '$usuario',
        password = '$password',
        rol_id = $rol,
        estado = $estado WHERE id = $id";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>