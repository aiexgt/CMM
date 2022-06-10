<?php
	//* Enlace BD
	include("../conexion.php");

    $pais = $_POST['pais'];

	$data = '<option value="0" selected>Seleccione Departamento</option>';

	$query = "SELECT id, nombre FROM departamentos WHERE pais_id = $pais ORDER BY id ASC";

	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    // if query results contains rows then featch those rows 
    if(mysqli_num_rows($result) > 0)
    {
    	while($row = mysqli_fetch_assoc($result))
    	{
    		$data .= '<option value="'.$row["id"].'">'.$row["nombre"].'</option>';
    	}
    }

    echo $data;
?>