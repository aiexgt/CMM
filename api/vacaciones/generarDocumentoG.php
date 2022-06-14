<?php

include("../conexion.php");

$trabajador = $_POST['trabajador'];
$fi = $_POST['fecha'];
$ff = $_POST['fecha_fin'];
$cantidad = $_POST['cantidad'];
if($cantidad == 1){
    $tcantidad = "1 día";
}else{
    $tcantidad = $cantidad." días";
}
$periodo = $_POST['periodo'];
$fecha = date('d-m-Y');
$fechatemp = strtotime($fi);
$fecha_inicio = date("d-m-Y", $fechatemp);
$fechatemp = strtotime($ff);
$fecha_fin = date("d-m-Y", $fechatemp);
$espaciado = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

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
        line-height: 2em;
    }
    .logo{
        height: 100px;
    }
</style>
<div class='bod'>
    <center>
        <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
        <h1>".$row['empresa']."</h1>
        <h2>CONSTANCIA DE GOCE DE VACACIONES</h2>
    </center>
    <div class='texto'>
        <p><b>Fecha: </b>".$fecha." </p>
        <p><b>Nombre del empleado: </b>".$row['nombre']." ".$row['apellido']."</p>
        <p><b>Cargo que desempeña: </b>".$row['puesto']."</p>
        <p>Por medio de la presente hago constar que gocé ".$tcantidad." del periodo 
        de vacaciones correspondientes al año ".$periodo.". Del ".$fecha_inicio." 
        al ".$fecha_fin.", de acuerdo con la Solicitud de Vacaciones con fecha de.
        Reanudando mis labores el .</p>
        <br>
        <center>
            <div>
                <p>___________________________
                ".$espaciado."
                ___________________________</p>
                <p>Firma EmpleadoVo.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                ".$espaciado."
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bo. Jefe Inmediato</p>
            </div>
            <br>
            <p>___________________________</p>
            <p>Gerente de Recursos Humanos</p>
            <p>".$row['empresa']."</p>
        </center>
        <p>En cumplimiento con lo establecido en el <b>Articulo 137</b> del Código de Trabajo DECRETO 1441. </p>
    </div>
</div>
");
$dompdf->render();
$contenido = $dompdf->output();

$query = "SELECT id FROM vacaciones ORDER BY id DESC LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

$row = mysqli_fetch_assoc($result);

$nombreDelDocumento = "../../img/doc-vacacionesg/".$row['id'].".pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);

?>