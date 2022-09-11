<?php
	//* Enlace BD
	include("../conexion.php");

	$data = ' <div class="table-responsive-sm">
	<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">Id</th>
					<th scope="col">Asunto</th>
					<th scope="col">Descripción</th>
					<th scope="col">Fecha</th>
					<th scope="col">Usuario</th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT * FROM bitacora ORDER BY id DESC LIMIT 200";

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
				<td><b>'.$row['id'].'</b></td>
				<td>'.$row['asunto'].'</td>
				<td>'.$row['descripcion'].'</td>
				<td>'.$row['fecha'].'</td>
                <td>'.$row['usuario_id'].'</td>
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