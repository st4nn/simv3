<?php
   include("../../conectar.php"); 

   $link = Conectar();

   $Nombre = addslashes($_POST['Nombre']);
   $Nit = addslashes($_POST['Nit']);
   $usuario = addslashes($_POST['Usuario']);

   
   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');

   $Resultado = array('Error' => "");

   $sql = "SELECT * FROM clientes WHERE Nombre = '$Nombre' OR NIT = '$Nit'";
   $result = $link->query(utf8_decode($sql));

   if ($result->num_rows > 0)
   {
      $Resultado['Error'] = "Ya hay una empresa con ese Numero de Identificación o Nombre";
   } else
   {
      $sql = "INSERT INTO clientes 
               (Nombre, NIT, idUsuario) 
            VALUES
            ('" . $Nombre . "', 
            '" . $Nit . "', 
            '" . $usuario . "')
            ON DUPLICATE KEY UPDATE
               Nombre = VALUES(Nombre),
               NIT = VALUES(NIT),
               idUsuario = VALUES(idUsuario);";
               
      $link->query(utf8_decode($sql));
      $Resultado['id'] = 0;

      if ( $link->affected_rows > 0)
      {
         $nuevoId = $link->insert_id;
         $Resultado['id'] = $nuevoId;

         $sql = "DELETE FROM cl_Sectores WHERE idCliente = '$nuevoId'";
         $link->query(utf8_decode($sql));
         mysqli_free_result($result);  
      } else
      {
         $Resultado['Error'] = $link->error;
         mysqli_free_result($result);  
      }
   }

   echo json_encode($Resultado);
?>