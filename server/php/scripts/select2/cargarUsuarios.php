<?php
	include("../../conectar.php"); 
   $link = Conectar();

   /*$idUsuario = addslashes($_POST['usuario']);*/

   //$Parametro = addslashes($_GET['q']);
   $Parametro = "";
   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/

   $Parametro = str_replace(" ", "%", $Parametro);
   
   $sql = "SELECT idLogin AS id, Correo as name FROM datosusuarios WHERE
            Nombre LIKE '%$Parametro%' LIMIT 0, 50;";

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
   $Resultado = array();
   
   $Resultado[0] = array(); 
                   $Resultado[0]["id"] =  "1961";
                   $Resultado[0]["name"] =  "Valor 1";
                   /*$Resultado[0]["tokens"] = array();
                     $Resultado[0]["tokens"][0] = "West";
                     $Resultado[0]["tokens"][1] = "Side";
                     $Resultado[0]["tokens"][2] = "Story";*/

                  $Resultado[1]["id"] =  "1962";
                   $Resultado[1]["name"] =  "Valor 2";
                   /*$Resultado[1]["tokens"] = array();
                     $Resultado[1]["tokens"][0] = "Lawrence";
                     $Resultado[1]["tokens"][1] = "of";
                     $Resultado[1]["tokens"][2] = "Arabia";*/

                  $Resultado[2]["id"] =  "1963";
                   $Resultado[2]["name"] =  "Valor 3";
                   /*$Resultado[2]["tokens"] = array();
                     $Resultado[2]["tokens"][0] = "Tom";
                     $Resultado[2]["tokens"][1] = "Jones";*/
                    
   echo json_encode($Resultado);
?>