<?php

	//* Validación de campos necesarios
	if(isset($_POST['cui']) && isset($_POST['nombre']) && isset($_POST['apellido']) && 
	isset($_POST['fecha_nacimiento']) && isset($_POST['fecha_inicio']))
	{
		
		//* Enlace BD
		include("../../conexion.php");

		//* Recibir variables
		$cui = $_POST['cui'];
		$nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $estado_civil = $_POST['estado_civil'];
        $fecha_nacimiento = $_POST['fecha_nacimiento'];
        $fecha_inicio = $_POST['fecha_inicio'];
        $fecha_igss = $_POST['fecha_igss'];
        $numero_igss = $_POST['numero_igss'];
        $puesto = $_POST['puesto'];
		$telefono = $_POST['telefono'];
		$celular = $_POST['celular'];
        $correo = $_POST['correo'];
        $pais = $_POST['pais'];
        $departamento = $_POST['departamento'];
        $municipio = $_POST['municipio'];
        $salario = $_POST['salario'];
        $direccion = $_POST['direccion'];
        $empresa = $_POST['empresa'];
        $estado_laboral = $_POST['estado_laboral'];
		$usuario_id = $_POST['id'];

		//* Insertar datos
		$query = "INSERT INTO personas (cui, nombre, apellido, estado_civil_id, fecha_nacimiento, 
        fecha_inicio, fecha_igss, numero_igss, puesto_id, telefono, celular, correo, pais_id, 
        departamento_id, municipio_id, salario, direccion, estado_trabajo_id, usuario_id, empresa_id) 
		VALUES('$cui','$nombre','$apellido',$estado_civil, '$fecha_nacimiento', 
        '$fecha_inicio', '$fecha_igss', '$numero_igss', $puesto, '$telefono', '$celular', '$correo', $pais, 
        $departamento, $municipio, '$salario', '$direccion', $estado_laboral, $usuario_id, $empresa)";

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>