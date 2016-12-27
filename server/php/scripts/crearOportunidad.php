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

   if (array_key_exists("idOportunidad", $datos))
   {
      if ($datos->idOportunidad > 0 AND $datos->idOportunidad <> "")
      {
         $id = $datos->idOportunidad;
      }
   } 

   date_default_timezone_set('America/Bogota');
   $fecha = date('Y-m-d h:i:s');

   $sql = "INSERT INTO oportunidades(id, NumeroDeProceso, Cliente, Objeto, Presupuesto, Plazo, idArea, idCiudad, ExpresionInteres, Propuesta, Link, Estado, Usuario, fechaCargue) VALUES 
         ('" . $id . "', 
         '" . $datos->NumeroDeProceso . "', 
         '" . $datos->Cliente . "', 
         '" . $datos->Objeto . "', 
         '" . $datos->Presupuesto . "', 
         '" . $datos->Plazo . "', 
         '" . $datos->idArea . "', 
         '" . $datos->idCiudad . "', 
         '" . $datos->ExpresionInteres . "', 
         '" . $datos->Propuesta . "', 
         '" . $datos->Link . "', 
         '" . $datos->ResultadoFinal . "', 
         '" . $usuario . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            NumeroDeProceso = VALUES(NumeroDeProceso),
            Cliente = VALUES(Cliente),
            Objeto = VALUES(Objeto),
            Presupuesto = VALUES(Presupuesto),
            Plazo = VALUES(Plazo),
            idArea = VALUES(idArea),
            idCiudad = VALUES(idCiudad),
            ExpresionInteres = VALUES(ExpresionInteres),
            Propuesta = VALUES(Propuesta),
            Link = VALUES(Link),
            Estado = VALUES(Estado),
            Usuario = VALUES(Usuario),
            fechaCargue = VALUES(fechaCargue);";
            
   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      if ($id  == "NULL")
      {
         $id = $link->insert_id;
      }

      $sql = "INSERT INTO op_fechas(id, Publicacion, obsPrepliego, Apertura, Visita, obsPliego, requiereCompraPliego, plazoCompra, valorPliego, Cierre) VALUES 
      (
         '" . $id . "', 
         '" . $datos->Fecha_Publicacion . "', 
         '" . $datos->Fecha_ObservacionesPrepliego . "', 
         '" . $datos->Fecha_Apertura . "', 
         '" . $datos->Fecha_Audiencia . "', 
         '" . $datos->Fecha_ObservacionesPliego . "', 
         '" . $datos->CompraPliego . "', 
         '" . $datos->Fecha_PlazoCompraPliego . "', 
         '" . $datos->Fecha_ValorPliego . "', 
         '" . $datos->Fecha_Cierre . "'
      )
      ON DUPLICATE KEY UPDATE
         Publicacion = VALUES(Publicacion),
         obsPrepliego = VALUES(obsPrepliego),
         Apertura = VALUES(Apertura),
         Visita = VALUES(Visita),
         obsPliego = VALUES(obsPliego),
         requiereCompraPliego = VALUES(requiereCompraPliego),
         plazoCompra = VALUES(plazoCompra),
         valorPliego = VALUES(valorPliego),
         Cierre = VALUES(Cierre)";

      $link->query(utf8_decode($sql));

      if ( $link->error == "")
      {
         $sql = "INSERT INTO op_formaEvaluacion(id, Tecnica, Financiera, Economica, industriaNacional, criteriosDesempate, resultadoPreEvaluacion) VALUES 
            (
               '" . $id . "', 
               '" . $datos->Evaluacion_Tecnica . "', 
               '" . $datos->Evaluacion_Financiera . "', 
               '" . $datos->Evaluacion_Economica . "', 
               '" . $datos->Evaluacion_IndustriaNacional . "', 
               '" . $datos->Evaluacion_CriteriosDesempate . "', 
               '" . $datos->ResultadoPreEvaluacion . "'
            )
         ON DUPLICATE KEY UPDATE 
            Tecnica = VALUES(Tecnica),
            Financiera = VALUES(Financiera),
            Economica = VALUES(Economica),
            industriaNacional = VALUES(industriaNacional),
            criteriosDesempate = VALUES(criteriosDesempate),
            resultadoPreEvaluacion = VALUES(resultadoPreEvaluacion);";

         $link->query(utf8_decode($sql));

         if ( $link->error == "")
         {
            $sql = "INSERT INTO op_requisitos(id, capitalDeTrabajo, Liquidez, Endeudamiento, coberturaIntereses, rentabilidadPatrimonio, rentabilidadActivo, experienciaHabilitante, experienciaEspecifica) VALUES 
               (
                  '" . $id . "', 
                  '" . $datos->Req_CapitalDeTrabajo . "', 
                  '" . $datos->Req_Liquidez . "', 
                  '" . $datos->Req_Endeudamiento . "', 
                  '" . $datos->Req_CoberturaIntereses . "', 
                  '" . $datos->Req_RentabilidadPatrimonio . "', 
                  '" . $datos->Req_RentabilidadActivo . "',
                  '" . $datos->ExperienciaHabilitante . "',
                  '" . $datos->ExperienciaEspecifica . "'
               )
            ON DUPLICATE KEY UPDATE 
               capitalDeTrabajo = VALUES(capitalDeTrabajo),
               Liquidez = VALUES(Liquidez),
               Endeudamiento = VALUES(Endeudamiento),
               coberturaIntereses = VALUES(coberturaIntereses),
               rentabilidadPatrimonio = VALUES(rentabilidadPatrimonio),
               rentabilidadActivo = VALUES(rentabilidadActivo),
               experienciaHabilitante = VALUES(experienciaHabilitante),
               experienciaEspecifica = VALUES(experienciaEspecifica)";

            $link->query(utf8_decode($sql));

            if ( $link->error == "")
            {
               $sql = "DELETE FROM op_personal WHERE idOportunidad = '$id'";
               $link->query(utf8_decode($sql));

               if ($datos->Perfiles == 0)
               {
                  
               } else
               {
                  $values = "";
                  foreach ($datos->Perfiles as $key => $value) 
                  {
                     $values .= '(' . $id . ', \'' . $value->Cantidad . '\', \'' . $value->Cargo . '\', \'' . $value->Hab_Estudios . '\', \'' . $value->Hab_Experiencia . '\', \'' . $value->Adi_Estudios . '\', \'' . $value->Adi_Experiencia . '\'), ';
                  }
                  $values = substr($values, 0, -2);

                  $sql = 'INSERT INTO op_personal(idOportunidad, Cantidad, Cargo, habilitanteEstudios, habilitanteExperiencia, adicionalEstudios, adicionalExperiencia) VALUES ' . $values . ';';
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
   } else
   {
      echo $link->error;
   }
?>