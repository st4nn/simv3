<?php
   include("../conectar.php"); 

   $link = Conectar();

   $datos = json_decode($_POST['datos']);
   $usuario = addslashes($_POST['Usuario']);

   foreach ($datos as $key => $value) 
   {
      if (!is_array($datos->$key))
      {
         $datos->$key = addslashes($value);
      }
   }

   $id = "NULL";

   if (array_key_exists("idPropuesta", $datos))
   {
      if ($datos->idPropuesta > 0 AND $datos->idPropuesta <> "")
      {
         $id = $datos->idPropuesta;
      }
   } 

   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');

   $sql = "INSERT INTO propuestas(id, Prefijo, NumeroDeProceso, Cliente, Objeto, Presupuesto, Plazo, idArea, idCiudad, Link, Estado, idEmpresa, Consorcio, Porcentaje, NombreConsorcio, Usuario, fechaCargue) VALUES 
         ('" . $id . "', 
         '" . $datos->Prefijo . "', 
         '" . $datos->Proceso . "', 
         '" . $datos->Cliente . "', 
         '" . $datos->Objeto . "', 
         '" . $datos->ValorOferta . "', 
         '" . $datos->Plazo . "', 
         '" . $datos->idArea . "', 
         '" . $datos->idCiudad . "', 
         '" . $datos->Link . "', 
         '" . $datos->Final . "', 
         '" . $datos->Empresa . "', 
         '" . $datos->Consorcio . "', 
         '" . $datos->PorcentajeParticipacion . "', 
         '" . $datos->NombreConsorcio . "', 
         '" . $usuario . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            Prefijo = VALUES(Prefijo),
            NumeroDeProceso = VALUES(NumeroDeProceso),
            Cliente = VALUES(Cliente),
            Objeto = VALUES(Objeto),
            Presupuesto = VALUES(Presupuesto),
            Plazo = VALUES(Plazo),
            idArea = VALUES(idArea),
            idCiudad = VALUES(idCiudad),
            Link = VALUES(Link),
            Estado = VALUES(Estado),
            idEmpresa = VALUES(idEmpresa),
            Consorcio = VALUES(Consorcio),
            Porcentaje = VALUES(Porcentaje),
            NombreConsorcio = VALUES(NombreConsorcio),
            Usuario = VALUES(Usuario),
            fechaCargue = VALUES(fechaCargue);";
            
   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      if ($id  == "NULL")
      {
         $id = $link->insert_id;
      }

      $sql = "INSERT INTO pro_fechas(idPropuesta, Apertura, Visita, Observaciones, Cierre, Informe, Adjudicacion) VALUES 
      (
         '" . $id . "', 
         '" . $datos->Fecha_Apertura . "', 
         '" . $datos->Fecha_Audiencia . "', 
         '" . $datos->Fecha_ObservacionesPliego . "', 
         '" . $datos->Fecha_Cierre . "', 
         '" . $datos->Fecha_InformeEvaluacion . "', 
         '" . $datos->Fecha_Adjudicacion . "'
      )
      ON DUPLICATE KEY UPDATE
         Apertura = VALUES(Apertura),
         Visita = VALUES(Visita),
         Observaciones = VALUES(Observaciones),
         Cierre = VALUES(Cierre),
         Informe = VALUES(Informe),
         Adjudicacion = VALUES(Adjudicacion)";

      $link->query(utf8_decode($sql));

      if ( $link->error == "")
      {
         $sql = "INSERT INTO pro_resultados(idPropuesta, Puntaje, Financiera, Tecnico, Economica, Observaciones) VALUES 
            (
               '" . $id . "', 
               '" . $datos->PuntajeTotal . "', 
               '" . $datos->ResultadoFinanciera . "', 
               '" . $datos->ResultadoTecnico . "', 
               '" . $datos->ResultadoEconomica . "', 
               '" . $datos->Observaciones . "'
            )
         ON DUPLICATE KEY UPDATE 
            Puntaje = VALUES(Puntaje),
            Financiera = VALUES(Financiera),
            Tecnico = VALUES(Tecnico),
            Economica = VALUES(Economica),
            Observaciones = VALUES(Observaciones);";

         $link->query(utf8_decode($sql));

         if ( $link->error == "")
         {
            $sql = "DELETE FROM pro_consorcio WHERE idPropuesta = '$id'";
            $link->query(utf8_decode($sql));

            if ($datos->Consorcio == 'No')
            {
               
            } else
            {
               $values = "";
               foreach ($datos->Consorciados as $key => $value) 
               {
                  $values .= '(' . $id . ', \'' . $value->Nombre . '\', \'' . $value->Porcentaje . '\'), ';
               }
               $values = substr($values, 0, -2);

               $sql = 'INSERT INTO pro_consorcio(idPropuesta, Consorciado, Porcentaje) VALUES  ' . $values . ';';
               $link->query(utf8_decode($sql));

               if ( $link->error <> "")
               {
                  echo $link->error;
               } 
            }

            $sql = 'DELETE FROM pro_responsables WHERE idPropuesta = \'' . $id. '\'';
            $link->query(utf8_decode($sql));

            if (sizeof($datos->Responsables) == 0) 
            {

            } else
            {
               $values = '';
               foreach ($datos->Responsables as $key => $value) 
               {
                  $values .= "($id, " . $value->id . ", '" . $value->Tipo . "'), ";
               }
               $values = substr($values, 0, -2);

               $sql = 'INSERT INTO pro_responsables(idPropuesta, idUsuario, Tipo) VALUES ' . $values . ';';
               $link->query(utf8_decode($sql));

               if ( $link->error <> "")
               {
                  echo $link->error;
               }
            }
            
            echo $id;
         } else
         {
            echo $link->error;
         }   
      } else
      {
         echo $link->error;
      }   
   } else
   {
      echo $link->error;
   }
?>