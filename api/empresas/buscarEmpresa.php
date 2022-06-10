<?php
	//* Enlace BD
	include("../conexion.php");

    $busqueda = $_POST['busqueda'];

	$data = ' <div class="table-responsive-sm">
				<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Codigo</th>
					<th scope="col">Nombre</th>
					<th scope="col">Nit</th>
					<th scope="col">Email</th>
					<th scope="col">Telefono</th>
					<th scope="col"></th>
					<th scope="col"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT id, codigo, nombre, nit, email_principal, telefono FROM empresas WHERE 
    codigo LIKE '%$busqueda%' OR nombre LIKE '%$busqueda%' OR nit LIKE '%$busqueda%' ORDER BY id ASC LIMIT 15";

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
				<td>'.$row['codigo'].'</td>
				<td>'.$row['nombre'].'</td>
				<td>'.$row['nit'].'</td>
				<td>'.$row['email_principal'].'</td>
				<td>'.$row['telefono'].'</td>
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
    	$data = '<h4>No hay resultados para la busqueda!</h4>';
    }

    $data .= '</tbody>
	</table></div>';

    echo $data;
?>