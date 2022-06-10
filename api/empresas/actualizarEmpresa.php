<?php

	//* Validación de campos necesarios
	if(isset($_POST['codigo']) && isset($_POST['nombre']) && isset($_POST['nit']) && 
	isset($_POST['pais']) && isset($_POST['departamento']) && isset($_POST['municipio']) && 
	isset($_POST['direccion']) && isset($_POST['email_principal']) && isset($_POST['telefono']))
	{
		
		//* Enlace BD
		include("../conexion.php");

		//* Recibir variables
        $codigo_anterior = $_POST['codigo_anterior'];
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
        $estado = $_POST['estado'];

		//* Insertar datos
		$query = 'UPDATE empresas SET 
        codigo = "'.$codigo.'", 
        nombre = "'.$nombre.'",
        nit = "'.$nit.'",
        pais_id = '.$pais.',
        departamento_id = '.$departamento.',
        municipio_id = '.$municipio.',
        direccion = "'.$direccion.'",
        codigo_postal = "'.$codigo_postal.'",
        pagina_web = "'.$pagina_web.'",
        email_principal = "'.$email_principal.'",
        email_secundario = "'.$email_secundario.'",
        telefono = "'.$telefono.'",
        celular = "'.$celular.'",
        usuario_id = '.$usuario_id.',
        estado = '.$estado.' WHERE id = '.$codigo_anterior;

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>