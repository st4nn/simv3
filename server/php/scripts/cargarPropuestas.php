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

   $where = "
            id LIKE '%$parametro%' OR
            Prefijo LIKE '%$parametro%' OR
            NumeroDeProceso LIKE '%$parametro%' OR
            Cliente LIKE '%$parametro%' OR
            Objeto LIKE '%$parametro%' OR
            Presupuesto LIKE '%$parametro%' OR
            Plazo LIKE '%$parametro%' OR
            idArea LIKE '%$parametro%' OR
            idCiudad LIKE '%$parametro%' OR
            Link LIKE '%$parametro%' OR
            Estado LIKE '%$parametro%' OR
            idEmpresa LIKE '%$parametro%' OR
            Consorcio LIKE '%$parametro%' OR
            Porcentaje LIKE '%$parametro%' OR
            NombreConsorcio LIKE '%$parametro%' OR
            Usuario LIKE '%$parametro%' OR
            fechaCargue LIKE '%$parametro%' OR
            idPropuesta LIKE '%$parametro%' OR
            Apertura LIKE '%$parametro%' OR
            Visita LIKE '%$parametro%' OR
            Observaciones LIKE '%$parametro%' OR
            Cierre LIKE '%$parametro%' OR
            Informe LIKE '%$parametro%' OR
            Adjudicacion LIKE '%$parametro%' OR
            Puntaje LIKE '%$parametro%' OR
            Financiera LIKE '%$parametro%' OR
            Tecnico LIKE '%$parametro%' OR
            Economica LIKE '%$parametro%' OR
            rObservaciones LIKE '%$parametro%' OR
            Area LIKE '%$parametro%' OR
            Ciudad LIKE '%$parametro%';";

   if (array_key_exists('Criterios', $_POST))
   {
      $where = "";
      $Criterios = $_POST['Criterios'];
      $Criterios = substr($Criterios, 1);
      $Criterios = substr($Criterios, 0, -1);
      $arrCriterios = explode("}", $Criterios);
      foreach ($arrCriterios as $key => $value) 
      {
         if (substr($value, 0, 1) == ',')
         {
            $value = substr($value, 1);
         }
         if ($value != "")
         {
            $arrCriterios[$key] = json_decode($value . '}');
         }
      }
      $Criterios = $arrCriterios;
     
      foreach ($Criterios as $key => $value) 
      {
         if ($value != "")
         {
            $where .= " " . $value->parametro . " " . $value->condicion . " " . $value->valor . " AND";
         }
      }
      $where = substr($where, 0, -3);
   }
   
   $sql = "SELECT * FROM vPropuestas WHERE $where";

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