<?php

include("../../conexion.php");

$trabajador = $_POST['trabajador'];
$fecha_inicio = $_POST['fecha'];
$fecha_fin = $_POST['fecha_fin'];
$cantidad = $_POST['cantidad'];
$fecha = date('m-d-Y');

$query = "SELECT p.nombre, p.apellido, p.empresa_id,
(SELECT pp.nombre FROM puestos pp WHERE pp.id = p.puesto_id) AS puesto,
(SELECT e.nombre FROM empresas e WHERE e.id = p.empresa_id) AS empresa
    FROM personas p WHERE p.id = $trabajador";

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if(mysqli_num_rows($result) > 0)
    {
    $row = mysqli_fetch_assoc($result);
    }
?>