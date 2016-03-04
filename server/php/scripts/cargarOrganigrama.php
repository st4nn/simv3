<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idOrganigrama = addslashes($_POST['idOrganigrama']);
   
   
   $sql = "SELECT 
            grafico
         FROM 
            cl_Organigrama 
         WHERE
            idOrganigrama = '$idOrganigrama';";

   $vinculos = $link->query($sql);
   $fila =  $vinculos->fetch_array(MYSQLI_ASSOC);
   
   if ( $vinculos->num_rows > 0)
   {
      if ($fila['grafico'] <> "")
      {
         echo $fila['grafico'];
      } else
      {
         echo 0;
      }
   } else
   {
      echo 0;
   }
?>