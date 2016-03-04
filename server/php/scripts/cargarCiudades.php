<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);
   $idPais = addslashes($_POST['idPais']);
   
   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/
   
   $sql = "SELECT 
            confCiudad.*, 
            confDepartamentos.Nombre AS Departamento
         FROM 
            confCiudad 
            INNER JOIN confDepartamentos ON confDepartamentos.id = confCiudad.idDepartamento
            INNER JOIN confPais ON confDepartamentos.idPais = confPais.id
         WHERE 
            confPais.id = '$idPais' OR confPais.id = '190000001'
         ORDER BY id DESC;";

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