<?php
	//* Enlace BD
	include("../../conexion.php");

	$data = ' <table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Nombre</th>
					<th scope="col">Descripción</th>
					<th scope="col"></th>
					<th scope="col"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT id, nombre, descripcion FROM estado_trabajo ORDER BY id ASC LIMIT 15";

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
				<td class="id'.$number.'" hidden>'.$row['id'].'</td>
				<td class="nombre'.$number.'">'.$row['nombre'].'</td>
				<td class="descripcion'.$number.'">'.$row['descripcion'].'</td>';				
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