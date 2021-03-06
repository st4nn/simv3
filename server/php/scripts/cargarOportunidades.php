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
            Prefijo LIKE '%$parametro%' OR
            NumeroDeProceso LIKE '%$parametro%' OR
            Cliente LIKE '%$parametro%' OR
            Objeto LIKE '%$parametro%' OR
            Presupuesto LIKE '%$parametro%' OR
            Plazo LIKE '%$parametro%' OR
            idArea LIKE '%$parametro%' OR
            idCiudad LIKE '%$parametro%' OR
            ExpresionInteres LIKE '%$parametro%' OR
            Propuesta LIKE '%$parametro%' OR
            Link LIKE '%$parametro%' OR
            Estado LIKE '%$parametro%' OR
            Usuario LIKE '%$parametro%' OR
            fechaCargue LIKE '%$parametro%' OR
            ClienteNombre LIKE '%$parametro%' OR
            NIT LIKE '%$parametro%' OR
            Area LIKE '%$parametro%' OR
            Ciudad LIKE '%$parametro%' OR
            Publicacion LIKE '%$parametro%' OR
            obsPrepliego LIKE '%$parametro%' OR
            Apertura LIKE '%$parametro%' OR
            Visita LIKE '%$parametro%' OR
            obsPliego LIKE '%$parametro%' OR
            requiereCompraPliego LIKE '%$parametro%' OR
            plazoCompra LIKE '%$parametro%' OR
            valorPliego LIKE '%$parametro%' OR
            Cierre LIKE '%$parametro%' OR
            Tecnica LIKE '%$parametro%' OR
            Financiera LIKE '%$parametro%' OR
            Economica LIKE '%$parametro%' OR
            industriaNacional LIKE '%$parametro%' OR
            criteriosDesempate LIKE '%$parametro%' OR
            resultadoPreEvaluacion LIKE '%$parametro%' OR
            capitalDeTrabajo LIKE '%$parametro%' OR
            Liquidez LIKE '%$parametro%' OR
            Endeudamiento LIKE '%$parametro%' OR
            coberturaIntereses LIKE '%$parametro%' OR
            rentabilidadPatrimonio LIKE '%$parametro%' OR
            rentabilidadActivo LIKE '%$parametro%' OR
            experienciaHabilitante LIKE '%$parametro%' OR
            experienciaEspecifica LIKE '%$parametro%' OR
            Creador LIKE '%$parametro%' OR
            Responsable LIKE '%$parametro%' OR
            idResponsable LIKE '%$parametro%';";

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
   
   $sql = "SELECT * FROM vOportunidades WHERE $where";

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