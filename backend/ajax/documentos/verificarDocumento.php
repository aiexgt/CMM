<?php

$ruta = $_POST['ruta'];

$final = file_exists("../../../img/$ruta");

echo $final;

?>