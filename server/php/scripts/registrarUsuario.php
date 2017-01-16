<?php
   include("../conectar.php"); 
   include("../../../assets/mensajes/enviarCorreo.php");  
   $link = Conectar();

   $datos = json_decode($_POST['datos']);

   $id = addslashes($datos->id);
   $cargo = addslashes($datos->cargo);
   $perfil = addslashes($datos->perfil);
   $empresa = addslashes($datos->empresa);
   $sede = addslashes($datos->sede);
   $area = addslashes($datos->area);
   $correo = addslashes($datos->correo);

   if (stripos($correo, "@wspgroup.com") == 0)
   {
      $correo = $correo . "@wspgroup.com";
   }
   $correo = strtolower($correo);
   
   $sql = "INSERT INTO Login 
               (idLogin, idEmpresa) 
            VALUES 
               (
                  '$id', 
                  '$empresa') ON DUPLICATE KEY UPDATE idEmpresa = VALUES(idEmpresa);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      if ($id > 0)
      {
         
         $sql = "INSERT INTO DatosUsuarios (idLogin, Cargo, idSede, idArea) 
                  VALUES 
                  (
                     '$id', 
                     '$cargo', 
                     '$sede', 
                     '$area') ON DUPLICATE KEY UPDATE idPerfil = VALUES(idPerfil), Cargo = VALUES(Cargo), idSede = VALUES(idSede), idArea = VALUES(idArea);";

         $link->query(utf8_decode($sql));

         if ( $link->error == "")
         {
            $mensaje = "Buen Día, $nombre
            <br><br>Bienvenido al Sistema de Información de Mercadeo de WSP Parsons Brinckerhoff,
            <br><br>
            Podrá acceder con al sistema en el vinculo <a href='http://sim.wspcolombia.com'>http://sim.wspcolombia.com</a>, una vez ahí solo deberá ingresar su dirección de correo de WSP PB, y la clave del mismo,";

            $mensaje = Correo($correo, "Registro de Usuario", $mensaje);
            if ($mensaje != 1)
            {
               echo $mensaje;
            } else
            {
               echo 1;
            }

         }
      } else
      {
         echo "Hubo un error desconocido " . $link->error;
      }
   } else
   {
      echo "Hubo un error desconocido" . $link->error;
   }
?>