<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idLogin = $_POST['idLogin'];
   $idOrganigrama = $_POST['idOrganigrama'];
   
   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');
 
   $sql = "UPDATE cl_Organigrama SET idLogin = $idLogin, fechaActualizacion = '$fecha', Estado = 'Borrado' WHERE idOrganigrama = $idOrganigrama;";

   $link->query(utf8_decode($sql));
   if ( $link->affected_rows > 0)
   {
      echo 1;
   } else
   {
      echo "Hubo un error desconocido " . $link->error;
   }




?>