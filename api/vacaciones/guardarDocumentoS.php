<?php
	// include Database connection file 
	include("../conexion.php");

    $query = "SELECT id FROM vacaciones ORDER BY id DESC LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($result);

    if (($_FILES["file"]["type"] == "application/pdf")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../../img/doc-vacaciones/".$_FILES['file']['name'])) {
            rename("../../img/doc-vacaciones/".$_FILES['file']['name'], "../../img/doc-vacaciones/".$row['id'].".pdf");
            echo 1;
        } else {
            echo 0;
        }
    } else {
           echo 0;
    }
?>