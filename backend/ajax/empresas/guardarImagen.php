<?php
	// include Database connection file 
	include("../../conexion.php");

    $query = "SELECT id FROM empresas WHERE codigo = '".$_POST['codigo']."' LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($result);

    if (($_FILES["file"]["type"] == "image/jpg")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/gif")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../../../img/logo-empresas/".$_FILES['file']['name'])) {
            rename("../../../img/logo-empresas/".$_FILES['file']['name'], "../../../img/logo-empresas/".$row['id'].".jpg");
            echo 1;
        } else {
            echo 2;
        }
    } else {
           echo 3;
    }
?>