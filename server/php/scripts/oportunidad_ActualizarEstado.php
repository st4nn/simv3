<?php
   include("../conectar.php"); 

   $link = Conectar();

   $idOportunidad = addslashes($_POST['idOportunidad']);
   $Estado = addslashes($_POST['Estado']);
   $usuario = addslashes($_POST['Usuario']);

   $sql = 'UPDATE oportunidades SET Estado = \'' . $Estado . '\' WHERE id = \'' . $idOportunidad . '\';';
   $link->query(utf8_decode($sql));

   echo 1;
?>