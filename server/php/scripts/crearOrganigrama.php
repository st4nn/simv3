<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idLogin = $_POST['idLogin'];
   $idCliente = $_POST['idCliente'];
   $Nombre = addslashes($_POST['Nombre']);

   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');
 
   $sql = "INSERT INTO cl_organigrama 
               (idCliente, Nombre, idLogin, fechaActualizacion) 
            VALUES 
               (
                  '$idCliente',
                  '$Nombre',
                  '$idLogin',
                  '$fecha');";

   $link->query(utf8_decode($sql));
   if ( $link->affected_rows > 0)
   {
      $nuevoId = $link->insert_id;
         echo $nuevoId;   
   } else
   {
      echo "Hubo un error desconocido " . $link->error;
   }




?>