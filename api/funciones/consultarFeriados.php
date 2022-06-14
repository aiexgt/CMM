<?php

include('../conexion.php');

$fecha_inicio = $_POST['fecha_inicio'];
$fecha_fin  = $_POST['fecha_fin'];

$query = "SELECT id, fecha FROM feriados WHERE FECHA 
BETWEEN '".$fecha_inicio."' AND '".$fecha_fin."' ORDER BY FECHA ASC";

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}
$response = array();
if(mysqli_num_rows($result) > 0)
    {
        $number = 0;
    	while($row = mysqli_fetch_assoc($result))
    	{
            $response[$number] = $row['fecha'];
            $number++;
        }
    
    }

    echo json_encode($response);

?>