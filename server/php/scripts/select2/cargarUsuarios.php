<?php
	include("../../conectar.php"); 
   $link = Conectar();

   $Parametro = addslashes($_GET['q']);
   
   $Parametro = str_replace(" ", "%", $Parametro);
   
   $sql = "SELECT DatosUsuarios.idLogin AS id, DatosUsuarios.Nombre as name, DatosUsuarios.Correo AS mail FROM DatosUsuarios INNER JOIN login ON Login.idLogin = DatosUsuarios.idLogin AND Login.Estado = 'Activo' WHERE
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