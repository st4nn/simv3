<?php
   error_reporting(0);
   $idLogin = addslashes($_POST['Usuario']);
   $ruta = addslashes($_POST['ruta']);
   $nombre = addslashes($_POST['nombre']);

   date_default_timezone_set('America/Bogota');

   if ($ruta != "")
   {
      $nombre = '/' . $nombre;
   }


   $fecha = date('Y-m-d h:i:s');
 
   $target = '../../../Archivos/infoAdministrativa/' . $ruta . $nombre;
   if(!mkdir($target, 0755, true))
   {
      die('No se pudo crear la carpeta');
   } else
   {
      echo 1;
   }
?>