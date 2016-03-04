<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);
   $idCliente = addslashes($_POST['idCliente']);

   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/
   
   $sql = "SELECT * FROM Clientes WHERE idCliente = '$idCliente';";
   $result = $link->query($sql);

   $sql2 = "SELECT * FROM cl_Sectores WHERE idCliente = '$idCliente';";
   $result2 = $link->query($sql2);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['datos'] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['datos'][$key] = utf8_encode($value);
         }
         $idx++;
      }

      $idx = 0;
      while ($row = mysqli_fetch_assoc($result2))
      {
         $Resultado['sectores'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['sectores'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>