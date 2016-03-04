<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);

   $parametro = addslashes($_POST['Parametro']);
   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/
   
   $sql = "SELECT * FROM vClientes WHERE
            Nombre LIKE '%$parametro%' OR
            NIT LIKE '%$parametro%' OR
            Direccion LIKE '%$parametro%' OR
            Telefono LIKE '%$parametro%' OR
            sitioWeb LIKE '%$parametro%' OR
            Mision LIKE '%$parametro%' OR
            Vision LIKE '%$parametro%' OR
            Naturaleza LIKE '%$parametro%' OR
            Pais LIKE '%$parametro%' OR
            Ciudad LIKE '%$parametro%';";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$idx][$key] = utf8_encode($value);
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