<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idLogin = $_POST['usuario'];
   $idOrganigrama = $_POST['idOrganigrama'];

   $vinculos = addslashes($_POST['vinculos']);

  date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');
 
   $sql = "UPDATE cl_Organigrama SET idLogin = '$idLogin', fechaActualizacion = '$fecha', grafico = '$vinculos' WHERE idOrganigrama = '$idOrganigrama';";

   $link->query($sql);

   if ( $link->affected_rows > 0)
   {
      echo 1;
   } else
   {
      echo "Hubo un error desconocido " . $link->error;
   }
?>