<?php
// include Database connection file
include("../../conexion.php");

// check request
if(isset($_POST['codigo']) && isset($_POST['codigo']) != "")
{
    // get User ID
    $codigo = $_POST['codigo'];

    // Get User Details
    $query = "SELECT * FROM empresas WHERE codigo = '$codigo'";
    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }
    $response = array();
    if(mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $response = $row;
        }
    }
    else
    {
        $response['status'] = 200;
        $response['message'] = "Data not found!";
    }
    // display JSON data
    echo json_encode($response);
}
else
{
    $response['status'] = 200;
    $response['message'] = "Invalid Request!";
}