<?php
	include("../../conectar.php"); 
   $link = Conectar();

   /*$idUsuario = addslashes($_POST['usuario']);*/

   $Parametro = addslashes($_GET['q']);
   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/

   $Parametro = str_replace(" ", "%", $Parametro);
   
   $sql = "SELECT  
            confciudad.id,
             CONCAT(confciudad.Nombre, ' ', confdepartamentos.Nombre, ' ', confpais.Nombre) AS name
         FROM 
            confciudad
             LEFT JOIN confdepartamentos ON confdepartamentos.id = confciudad.idDepartamento
             LEFT JOIN confpais ON confdepartamentos.idPais = confpais.id
         WHERE 
            confciudad.Nombre LIKE '%$Parametro%' OR
            confdepartamentos.Nombre LIKE '%$Parametro%' OR
            confpais.Nombre LIKE '%$Parametro%'
         LIMIT 0, 50;";

   $result = $link->query($sql);

   $idx = 0;
   $Resultado = array();

   if ( $result->num_rows > 0)
   {
      $Resultado['total_count'] = $result->num_rows;
      $Resultado['incomplete_results'] = false;
      $Resultado['items'] = array();
        
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['items'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['items'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } else
   {
      $Resultado['total_count'] = 0;
      $Resultado['incomplete_results'] = false;
      $Resultado['items'] = array();
   }
   
   echo json_encode($Resultado);
?>