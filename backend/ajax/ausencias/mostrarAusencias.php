<?php
	//* Enlace BD
	include("../../conexion.php");

	$data = ' <table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Tipo</th>
					<th scope="col">Asunto</th>
					<th scope="col">Trabajador</th>
					<th scope="col">Fecha</th>
					<th scope="col">Usuario</th>
                    <th scope="col"></th>
					<th scope="col"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT a.tipo, a.id, a.asunto, (SELECT p.nombre FROM personas p WHERE p.id = a.persona_id) AS persona,
	(SELECT p.apellido FROM personas p WHERE p.id = a.persona_id) AS apersona,
    a.fecha_inicio, (SELECT u.nombre FROM usuarios u WHERE u.id = a.usuario_id) AS usuario,
	(SELECT u.apellido FROM usuarios u WHERE u.id = a.usuario_id) AS ausuario FROM ausencias a ORDER BY a.id ASC";

	if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    // if query results contains rows then featch those rows 
    if(mysqli_num_rows($result) > 0)
    {
    	$number = 1;
    	while($row = mysqli_fetch_assoc($result))
    	{
    		$data .= '<tr>
				<td><b>'.$number.'</b></td>
				<td class="id'.$number.'" hidden>'.$row['id'].'</td>';
			if($row['tipo'] == 0){
				$data .= '<td class="tipo'.$number.'">Justificada</td>';
			}else{
				$data .= '<td class="tipo'.$number.'">No Justificada</td>';
			}

			$data .='<td class="asunto'.$number.'">'.$row['asunto'].'</td>
                <td class="persona'.$number.'">'.$row['persona']." ".$row['apersona'].'</td>
                <td class="fecha'.$number.'">'.$row['fecha_inicio'].'</td>
                <td class="usuario'.$number.'">'.$row['usuario']." ".$row['ausuario'].'</td>';		
			$data .= '<td>
					<button onclick="ver('.$number.')" class="btn btn-success"><i class="bx bx-edit"></i></button>
				</td>
				<td>
					<button onclick="eliminar('.$number.')" class="btn btn-danger"><i class="bx bx-trash"></i></button>
				</td>
    		</tr>';
    		$number++;
    	}
    }
    else
    {
    	$data = '<h4>No hay resultados para la busqueda!</h4>';
    }

    $data .= '</tbody>
	</table>';

    echo $data;
?>