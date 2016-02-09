<?php
	include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);
   $idPerfil = 0; 
   if ($idUsuario != 0)
   {
      include("datosUsuario.php"); 
      $Usuario = datosUsuario($idUsuario);
   }
   
   $sql = "SELECT * FROM empresas";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Empresa
      {
         public $idEmpresa;
         public $Nombre;
         public $Identificacion;
         public $Direccion;
         public $Telefono;
         public $Correo;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Empresas[$idx] = new Empresa();
            $Empresas[$idx]->idEmpresa = utf8_encode($row['idEmpresa']);
            $Empresas[$idx]->Nombre = utf8_encode($row['Nombre']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Empresas);   
   } else
   {
      echo 0;
   }
?>