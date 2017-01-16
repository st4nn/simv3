<?php
	include "init.php";

	function validarUsuario($usuario, $clave, $limite)
	{
		$ec = new ExchangeClient();
		$ec->init("gcg\\$usuario", $clave, NULL, "https://oamail-ca.wspgroup.com/EWS/Services.wsdl");

		$abjArr = $ec->get_messages($limite);
		if ($abjArr === false)
		{
			return false;
		} else
		{			
			$Resultado = array();
			$Nombre = $abjArr[0]->Name;
			$Resultado['Nombre'] = $abjArr[0]->from_name;
			$Resultado['Correo'] = $abjArr[0]->from;

			return $Resultado;
		}			
	}

?>