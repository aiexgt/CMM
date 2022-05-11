<?php
	// include Database connection file 
	include("../../conexion.php");

    $query = "SELECT id FROM ausencias ORDER BY id DESC LIMIT 1";

    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($result);

    if (($_FILES["file"]["type"] == "image/jpg")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/gif")) {

            $rep = move_uploaded_file($_FILES["file"]["tmp_name"], "../../../img/doc-ausencias/".$_FILES['file']['name']);
        //if (move_uploaded_file($_FILES["file"]["tmp_name"], "../../../img/doc-ausencias/".$_FILES['file']['name'])) {
          //  rename("../../../img/doc-ausencias/".$_FILES['file']['name'], "../../../img/doc-ausencias/".$row['id'].".jpg");
            //echo 1;
        //} else {
          //  echo 0;
          echo $rep;
        }
    } else {
           echo 0;
    }
?>