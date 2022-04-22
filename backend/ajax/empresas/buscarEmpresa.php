<?php
	//* Enlace BD
	include("../../conexion.php");

    $busqueda = $_POST['busqueda'];

	$data = ' <table class="table table-striped table-hover">
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
					<th scope="col"></th>
				</tr>
				</thead>
				<tbody id="body-table">';

	$query = "SELECT codigo, nombre, nit, email_principal, telefono FROM empresas WHERE 
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
				<td class="codigo'.$number.'">'.$row['codigo'].'</td>
				<td class="nombre'.$number.'">'.$row['nombre'].'</td>
				<td class="nit'.$number.'">'.$row['nit'].'</td>
				<td class="email_principal'.$number.'">'.$row['email_principal'].'</td>
				<td class="telefono'.$number.'">'.$row['telefono'].'</td>
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
    	$data .= '<tr><td colspan="6">No hay empresas!</td></tr>';
    }

    $data .= '</tbody>
	</table>';

    echo $data;
?>