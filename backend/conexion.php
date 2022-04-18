<?php

//* Conexión a Base de Datos
$host = "localhost"; //* dominio
$user = "root"; //* usuario bd
$password = ""; //* contraseña bd
$database = "bdtk"; //* segmento o base de datos

//* Conectando la base de datos
$con = new mysqli($host, $user, $password, $database);

//* Resultado conexión
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

?>