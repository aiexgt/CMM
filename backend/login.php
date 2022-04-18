<?php

//* Conexión BD
include("conexion.php");

//* Recibir Variables
$usuario = $_POST['usuario'];
$password = $_POST['password'];

$query = "CALL `bdtk`.`loginUser`('$usuario', '$password', @respuesta)";
	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

$query = "SELECT @respuesta, id FROM usuarios WHERE usuario = '$usuario'";
	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }
$row = mysqli_fetch_assoc($result);

echo $row['@respuesta'];

?>