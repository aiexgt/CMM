<?php

include("../../conexion.php");

$trabajador = $_POST['trabajador'];
$fi = $_POST['fecha'];
$ff = $_POST['fecha_fin'];
$cantidad = $_POST['cantidad'];
$fecha = date('m-d-Y');
$periodo = "";
$fechatemp = strtotime($fi);
$fecha_inicio = date("m-d-Y", $fechatemp);
$fechatemp = strtotime($ff);
$fecha_fin = date("m-d-Y", $fechatemp);
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

include_once "../../../assets/imported/dompdf/vendor/autoload.php";
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
        line-height: 2.5em;
    }
    .logo{
        height: 100px;
    }
</style>
<div class='bod'>
    <center>
        <img class='logo' src='../../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
        <h1>".$row['empresa']."</h1>
        <h2>SOLICITUD DE VACACIONES</h2>
    </center>
    <div class='texto'>
        <p><b>Fecha: </b>".$fecha." </p>
        <p><b>Nombre del empleado: </b>".$row['nombre']." ".$row['apellido']."</p>
        <p><b>Cargo que desempeña: </b>".$row['puesto']."</p>
        <p>Por medio de la presente, solicito me sea autorizado ".$cantidad." días(s) 
        a cuenta de mis vacaciones correspondientes al periodo del 2021-2022, conforme al 
        programa de vacaciones del personal que la empresa fije en atención a las 
        necesidades de la actividad de la misma, para ser gozados del ".$fecha_inicio." 
        al ".$fecha_fin.".</p>
        <br><br>
        <center>
            <div>
                <p>___________________________
                ".$espaciado."
                ___________________________</p>
                <p>Firma EmpleadoVo.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                ".$espaciado."
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bo. Jefe Inmediato</p>
            </div>
        </center>
    </div>
</div>
");
$dompdf->render();
$contenido = $dompdf->output();
$nombreDelDocumento = "1_hola.pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);

?>