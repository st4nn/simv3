<?php
	include("../../conectar.php"); 
   $link = Conectar();

   $Parametro = addslashes($_GET['q']);
   
   $Parametro = str_replace(" ", "%", $Parametro);
   
   $sql = "SELECT datosusuarios.idLogin AS id, datosusuarios.Nombre as name, datosusuarios.Correo AS mail FROM datosusuarios INNER JOIN login ON Login.idLogin = datosusuarios.idLogin AND Login.Estado = 'Activo' WHERE
            Nombre LIKE '%$Parametro%' OR Correo LIKE '%$Parametro%'  LIMIT 0, 10;";


   $result = $link->query($sql);

   $idx = 0;
   $Resultado = array();

   if ( $result->num_rows > 0)
   {
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
   }
                    
   echo json_encode($Resultado);
?>