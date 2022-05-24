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
        $usuario_id = $_POST['id'];


		//* Insertar datos
		$query = 'INSERT INTO usuarios (nombre, apellido, usuario, password, rol_id, usuario_id, estado) 
		VALUES("'.$nombre.'","'.$apellido.'","'.$usuario.'","'.$password.'",'.$rol.','.$usuario_id.',1)';

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>