<?php
	//* Enlace BD
	include("../conexion.php");

    $id = $_POST['id'];

	$data = '<option value="0" selected>Ninguna</option>';

	$query = "SELECT l.id, (SELECT n.nombre FROM niveles n WHERE n.id = l.nivel) AS nivel, 
    l.fecha, l.asunto FROM llamada_atencion l WHERE l.persona_id = $id ORDER BY l.fecha DESC";

	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    // if query results contains rows then featch those rows 
    if(mysqli_num_rows($result) > 0)
    {
    	while($row = mysqli_fetch_assoc($result))
    	{
    		$data .= '<option value="'.$row["id"].'">'.$row["nivel"].' - '.$row['asunto'].' - '.$row['fecha'].'</option>';
    	}
    }

    echo $data;
?>

