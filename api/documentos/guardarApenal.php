<?php
	// include Database connection file 
	include("../../conexion.php");

    $id = $_POST['id'];

    unlink("../../../img/doc-apenal/".$id.".pdf");

    if (($_FILES["file"]["type"] == "application/pdf")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../../../img/doc-apenal/".$_FILES['file']['name'])) {
            rename("../../../img/doc-apenal/".$_FILES['file']['name'], "../../../img/doc-apenal/".$id.".pdf");
            echo 1;
        } else {
            echo 0;
        }
    } else {
           echo 0;
    }
?>