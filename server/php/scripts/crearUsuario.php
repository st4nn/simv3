<?php
   include("../conectar.php"); 
   include("../../../assets/mensajes/enviarCorreo.php");  
   $link = Conectar();

   $datos = json_decode($_POST['datos']);

   $nombre = $datos->nombre;
   $correo = $datos->correo;
   $cargo = $datos->cargo;
   $perfil = $datos->perfil;
   $usuario = $datos->usuario;
   $clave = $datos->clave;
   $clave2 = $datos->clave2;
   $empresa = $datos->empresa;
   $sede = $datos->sede;
   $area = $datos->area;
   $pClave = $datos->clave;

   if (stripos($correo, "@wspgroup.com") == 0)
   {
      $correo = $correo . "@wspgroup.com";
   }
   $correo = strtolower($correo);
   
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Login WHERE Usuario = '$usuario';";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "El Usuario ya existe, por favor selecciona otro.";
   } else
   {
      $sql = "SELECT COUNT(*) AS 'Cantidad' FROM DatosUsuarios WHERE Correo = '$correo';";
      $result = $link->query($sql);

      $fila =  $result->fetch_array(MYSQLI_ASSOC);

      if ($fila['Cantidad'] > 0)
      {
         echo "El Correo ya tiene un usuario asignado, por favor selecciona otro.";
      } else
      {
         if ($clave <> $clave2)
         {
            echo "Las claves no coinciden.";
         } else
         {
            $sql = "INSERT INTO Login 
                        (Usuario, Clave, Estado, idEmpresa) 
                     VALUES 
                        (
                           '$usuario', 
                           '" . md5(md5(md5($clave))) . "', 
                           'Activo',
                           '$empresa');";

            $link->query(utf8_decode($sql));
               if ( $link->affected_rows > 0)
               {
                  $nuevoId = $link->insert_id;
                  if ($nuevoId > 0)
                  {
                     
                     $sql = "INSERT INTO DatosUsuarios (idLogin, Nombre, Correo, idPerfil, foto, Cargo, idSede, idArea) 
                              VALUES 
                              (
                                 '$nuevoId', 
                                 '$nombre', 
                                 '$correo',
                                 '$perfil',
                                 '',
                                 '$cargo', 
                                 '$sede', 
                                 '$area');";
                        
                        $link->query(utf8_decode($sql));

                        echo $link->error . " " .$link->affected_rows;   

                        $mensaje = "Buen Día, $nombre
                        <br>Se ha creado un usuario de acceso para el sistema SIM,
                        <br><br>
                        Los datos de autenticación son:
                        <br><br>
                        <br>Url de Acceso: http://sim.wspcolombia.com
                        <br>Usuario: $usuario
                        <br>Clave: $pClave";

                        Correo("Creación de Usuario " . $nombre, $correo, $mensaje) ;
                  } else
                  {
                     echo "Hubo un error desconocido " . $link->error;
                  }
               } else
               {
                  echo "Hubo un error desconocido" . $link->error;
               }
         }
      }
   }

?>