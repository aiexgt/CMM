<?php

//* Conexión a Base de Datos
$host = "localhost"; //* dominio
$user = "tubagua"; //* usuario bd
$password = "Tubagua2022$."; //* contraseña bd
$database = "bdtk"; //* segmento o base de datos

//* Conectando la base de datos
$con = new mysqli($host, $user, $password, $database);
$con->set_charset("utf8");

//* Resultado conexión
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

?>