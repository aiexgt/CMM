<?php
	//* Enlace BD
	include("../conexion.php");

	$data = ' <div class="table-responsive-sm">
	<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Nombre</th>
					<th scope="col">Apellido</th>
					<th scope="col">Usuario</th>
					<th scope="col">Rol</th>
					<th scope="col">Estado</th>
					<th scope="col"></th>
					<th scope="col"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT u.id, u.nombre, u.apellido, u.usuario, (SELECT r.nombre FROM roles r WHERE r.id = u.rol_id) AS rol, u.estado FROM usuarios u ORDER BY u.id ASC LIMIT 15";

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
				<td>'.$row['nombre'].'</td>
				<td>'.$row['apellido'].'</td>
				<td>'.$row['usuario'].'</td>
				<td>'.$row['rol'].'</td>';
				if($row['estado'] == "1"){
					$data .= '<td>Activo</td>';
				}else{
					$data .= '<td>Inactivo</td>';
				}
				
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
	</table></div>';

    echo $data;
?>