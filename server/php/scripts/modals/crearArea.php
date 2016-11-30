<?php
   include("../../conectar.php"); 

   $link = Conectar();

   $Nombre = addslashes($_POST['Nombre']);
   $Nit = addslashes($_POST['Nit']);
   $usuario = addslashes($_POST['Usuario']);

   
   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');

   $Resultado = array('Error' => "");

   $sql = "SELECT * FROM confareas WHERE Nombre = '$Nombre'";
   $result = $link->query(utf8_decode($sql));

   if ($result->num_rows > 0)
   {
      $Resultado['Error'] = "Ya hay un Area con ese Nombre";
   } else
   {
      $sql = "INSERT INTO confareas 
               (Nombre) 
            VALUES
            ('" . $Nombre . "')
            ON DUPLICATE KEY UPDATE
               Nombre = VALUES(Nombre);";
               
      $link->query(utf8_decode($sql));
      $Resultado['id'] = 0;

      if ( $link->affected_rows > 0)
      {
         $nuevoId = $link->insert_id;
         $Resultado['id'] = $nuevoId;

         mysqli_free_result($result);  
      } else
      {
         $Resultado['Error'] = $link->error;
         mysqli_free_result($result);  
      }
   }

   echo json_encode($Resultado);
?>