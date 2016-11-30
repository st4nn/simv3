<?php
   include("../conectar.php"); 

   $link = Conectar();

   $datos = json_decode($_POST['datos']);
   $usuario = addslashes($_POST['usuario']);

   $idCliente = $datos->idCliente;
   $Nombre = addslashes($datos->Nombre);
   $NIT = addslashes($datos->NIT);
   $idNaturaleza = addslashes($datos->idNaturaleza);
   $Direccion = addslashes($datos->Direccion);
   $Telefono = addslashes($datos->Telefono);
   $sitioWeb = addslashes($datos->sitioWeb);
   $Actividades = addslashes($datos->Actividades);
   $idPais = addslashes($datos->idPais);
   $idCiudad = addslashes($datos->idCiudad);
   $Mision = addslashes($datos->Mision);
   $Vision = addslashes($datos->Vision);
   
   $usuario;
   
   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');

   $sql = "INSERT INTO clientes 
            (idCliente, Nombre, NIT, idNaturaleza, Direccion, Telefono, sitioWeb, Actividades, idPais, idCiudad, Mision, Vision, idUsuario, fechaActualizacion) 
         VALUES
         ('" . $idCliente . "', 
         '" . $Nombre . "', 
         '" . $NIT . "', 
         '" . $idNaturaleza . "', 
         '" . $Direccion . "', 
         '" . $Telefono . "', 
         '" . $sitioWeb . "', 
         '" . $Actividades . "', 
         '" . $idPais . "', 
         '" . $idCiudad . "', 
         '" . $Mision . "', 
         '" . $Vision . "', 
         '" . $usuario . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            Nombre = VALUES(Nombre),
            NIT = VALUES(NIT),
            idNaturaleza = VALUES(idNaturaleza),
            Direccion = VALUES(Direccion),
            Telefono = VALUES(Telefono),
            sitioWeb = VALUES(sitioWeb),
            Actividades = VALUES(Actividades),
            idPais = VALUES(idPais),
            idCiudad = VALUES(idCiudad),
            Mision = VALUES(Mision),
            Vision = VALUES(Vision),
            idUsuario = VALUES(idUsuario),
            fechaActualizacion = VALUES(fechaActualizacion);";
            
      $link->query(utf8_decode($sql));
      if ( $link->affected_rows > 0)
      {
         $nuevoId = $link->insert_id;
         echo $link->error . " " .$nuevoId;

         $sql = "DELETE FROM cl_Sectores WHERE idCliente = '$nuevoId'";
         $link->query(utf8_decode($sql));

         if (!$datos->Sector == NULL)
         {
            $values = "";
            foreach ($datos->Sector as $key => $value) 
            {
               $values .= "('$nuevoId', '$value'), ";
            }
            $values = substr($values, 0, -2);
            $sql = "INSERT INTO cl_Sectores (idCliente, idClSector) VALUES $values;";
            $link->query(utf8_decode($sql));
         } 
      } else
      {
         echo $link->error;
      }
?>