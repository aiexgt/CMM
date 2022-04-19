<?php
	//* Enlace BD
	include("../conexion.php");

	$data = '';

	$query = "SELECT u.id, u.nombre, u.apellido, u.cui, (SELECT p.nombre FROM puestos p WHERE p.id = u.puesto_id) 
	AS puesto, (SELECT e.nombre FROM estado_trabajo e WHERE e.id = u.estado_trabajo_id) AS estado FROM personas u ORDER BY u.id, u.puesto_id ASC";

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
				<td class="apellido'.$number.'">'.$row['apellido'].'</td>
				<td class="dpi'.$number.'">'.$row['cui'].'</td>
				<td class="puesto'.$number.'">'.$row['puesto'].'</td>
				<td class="estado'.$number.'">'.$row['estado'].'</td>
				<td>
					<button onclick="GetUserDetails('.$number.')" class="btn btn-success"><i class="bx bx-show"></i></button>
				</td>
				<td>
					<button onclick="DeleteUser('.$number.')" class="btn btn-primary"><i class="bx bx-user"></i></button>
				</td>
				<td>
					<button onclick="DeleteUser('.$number.')" class="btn btn-danger"><i class="bx bx-trash"></i></button>
				</td>
    		</tr>';
    		$number++;
    	}
    }
    else
    {
    	// records now found 
    	$data .= '<tr><td colspan="6">No hay médidas!</td></tr>';
    }

    $data .= '</tbody>
	</table>';

    echo $data;
?>