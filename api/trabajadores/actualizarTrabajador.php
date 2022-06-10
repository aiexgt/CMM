<?php

	//* Validación de campos necesarios
	if(isset($_POST['id']))
	{
		
		//* Enlace BD
		include("../conexion.php");

		//* Recibir variables
        $cui = $_POST['cui'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $estado_civil = $_POST['estado_civil'];
        $fecha_nacimiento = $_POST['fecha_nacimiento'];
        $fecha_inicio = $_POST['fecha_inicio'];
        $fecha_finalizacion = $_POST['fecha_finalizacion'];
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
        $empresa = $_POST['empresa'];
        $estado_laboral = $_POST['estado_laboral'];
        $direccion = $_POST['direccion'];
        $id = $_POST['id'];
        $observaciones = $_POST['observaciones'];

		//* Insertar datos
		$query = 'UPDATE personas SET 
        cui = "'.$cui.'",
        nombre = "'.$nombre.'",
        apellido = "'.$apellido.'",
        estado_civil_id = '.$estado_civil.',
        fecha_nacimiento = "'.$fecha_nacimiento.'",
        fecha_inicio = "'.$fecha_inicio.'",
        fecha_igss = "'.$fecha_igss.'",
        puesto_id = '.$puesto.',
        telefono = "'.$telefono.'",
        celular = "'.$celular.'",
        correo = "'.$correo.'",
        pais_id = '.$pais.',
        departamento_id = '.$departamento.',
        municipio_id = '.$municipio.',
        salario = '.$salario.',
        empresa_id = '.$empresa.',
        estado_trabajo_id = '.$estado_laboral.',
        direccion = "'.$direccion.'",
        observaciones = "'.$observaciones.'"
        WHERE id = '.$id;

		//* Ejecución Query
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }

		//* Imprimir datos
	    echo $result;
	}
?>