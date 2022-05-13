<?php
	//* Enlace BD
	include("../../conexion.php");

	$empresa = $_POST['empresa'];

	$data = '<option value="0" selected>Seleccione Trabajador</option>';

	$query = "SELECT p.id, p.nombre, p.apellido FROM personas p 
	WHERE p.empresa_id = $empresa AND p.estado_trabajo_id != 3  ORDER BY p.id ASC";

	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    // if query results contains rows then featch those rows 
    if(mysqli_num_rows($result) > 0)
    {
    	while($row = mysqli_fetch_assoc($result))
    	{
    		$data .= '<option value="'.$row["id"].'">'.$row["nombre"]." ".$row["apellido"].'</option>';
    	}
    }

    echo $data;
?>