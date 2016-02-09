<?php
   function datosUsuario($idUsuario)
   {
      $link = Conectar();
    
      $sql = "SELECT 
               Login.idLogin, Login.Usuario, Login.Estado, Login.idEmpresa, DatosUsuarios.Nombre, DatosUsuarios.Correo, DatosUsuarios.idPerfil 
            FROM Login, DatosUsuarios
            WHERE 
               Login.idLogin = DatosUsuarios.idLogin
               AND Login.idLogin = $idUsuario";
      
      $result = $link->query($sql);

      if ( $result->num_rows > 0)
      {
         class Usuario
         {
            public $idLogin;
            public $Usuario;
            public $idEmpresa;
            public $Nombre;
            public $Correo;
            public $idPerfil;
            public $Estado;
         }
         
         $idx = 0;
            while ($row = mysqli_fetch_assoc($result))
            { 
               $Usuarios = new Usuario();
               $Usuarios->idLogin = utf8_encode($row['idLogin']);
               $Usuarios->Usuario = utf8_encode($row['Usuario']);
               $Usuarios->Nombre = utf8_encode($row['Nombre']);
               $Usuarios->idEmpresa = utf8_encode($row['idEmpresa']);
               $Usuarios->Correo = utf8_encode($row['Correo']);
               $Usuarios->idPerfil = utf8_encode($row['idPerfil']);
               $Usuarios->Estado = utf8_encode($row['Estado']);

               $idx++;
            }
            
               mysqli_free_result($result);  
               return $Usuarios;
      } else
      {
         echo 0;
      }
   }
?>