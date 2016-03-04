<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);
   $idCliente = addslashes($_POST['idCliente']);
   /*
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }*/
   
   $sql = "SELECT 
            cl_Organigrama.idOrganigrama, 
            cl_Organigrama.Nombre,
            cl_Organigrama.fechaActualizacion,
            DatosUsuarios.Nombre AS 'Usuario'
         FROM 
            cl_Organigrama
               INNER JOIN DatosUsuarios on cl_Organigrama.idLogin = DatosUsuarios.idLogin 
         WHERE
            cl_Organigrama.Estado <> 'Borrado'
            AND cl_Organigrama.idCliente = $idCliente;";

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