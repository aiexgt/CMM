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
$fecha = $_POST['fechat'];
$fechatemp = strtotime($fi);
$fecha_inicio = date("d-m-Y", $fechatemp);
$fechatemp = strtotime($ff);
$fecha_fin = date("d-m-Y", $fechatemp);
$fechatemp = strtotime($fecha);
$fecha = date("d-m-Y", $fechatemp);
$tipo = $_POST['tipo'];
$asunto = $_POST['asunto'];
$descripcion = $_POST['descripcion'];
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
if($tipo == 0){
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
        .iz{
            text-align: right;
        }
    </style>
    <div class='bod'>
        <center>
            <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
            <h1>".$row['empresa']."</h1>
            <h2>CONSTANCIA DE AUSENCIA JUSTIFICADA</h2>
        </center>
        <div class='texto'>
            <p class='iz'><b>Fecha: </b>".$fecha." </p>
            <p><b>Nombre del empleado: </b>".$row['nombre']." ".$row['apellido']."</p>
            <p><b>Cargo que desempeña: </b>".$row['puesto']."</p>
            <p><b>Fechas: </b>".$fecha_inicio." - ".$fecha_fin." (".$cantidad." día(s))</p>
            <p><b>Asunto: </b>".$asunto."</p><br>
            <p>".$descripcion."</p>
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
            </center>
        </div>
    </div>
    ");
}else{
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
        .iz{
            text-align: right;
        }
    </style>
    <div class='bod'>
        <center>
            <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
            <h1>".$row['empresa']."</h1>
            <h2>CONSTANCIA DE AUSENCIA NO JUSTIFICADA</h2>
        </center>
        <div class='texto'>
            <p class='iz'><b>Fecha: </b>".$fecha." </p>
            <p><b>Nombre del empleado: </b>".$row['nombre']." ".$row['apellido']."</p>
            <p><b>Cargo que desempeña: </b>".$row['puesto']."</p>
            <p><b>Fechas: </b>".$fecha_inicio." - ".$fecha_fin." (".$cantidad." día(s))</p>
            <p><b>Asunto: </b>".$asunto."</p><br>
            <p>".$descripcion."</p>
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
            </center>
        </div>
    </div>
    ");
}
$dompdf->render();
$contenido = $dompdf->output();

$query = "SELECT id FROM ausencias ORDER BY id DESC LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

$row = mysqli_fetch_assoc($result);

$nombreDelDocumento = "../../img/doc-ausencias/".$row['id'].".pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);

?>