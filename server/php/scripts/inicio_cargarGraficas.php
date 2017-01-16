<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);

   date_default_timezone_set('America/Bogota');

   $Resultado = array();
   $Resultado['Oportunidades'] = array();
   $Resultado['Propuestas'] = array();
   
   $sql = "SELECT 
            op_Estados.id,
            op_Estados.Nombre,
             COUNT(DISTINCT oportunidades.id) AS Cantidad
         FROM 
            oportunidades 
            LEFT JOIN op_Estados ON oportunidades.Estado = op_Estados.id
         GROUP BY 
            op_Estados.id;";

   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      $idx = 0;
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['Oportunidades'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['Oportunidades'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } else
   {
      $Resultado['Oportunidades'] = 0;  
   }

   $sql = "SELECT 
            pro_Estados.id,
            pro_Estados.Nombre,
             COUNT(DISTINCT propuestas.id) AS Cantidad
         FROM 
            propuestas 
            LEFT JOIN pro_Estados ON propuestas.Estado = pro_Estados.id
         GROUP BY 
            pro_Estados.id;";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $idx = 0;
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['Propuestas'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['Propuestas'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
   } else
   {
      $Resultado['Propuestas'] = 0;
   }
   
   echo json_encode($Resultado);
?>