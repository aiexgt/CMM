<?php

include("../conexion.php");

$trabajador = $_POST['trabajador'];
$fecha = $_POST['fecha'];
$fecha = strtotime($fecha);
$fecha = date("d-m-Y", $fecha);
$asunto = $_POST['asunto'];
$observaciones = $_POST['observaciones'];
$nivel = $_POST['nivel'];
$anterior = $_POST['anterior'];
$espaciado = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

if ($anterior != 0) {
    $subquery = "SELECT fecha FROM llamada_atencion WHERE id = $anterior";
    if (!$result2 = mysqli_query($con, $subquery)) {
        exit(mysqli_error($con));
    }
    $row2 = mysqli_fetch_assoc($result2);
    $fechaant = $row2['fecha'];
    $fechaant = strtotime($fechaant);
    $fechaant = date("d-m-Y", $fechaant);
}

$query = "SELECT p.nombre, p.apellido, p.empresa_id,
(SELECT pp.nombre FROM puestos pp WHERE pp.id = p.puesto_id) AS puesto,
(SELECT e.nombre FROM empresas e WHERE e.id = p.empresa_id) AS empresa
    FROM personas p WHERE p.id = $trabajador";

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
}

include_once "../../imported/dompdf/vendor/autoload.php";

use Dompdf\Dompdf;

$dompdf = new Dompdf();
$dompdf->loadHtml("
    <style>
        .bod{
            margin: 18px;
            font-family: Arial, Helvetica, sans-serif;
        }
        .texto{
            text-align: justify;
            line-height: 1.5em;
        }
        .logo{
            height: 80px;
        }
        .titulo{
            padding: 10px;
            padding-left: 50px;
            padding-right: 50px;
            background-color: #04D939;
        }
        .iz{
            text-align: right;
        }
        .break{
            page-break-after:always;
        }
    </style>
    <div class='bod'>
        <center>
            <img class='logo' src='../../img/logo-empresas/" . $row['empresa_id'] . ".jpg'/>
            <h1>" . $row['empresa'] . "</h1>
            <h3 class='titulo'>INFORME DE REGISTROS DE PERSONAL</h3>
            <h3>DEL ".$fecha_inicio." al ".$fecha_fin."</h3>
        </center>
        <div class='texto'>
        <h4>DATOS EMPLEADOS QUE INICIARON RELACION LABORAL RECIENTEMENTE EN PERIODO DE PRUEBA POR 2 MESES.</h4>
        <p></p>
        </div>
        <div class='break'></div>
        <div class='texto'>
        <h4>DATOS EMPLEADOS QUE TERMINARON RELACION LABORAL RECIENTEMENTE.</h4>
        <p></p>
        </div>
        <div class='break'></div>
        <div class='texto'>
        <h4>DATOS EMPLEADOS SUSPENDIDOS POR ENFERMEDAD COMUN POR EL IGSS.</h4>
        <p></p>
        </div>
    </div>
    ");

$dompdf->render();
$contenido = $dompdf->output();

$query = "SELECT id FROM llamada_atencion ORDER BY id DESC LIMIT 1";

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

$row = mysqli_fetch_assoc($result);

$nombreDelDocumento = "../../img/rep-empleados/" . $row['id'] . ".pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);
