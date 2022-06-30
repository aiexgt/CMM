<?php
	//* Enlace BD
	include("../conexion.php");

	$data = ' <div class="table-responsive-sm">
	<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Empresa</th>
					<th scope="col">Fecha Inicio</th>
					<th scope="col">Fecha Fin</th>
					<th scope="col"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT r.id, r.fecha_inicio, r.fecha_fin, (SELECT e.nombre FROM empresas e WHERE e.id = r.empresa_id) AS empresa 
	FROM reporte_empleados r ORDER BY r.id DESC LIMIT 15";

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
				<td id="id'.$number.'" hidden>'.$row['id'].'</td>
				<td>'.$row['empresa'].'</td>
				<td>'.$row['fecha_inicio'].'</td>
				<td>'.$row['fecha_fin'].'</td>';
				
			$data .= '
				<td>
					<button onclick="ver('.$row['id'].')" class="btn btn-success"><i class="bx bx-search"></i></button>
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
	</table></div>';

    echo $data;
?>