<?php

include("../conexion.php");

$fechaInicio = $_POST['fechaInicio'];
$fechaFin = $_POST['fechaFin'];

$fechaInicio2 = strtotime($fechaInicio);
$fechaInicio2 = date("d-m-Y", $fechaInicio2);

$fechaFin2 = strtotime($fechaFin);
$fechaFin2 = date("d-m-Y", $fechaFin2);

$empresa = $_POST['empresa'];

$inicioRelacion = "";
$finRelacion = "";
$suspensionIGSS = "";
$noJustificada = "";

$query = "SELECT p.nombre, p.apellido, p.fecha_inicio, 
(SELECT pu.nombre FROM puestos pu WHERE pu.id = p.puesto_id) AS puesto, 
p.periodo_prueba FROM personas p
WHERE (('".$fechaInicio."' BETWEEN p.fecha_inicio AND p.periodo_prueba) OR (
'".$fechaFin."' BETWEEN p.fecha_inicio AND p.periodo_prueba)) AND p.empresa_id = ".$empresa;

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if (mysqli_num_rows($result) > 0) {
    $inicioRelacion .= "
        <div class='texto'>
            <h4>DATOS EMPLEADOS QUE INICIARON RELACION LABORAL RECIENTEMENTE EN PERIODO DE PRUEBA POR 2 MESES.</h4>
            <table>
                <thead>
                    <tr style='background-color:#F5BB50;'>
                        <th>NOMBRE</th>
                        <th>EN PERIODO DE PRUEBA</th>
                        <th>OBSERVACIONES</th>
                    </tr>
                </thead>
                ";
    while($row = mysqli_fetch_assoc($result)){
        $dias = (strtotime($fechaFin)-strtotime($row['fecha_inicio']))/86400;
        $fechaIL = strtotime($row['fecha_inicio']);
        $fechaIL = date("d-m-Y", $fechaIL);
        $fechaP = strtotime($row['periodo_prueba']);
        $fechaP = date("d-m-Y", $fechaP);

        $inicioRelacion .= "
            <tr>
                <td>".$row['nombre']." <br>".$row['apellido']."</td>
                <td>".$dias." días</td>
                <td><b>Inicio Relación Laboral: </b>".$fechaIL." <br>
                <b>Puesto: </b>".$row['puesto']." <br>
                Periodo de Prueba del <br> ".$fechaIL." al ".$fechaP."</td>
            </tr>
        ";
    }
    $inicioRelacion .= "
                <tbody></tbody>
            </table>
        </div>
        ";
}

$query = "SELECT p.nombre, p.apellido, p.fecha_inicio, 
p.fecha_finalizacion FROM personas p
WHERE (p.fecha_finalizacion BETWEEN '".$fechaInicio."' AND '".$fechaFin."')  AND p.empresa_id = ".$empresa;

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if (mysqli_num_rows($result) > 0) {
    $finRelacion .= "
        <div class='break'></div>
        <div class='texto'>
            <h4>DATOS EMPLEADOS QUE TERMINARON RELACION LABORAL RECIENTEMENTE.</h4>
            <table>
                <thead>
                    <tr style='background-color:#F55050;'>
                        <th>NOMBRE</th>
                        <th>FECHA TERMINACION DE LA RELACION LABORAL</th>
                        <th>OBSERVACIONES</th>
                    </tr>
                </thead>
                ";
    while($row = mysqli_fetch_assoc($result)){
        $fechaF = strtotime($row['fecha_finalizacion']);
        $fechaF = date("d-m-Y", $fechaF);
        $fechaIL = strtotime($row['fecha_inicio']);
        $fechaIL = date("d-m-Y", $fechaIL);

        $finRelacion .= "
            <tr>
                <td>".$row['nombre']." <br>".$row['apellido']."</td>
                <td>".$fechaF."</td>
                <td><b>Inicio Relación Laboral: </b>".$fechaIL." <br>
                <b>Fecha Fin: </b>".$fechaF." <br>
                Tipo Despido: Directo</td>
            </tr>
        ";
    }
    $finRelacion .= "
                <tbody></tbody>
            </table>
        </div>
        ";
}

