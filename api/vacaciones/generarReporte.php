<?php

include("../conexion.php");

$empresa = $_POST['empresa'];
$fecha = $_POST['fecha'];
$number = 1;
$subdata = "";



$query = "SELECT nombre, apellido, fecha_inicio, 
vacaciones_disponibles, vacaciones_ocupadas,
TIMESTAMPDIFF(MONTH, fecha_inicio, '$fecha') AS dias_disponibles, 
DATE_ADD(fecha_inicio, INTERVAL (TIMESTAMPDIFF(MONTH, fecha_inicio, '$fecha')) MONTH) AS ultimo_mes
FROM personas
WHERE empresa_id = $empresa AND estado_trabajo_id IN(1,2);";

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if(mysqli_num_rows($result) > 0)
    {
        while($row = mysqli_fetch_assoc($result)){

            $fechatemp = strtotime($row['fecha_inicio']);
            $fecha_inicio = date("d-m-Y", $fechatemp);
            $vacaciones_ocupadas = $row['vacaciones_ocupadas'];
            $dias_disponibles = $row['dias_disponibles'];
            $periodo = date("Y", $fechatemp);
            while($vacaciones_ocupadas >= 15){
                $vacaciones_ocupadas -= 15;
                $periodo++;
            }

            $fecha1 = new DateTime($row['ultimo_mes']);
            $fecha2 = new DateTime($fecha);
            $diff = $fecha1->diff($fecha2);
            $diff = $diff->days;

            $saldoDias = ($dias_disponibles + ($diff/30))*1.25;



            $subdata .= '
                <tr>
                    <td>'.$number.'</td>
                    <td>'.$row['nombre'].' '.$row['apellido'].'</td>
                    <td>'.$fecha_inicio.'</td>
                    <td>'.$periodo.'-'.($periodo+1).'</td>
                    <td>'.$vacaciones_ocupadas.'</td>
                    <td>'.(15-$vacaciones_ocupadas).'</td>
                    <td>'.$row['vacaciones_ocupadas'].'</td>
                    <td>'.round(($saldoDias-$row['vacaciones_ocupadas']),2).'</td>
                </tr>
            ';
            $number++;
        }
        
    }

include_once "../../imported/dompdf/vendor/autoload.php";
use Dompdf\Dompdf;
$dompdf = new Dompdf();
$dompdf->set_paper('letter', 'landscape');
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
        height: 80px;
    }
    table{
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
        font-size:13px;
    }
    thead{
        background-color: #139ff3;
        color: #fff;
        border-spacing: 10px 10px;
    }
    .thead-art{
        background-color: #03A64A;
        color: #fff;
        border-spacing: 10px 10px;
    }
    th{
       padding: 10px 5px 10px 5px;
       border: 1px solid black;
    }
    td{
        padding: 10px 5px 10px 5px;
        border: 1px solid black;
    }
    .total{
        background-color: #C3DDEE;
        font-weight: bold;
    }
</style>
<div class='bod'>
    <center>
        <img class='logo' src='../../img/logo-empresas/".$empresa.".jpg'/>
        <h2>REPORTE VACACIONES</h2>
    </center>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Empleado</th>
                <th>Inicio Labores</th>
                <th>Ultimo Periodo Gozado</th>
                <th>Días Gozados Ultimo</th>
                <th>Días Disponibles Ultimo</th>
                <th>Días Ocupados Global</th>
                <th>Saldo Días</th>
            </tr>
        </thead>
        <tbody>
            ".$subdata."
        </tbody>
    </table>
</div>
");
$dompdf->render();
$contenido = $dompdf->output();

$nombreDelDocumento = "../../img/doc-vacacionesGen/reporte.pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);

?>