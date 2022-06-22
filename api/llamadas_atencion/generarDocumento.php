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

if($anterior != 0){
    $subquery = "SELECT fecha FROM llamada_atencion WHERE id = $anterior";
    if (!$result2 = mysqli_query($con, $subquery)) {
        exit(mysqli_error($con));
    }
    $row2 = mysqli_fetch_assoc($result2);
    $fechaant = $row2['fecha'];
    $fechaant = strtotime($fechaant);
    $fechaant = date("d-m-Y",$fechaant);
}

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
if($nivel == 1){
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
    </style>
    <div class='bod'>
        <center>
            <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
            <h1>".$row['empresa']."</h1>
            <h2 class='titulo'>CONSTANCIA DE LLAMADA DE ATENCIÓN ORAL</h2>
        </center>
        <div class='texto'>
            <p class='iz'><b>Fecha: </b>".$fecha." </p>
            <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
            ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
            entidad comercial <b>".$row['empresa']."</b> que esta constituye <b>LLAMADA DE 
            ATENCIÓN ORAL</b>, hacia su persona por los siguientes motivos: ".$asunto." - ".
            $observaciones.", dichos actos infringen la normatica interna de trabajo, por lo 
            que hago de su conocimiento que su reincidencia en situaciones, conductas o actitudes 
            de la misma naturaleza o de diferente pero que de igual manera infrinjan la 
            normativa mencionada, derivaran en la aplicación de medidas y sanciones que 
            correspondan.</p>
            <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
            <p>________________________________ <br> Firma de Empleado Notificado</p>
        </div>
    </div>
    ");
}else if($nivel == 2){
    if($anterior == 0){
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
                background-color: #F2E205;
            }
            .iz{
                text-align: right;
            }
        </style>
        <div class='bod'>
            <center>
                <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
                <h1>".$row['empresa']."</h1>
                <h2 class='titulo'>CONSTANCIA DE PRIMERA LLAMADA DE ATENCIÓN ESCRITA</h2>
            </center>
            <div class='texto'>
                <p class='iz'><b>Fecha: </b>".$fecha." </p>
                <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
                ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
                entidad comercial <b>".$row['empresa']."</b> que esta constituye la <b>PRIMERA LLAMADA
                DE ATENCIÓN ESCRITA</b>, hacia su persona por los siguientes motivos: ".$asunto." - ".
                $observaciones.", dichos actos infringen la normativa 
                interna de trabajo, y serán calificados conforme a la normativa interna y la ley, 
                determinando el grado de gravedad que constituyen así como las sanciones correspondientes 
                al caso. Por lo que hago de su conocimiento que su reincidencia en situaciones, conductas o 
                actitudes de la misma naturaleza o de diferente pero que de igual manera infrinjan la 
                normativa mencionada, derivara en la aplicación de médidas y sanciones que correspondan.</p>
                <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
                <p>________________________________ <br> Firma de Empleado Notificado</p>
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
                line-height: 1.5em;
            }
            .logo{
                height: 80px;
            }
            .titulo{
                padding: 10px;
                padding-left: 50px;
                padding-right: 50px;
                background-color: #F2E205;
            }
            .iz{
                text-align: right;
            }
        </style>
        <div class='bod'>
            <center>
                <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
                <h1>".$row['empresa']."</h1>
                <h2 class='titulo'>CONSTANCIA DE PRIMERA LLAMADA DE ATENCIÓN ESCRITA</h2>
            </center>
            <div class='texto'>
                <p class='iz'><b>Fecha: </b>".$fecha." </p>
                <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
                ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
                entidad comercial <b>".$row['empresa']."</b> que esta constituye la <b>PRIMERA LLAMADA
                DE ATENCIÓN ESCRITA</b>, hacia su persona, en referencia a la LLAMADA DE ATENCIÓN 
                de fecha ".$fechaant." por reincidencia en la conducta, actos o situaciones, etc. O 
                por los siguientes mótivos ".$asunto." - ".$observaciones.", dichos actos infringen la normativa 
                interna de trabajo, y serán calificados conforme a la normativa interna y la ley, 
                determinando el grado de gravedad que constituyen así como las sanciones correspondientes 
                al caso. Por lo que hago de su conocimiento que su reincidencia en situaciones, conductas o 
                actitudes de la misma naturaleza o de diferente pero que de igual manera infrinjan la 
                normativa mencionada, derivara en la aplicación de médidas y sanciones que correspondan.</p>
                <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
                <p>________________________________ <br> Firma de Empleado Notificado</p>
            </div>
        </div>
        ");
    }
}else if($nivel == 3){
    if($anterior == 0){
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
                background-color: #E45803;
            }
            .iz{
                text-align: right;
            }
        </style>
        <div class='bod'>
            <center>
                <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
                <h1>".$row['empresa']."</h1>
                <h2 class='titulo'>CONSTANCIA DE SEGUNDA LLAMADA DE ATENCIÓN ESCRITA</h2>
            </center>
            <div class='texto'>
                <p class='iz'><b>Fecha: </b>".$fecha." </p>
                <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
                ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
                entidad comercial <b>".$row['empresa']."</b> que esta constituye la <b>SEGUNDA LLAMADA
                DE ATENCIÓN ESCRITA</b>, hacia su persona por los siguientes motivos: ".$asunto." - ".
                $observaciones.", dichos actos infringen la normativa 
                interna de trabajo, y serán calificados conforme a la normativa interna y la ley, 
                determinando el grado de gravedad que constituyen así como las sanciones correspondientes 
                al caso que serán notificadas en el momento oportuno. Las que en función de su gravedad 
                irán desde la suspensión por periodo determinado sin goce de sueldo hasta la terminación 
                del contrato laboral. Por lo que hago de su conocimiento que su reicidencia en situaciones, 
                conductas o actitudes de la misma naturaleza o de diferente pero que de igual manera 
                infrinjan la noramtiva mencionada, derivaran en la aplicación de medidas y sanciones que 
                correspondan.</p>
                <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
                <p>________________________________ <br> Firma de Empleado Notificado</p>
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
                line-height: 1.5em;
            }
            .logo{
                height: 80px;
            }
            .titulo{
                padding: 10px;
                padding-left: 50px;
                padding-right: 50px;
                background-color: #E45803;
            }
            .iz{
                text-align: right;
            }
        </style>
        <div class='bod'>
            <center>
                <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
                <h1>".$row['empresa']."</h1>
                <h2 class='titulo'>CONSTANCIA DE SEGUNDA LLAMADA DE ATENCIÓN ESCRITA</h2>
            </center>
            <div class='texto'>
                <p class='iz'><b>Fecha: </b>".$fecha." </p>
                <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
                ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
                entidad comercial <b>".$row['empresa']."</b> que esta constituye la <b>SEGUNDA LLAMADA
                DE ATENCIÓN ESCRITA</b>, hacia su persona, en referencia a la LLAMADA DE ATENCIÓN 
                de fecha ".$fechaant." por reincidencia en la conducta, actos o situaciones, etc. O 
                por los siguientes mótivos ".$asunto." - ".$observaciones.", dichos actos infringen la normativa 
                interna de trabajo, y serán calificados conforme a la normativa interna y la ley, 
                determinando el grado de gravedad que constituyen así como las sanciones correspondientes 
                al caso que serán notificadas en el momento oportuno. Las que en función de su gravedad 
                irán desde la suspensión por periodo determinado sin goce de sueldo hasta la terminación 
                del contrato laboral. Por lo que hago de su conocimiento que su reicidencia en situaciones, 
                conductas o actitudes de la misma naturaleza o de diferente pero que de igual manera 
                infrinjan la noramtiva mencionada, derivaran en la aplicación de medidas y sanciones que 
                correspondan.</p>
                <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
                <p>________________________________ <br> Firma de Empleado Notificado</p>
            </div>
        </div>
        ");
    }
}else if($nivel == 4){
    if($anterior == 0){
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
                background-color: #D62534;
            }
            .iz{
                text-align: right;
            }
        </style>
        <div class='bod'>
            <center>
                <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
                <h1>".$row['empresa']."</h1>
                <h2 class='titulo'>CONSTANCIA DE TERCERA LLAMADA DE ATENCIÓN ESCRITA</h2>
            </center>
            <div class='texto'>
                <p class='iz'><b>Fecha: </b>".$fecha." </p>
                <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
                ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
                entidad comercial <b>".$row['empresa']."</b> que esta constituye la <b>TERCERA LLAMADA
                DE ATENCIÓN ESCRITA</b>, hacia su persona por los siguientes motivos: ".$asunto." - ".
                $observaciones.", dichos actos infringen la normativa 
                interna de trabajo, y serán calificados conforme a la normativa interna y la ley, 
                determinando el grado de gravedad que constituyen. Derivado de la gravedad de dichos 
                hechos, se ha llevado a cabo el proceso de investigación, recolección de medios probatorios 
                y audiencia de descargo al empleado, por lo que a partir de esta fecha ".$fecha." 
                Y con fundamento en el Artículo 77 del Código de Trabajo DECRETO 1441, el cual otorga la 
                facultad de rescindir la relación laboral por motivos: justificados, se ha tomado la decisión 
                irrevocable de dar por terminado su contrato laboral. Por lo que por este medio y en cumplimiento 
                a lo regulado en el Artículo 78 del Código de Trabajo DECRETO 1441, se constituye la 
                <b>NOTIFICACION ESCRITA DE DESPIDO.</b></p>
                <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
                <p>________________________________ <br> Firma de Empleado Notificado</p>
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
                line-height: 1.5em;
            }
            .logo{
                height: 80px;
            }
            .titulo{
                padding: 10px;
                padding-left: 50px;
                padding-right: 50px;
                background-color: #D62534;
            }
            .iz{
                text-align: right;
            }
        </style>
        <div class='bod'>
            <center>
                <img class='logo' src='../../img/logo-empresas/".$row['empresa_id'].".jpg'/>
                <h1>".$row['empresa']."</h1>
                <h2 class='titulo'>CONSTANCIA DE TERCERA LLAMADA DE ATENCIÓN ESCRITA</h2>
            </center>
            <div class='texto'>
                <p class='iz'><b>Fecha: </b>".$fecha." </p>
                <p>Por medio de la presente se hace constar y se le notifica a ".$row['nombre']." 
                ".$row['apellido']." quien desempeña el cargo de ".$row['puesto']." dentro de la 
                entidad comercial <b>".$row['empresa']."</b> que esta constituye la <b>TERCERA LLAMADA
                DE ATENCIÓN ESCRITA</b>, hacia su persona, en referencia a la LLAMADA DE ATENCIÓN 
                de fecha ".$fechaant." por reincidencia en la conducta, actos o situaciones, etc. O 
                por los siguientes mótivos ".$asunto." - ".$observaciones.", dichos actos infringen la normativa 
                interna de trabajo, y serán calificados conforme a la normativa interna y la ley, 
                determinando el grado de gravedad que constituyen. Derivado de la gravedad de dichos 
                hechos, se ha llevado a cabo el proceso de investigación, recolección de medios probatorios 
                y audiencia de descargo al empleado, por lo que a partir de esta fecha ".$fecha." 
                Y con fundamento en el Artículo 77 del Código de Trabajo DECRETO 1441, el cual otorga la 
                facultad de rescindir la relación laboral por motivos: justificados, se ha tomado la decisión 
                irrevocable de dar por terminado su contrato laboral. Por lo que por este medio y en cumplimiento 
                a lo regulado en el Artículo 78 del Código de Trabajo DECRETO 1441, se constituye la 
                <b>NOTIFICACION ESCRITA DE DESPIDO.</b></p>
                <p class='iz'><b>Departamento de Recursos Humanos <br> ".$row['empresa']."</b></p>
                <p>________________________________ <br> Firma de Empleado Notificado</p>
            </div>
        </div>
        ");
    }
}

$dompdf->render();
$contenido = $dompdf->output();

$query = "SELECT id FROM llamada_atencion ORDER BY id DESC LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

$row = mysqli_fetch_assoc($result);

$nombreDelDocumento = "../../img/doc-llamadas/".$row['id'].".pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);
