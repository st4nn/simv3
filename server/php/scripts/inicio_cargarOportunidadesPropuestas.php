<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);

   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/

   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d 00:00:00');
   
   $sql = "SELECT 
            id,
            Nombre AS Sector, 
            SUM(oportunidades) AS Oportunidades, 
            SUM(propuestas) AS Propuestas 
         FROM
         (
         SELECT 
            confAreas.id,
            confAreas.Nombre,
             COUNT(DISTINCT oportunidades.id) AS oportunidades,
             0 AS propuestas
         FROM 
            confAreas 
            LEFT JOIN oportunidades ON oportunidades.idArea = confAreas.id
            INNER JOIN op_fechas ON op_fechas.id = oportunidades.id AND op_fechas.Cierre >= '$fecha'
         GROUP BY 
            confAreas.id
         UNION ALL
         SELECT 
            confAreas.id,
            confAreas.Nombre,
             0 AS oportunidades,
             COUNT(DISTINCT propuestas.id) AS propuestas
         FROM 
            confAreas 
            LEFT JOIN propuestas ON propuestas.idArea = confAreas.id
            INNER JOIN pro_fechas ON pro_fechas.idPropuesta = propuestas.id AND pro_fechas.Cierre >= '$fecha'
         GROUP BY 
            confAreas.id
         UNION ALL
         SELECT 
            confAreas.id,
            confAreas.Nombre,
             0 AS oportunidades,
             0 AS propuestas
         FROM 
            confAreas 
         ) AS Datos 
         GROUP BY
            id;";

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