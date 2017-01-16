<?php
   include("../conectar.php"); 
   include("../../../login/login.php"); 
   error_reporting(0);

   $link = Conectar();

   $usuario = addslashes($_POST['pUsuario']);
   $clave = addslashes($_POST['pClave']);
   $Fecha = $_POST['pFecha'];

   $usuario = explode("@", $usuario);
   $usuario = $usuario[0];

   /*$cUsuario = validarUsuario($usuario, $clave, 1);
   if ($cUsuario !== false)
   {
      $sql = "INSERT INTO Login(Usuario, Clave, Estado) VALUES ('$usuario', '" . md5(md5(md5($clave))) . "', 'Activo') ON DUPLICATE KEY UPDATE Usuario = VALUES(Usuario), Clave=VALUES(Clave), Estado=VALUES(Estado), Fecha = CURRENT_TIMESTAMP;";
      $link->query(utf8_decode($sql));

      $sql = "SELECT idLogin FROM Login WHERE Usuario = '$usuario';";
      $result = $link->query($sql);
      $fila =  $result->fetch_array(MYSQLI_ASSOC);


      $idLogin = $fila['idLogin'];

      $sql = "INSERT INTO DatosUsuarios (idLogin, Nombre, Correo) VALUES ($idLogin, '" . $cUsuario['Nombre'] . "', '" . $cUsuario['Correo'] . "') ON DUPLICATE KEY UPDATE Nombre = VALUES(Nombre), Correo=VALUES(Correo);";
      $link->query(utf8_decode($sql));
   }*/

   $sql = "SELECT 
               Login.idLogin AS 'id',
               Login.Usuario AS 'Usuario',
               Login.Estado AS 'Estado',
               Datos.Nombre AS 'Nombre',
               Datos.Correo AS 'Correo',
               Datos.Cargo AS 'Cargo',
               Datos.foto AS 'Foto',
               Empresa.Nombre AS 'Empresa',
               Datos.idPerfil AS 'idPerfil',
               Datos.idArea as 'idArea'
            FROM 
               Login AS Login
               LEFT JOIN DatosUsuarios AS Datos ON Datos.idLogin = Login.idLogin
               LEFT JOIN empresas AS Empresa ON Login.idEmpresa = Empresa.idEmpresa
               LEFT JOIN confAreas AS Areas ON Areas.id = Datos.idArea
            WHERE 
               Login.Usuario = '$usuario' 
               AND Login.Clave = '" . md5(md5(md5($clave))) . "';";

   $result = $link->query($sql);

   if ( $result->num_rows == 1)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         foreach ($row as $key => $value) 
         {
            $Resultado[$key] = utf8_encode($value);
         }
      }
         
      $Resultado['cDate'] = $Fecha;

      mysqli_free_result($result);  
      echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>