<?php
	//* Enlace BD
	include("../../conexion.php");

	$data = ' <table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Nombre</th>
					<th scope="col">Apellido</th>
					<th scope="col">DPI</th>
					<th scope="col">Puesto</th>
					<th scope="col">Empresa</th>
					<th scope="col">Estado</th>
					<th scope="col col-lg-2"></th>
					<th scope="col col-lg-2"></th>
					<th scope="col col-lg-2"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT u.id, u.nombre, u.apellido, u.cui, (SELECT p.nombre FROM puestos p WHERE p.id = u.puesto_id) 
	AS puesto,(SELECT em.nombre FROM empresas em WHERE em.id = u.empresa_id) AS empresa, (SELECT e.nombre FROM estado_trabajo e WHERE e.id = u.estado_trabajo_id) AS estado FROM personas u ORDER BY u.nombre, u.puesto_id ASC";

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
				<td class="empresa'.$number.'">'.$row['empresa'].'</td>
				<td class="estado'.$number.'">'.$row['estado'].'</td>
				<td>
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
    	// records now found 
    	$data .= '<tr><td colspan="6">No hay médidas!</td></tr>';
    }

    $data .= '</tbody>
	</table>';

    echo $data;
?>