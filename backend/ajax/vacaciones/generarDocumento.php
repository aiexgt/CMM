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

require('../../../assets/imported/fpdf184/fpdf.php');

// create document
$pdf = new FPDF();
$pdf->AddPage();
    
// config document
$pdf->SetTitle('Generar archivos PDF con PHP');
$pdf->SetAuthor('Kodetop');
$pdf->SetCreator('FPDF Maker');
    
// add title
$pdf->Image('../../../img/logo-empresas/'.$row['empresa_id'].'.jpg   ', 68, null, 75, null,'jpg');
$pdf->SetFont('Arial', 'B', 24);
$pdf->Cell(0, 10, $row['empresa'] , 0, 1);
$pdf->SetFont('Arial', 'B', 18);
$pdf->Cell(0, 10, "Solicitud de Vacaciones" , 0, 1);
$pdf->Ln();
    
// add text
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 7, utf8_decode('Fecha: '.$fecha), 0, 1);
$pdf->MultiCell(0, 7, utf8_decode('Nombre del empleado: '.$row['nombre'].' '.$row['apellido']), 0, 1);
$pdf->MultiCell(0, 7, utf8_decode('Cargo que desempeña: '.$row['puesto']), 0, 1);
$pdf->Ln();
$pdf->MultiCell(0, 7, utf8_decode('Por medio de la presente, solicito me sea autorizado '.$cantidad.' días(s) a cuenta de mis vacaciones correspondientes al periodo del 2022, conforme al programa de vacaciones del personal que la empresa fije en atención a las necesidades de la actividad de la misma, para ser gozados del '.$fecha_inicio.' al '.$fecha_fin.'.'), 0, 1);
$pdf->Ln();
    
// add image

    
// output file
$pdf->Output('F', 'fpdf-complete.pdf');

?>