$query = "SELECT (SELECT p.nombre FROM personas p WHERE p.id = a.persona_id) AS nombre,
(SELECT p.apellido FROM personas p WHERE p.id = a.persona_id) AS apellido, a.fecha_inicio,
a.fecha_fin  FROM ausencias a
WHERE (a.fecha_inicio BETWEEN '".$fechaInicio."' AND '".$fechaFin."') AND a.tipo = 2 AND 
(SELECT p.empresa_id FROM personas p WHERE p.id = a.persona_id) = ".$empresa;

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if (mysqli_num_rows($result) > 0) {
    $suspensionIGSS .= "
    <div class='break'></div>
        <div class='texto'>
            <h4>DATOS EMPLEADOS SUSPENDIDOS POR ENFERMEDAD COMUN POR EL IGSS.</h4>
            <table>
                <thead>
                    <tr style='background-color:#50F550;'>
                        <th>NOMBRE</th>
                        <th>FECHA DE NOTIFICACION DE SUSPENCION</th>
                        <th>OBSERVACIONES</th>
                    </tr>
                </thead>
                ";
    while($row = mysqli_fetch_assoc($result)){
        $fechaF = strtotime($row['fecha_fin']);
        $fechaF = date("d-m-Y", $fechaF);
        $fechaIL = strtotime($row['fecha_inicio']);
        $fechaIL = date("d-m-Y", $fechaIL);

        $suspensionIGSS .= "
            <tr>
                <td>".$row['nombre']." <br>".$row['apellido']."</td>
                <td>".$fechaIL."</td>
                <td><b>Inicio Suspensión: </b>".$fechaIL." <br>
                <b>Fin Suspensión: </b>".$fechaF."</td>
            </tr>
        ";
    }
    $suspensionIGSS .= "
                <tbody></tbody>
            </table>
        </div>
        ";
}

$query = "SELECT (SELECT p.nombre FROM personas p WHERE p.id = a.persona_id) AS nombre,
(SELECT p.apellido FROM personas p WHERE p.id = a.persona_id) AS apellido, a.fecha_inicio,
a.fecha_fin  FROM ausencias a
WHERE (a.fecha_inicio BETWEEN '".$fechaInicio."' AND '".$fechaFin."') AND a.tipo = 1 AND 
(SELECT p.empresa_id FROM personas p WHERE p.id = a.persona_id) = ".$empresa;

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

if (mysqli_num_rows($result) > 0) {
    $noJustificada .= "
    <div class='break'></div>
        <div class='texto'>
            <h4>DATOS EMPLEADOS CON AUSENCIAS NO JUSTIFICADAS.</h4>
            <table>
                <thead>
                    <tr style='background-color:#50F550;'>
                        <th>NOMBRE</th>
                        <th>FECHA DE NOTIFICACION DE LA AUSENCIA</th>
                        <th>OBSERVACIONES</th>
                    </tr>
                </thead>
                ";
    while($row = mysqli_fetch_assoc($result)){
        $fechaF = strtotime($row['fecha_fin']);
        $fechaF = date("d-m-Y", $fechaF);
        $fechaIL = strtotime($row['fecha_inicio']);
        $fechaIL = date("d-m-Y", $fechaIL);

        $noJustificada .= "
            <tr>
                <td>".$row['nombre']." <br>".$row['apellido']."</td>
                <td>".$fechaIL."</td>
                <td><b>Inicio Ausencia: </b>".$fechaIL." <br>
                <b>Fin Ausencia: </b>".$fechaF."</td>
            </tr>
        ";
    }
    $noJustificada .= "
                <tbody></tbody>
            </table>
        </div>
        ";
}

$query2 = "SELECT nombre FROM empresas WHERE id = ".$empresa."";

if (!$result2 = mysqli_query($con, $query2)) {
    exit(mysqli_error($con));
}
if(mysqli_num_rows($result2) > 0)
    {
        $row2 = mysqli_fetch_assoc($result2);
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
            line-height: 1.2em;
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
        table{
            text-align: justify;
            border-spacing: 0;
        }
        th, td{
            border: 1px solid #000;
            padding: 10px;
        }
    </style>
    <div class='bod'>
        <center>
            <img class='logo' src='../../img/logo-empresas/" . $empresa . ".jpg'/>
            <h1>" . $row2['nombre'] . "</h1>
            <h3>INFORME DE REGISTROS DE PERSONAL</h3>
            <h3>DEL ".$fechaInicio2." al ".$fechaFin2."</h3>
        </center>
        ".$inicioRelacion."
        ".$finRelacion."
        ".$suspensionIGSS."
        ".$noJustificada."
    </div>
    ");

$dompdf->render();
$contenido = $dompdf->output();

$query = "SELECT id FROM reporte_empleados ORDER BY id DESC LIMIT 1";

if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

$row = mysqli_fetch_assoc($result);

$nombreDelDocumento = "../../img/rep-empleados/" . $row['id'] . ".pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);

echo $bytes;