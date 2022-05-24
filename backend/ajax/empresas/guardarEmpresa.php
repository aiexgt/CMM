<?php

	//* Validación de campos necesarios
	if(isset($_POST['codigo']) && isset($_POST['nombre']) && isset($_POST['nit']) && 
	isset($_POST['pais']) && isset($_POST['departamento']) && isset($_POST['municipio']) && 
	isset($_POST['direccion']) && isset($_POST['email_principal']) && isset($_POST['telefono']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$codigo = $_POST['codigo'];
		$nombre = $_POST['nombre'];
		$nit = $_POST['nit'];
		$pais = $_POST['pais'];
		$departamento = $_POST['departamento'];
		$municipio = $_POST['municipio'];
		$direccion = $_POST['direccion'];
		$codigo_postal = $_POST['codigo_postal'];
		$pagina_web = $_POST['pagina_web'];
		$email_principal = $_POST['email_principal'];
		$email_secundario = $_POST['email_secundario'];
		$telefono = $_POST['telefono'];
		$celular = $_POST['celular'];
		$usuario_id = $_POST['usuario_id'];

		//* Insertar datos
		$query = 'INSERT INTO empresas (codigo, nombre, nit, direccion, pais_id, departamento_id, 
		municipio_id, codigo_postal, pagina_web, usuario_id, email_principal, email_secundario, 
		telefono, celular, estado) 
		VALUES("'.$codigo.'", "'.$nombre.'", "'.$nit.'", "'.$direccion.'", '.$pais.', '.$departamento.', '.$municipio.', 
		"'.$codigo_postal.'", "'.$pagina_web.'", '.$usuario_id.', "'.$email_principal.'", "'.$email_secundario.'", 
		"'.$telefono.'", "'.$celular.'", 1)';

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>