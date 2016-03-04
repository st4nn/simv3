<?php
  include("../conectar.php"); 
   $link = Conectar();

   $sql = "SELECT Sector, SUM(Propuestas) AS Propuestas, SUM(Oportunidades) AS Oportunidades
         FROM
         (SELECT 
            propuestas.Sector,
            COUNT(propuestas.PropuestaNo) AS Propuestas,
            0 AS Oportunidades
         FROM 
            propuestas
         GROUP BY propuestas.Sector
         UNION
         SELECT 
            oportunidades.Sector,
            0 AS Propuestas,
            COUNT(oportunidades.ProcesoNo) AS Oportunidades
         FROM 
            oportunidades
         GROUP BY oportunidades.Sector ) AS Datos GROUP BY Sector";

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