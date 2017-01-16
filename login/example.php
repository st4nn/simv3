<?php
	include "init.php";

	$usuario = $_GET['usuario'];
	$clave = $_GET['clave'];

	$obj = validarUsuario($usuario, $clave);
	echo print_r($obj, true);

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


		
/*		$ec = new ExchangeClient();
		$ec->init("gcg\\$usuario", $clave, NULL, "https://oamail-ca.wspgroup.com/EWS/Services.wsdl");
		$obj = $ec->get_messages(1);
		echo print_r($obj[0]->from, true);
		echo print_r($obj[0]->from_name, true);

	/*

	echo print_r($OBJ, true);

	function validarUsuario($usuario, $clave, $limite, $salir)
	{
		$ec = new ExchangeClient();
		$obj = $ec->init("gcg\\$usuario", $clave, NULL, "https://oamail-ca.wspgroup.com/EWS/Services.wsdl");

		$abjArr = $ec->get_messages($limite);
		if ($abj === false)
		{
			return false;
		} else
		{			
			$r = true;

			foreach ($abjArr as $key => $abj) 
			{
				$Resultado = array();

				$Resultado['error'] = "";

				foreach ($abj->to_recipients as $key => $value) 
				{
					$find = strpos(strtolower($value->EmailAddress), strtolower($usuario));
					if ($find !== false)
					{
						$r = false;
						$Nombre = $value->Name;
						$Resultado['Nombre'] = $value->Name;
						$Resultado['Correo'] = $value->EmailAddress;
						break 1;
					}
				}

				if ($Nombre == "")
				{
					foreach ($abj->cc_recipients as $key => $value) 
					{
						$find = strpos(strtolower($value->EmailAddress), strtolower($usuario));
						if ($find !== false)
						{
							$r = false;
							$Nombre = $value->Name;
							$Resultado['Nombre'] = $value->Name;
							$Resultado['Correo'] = $value->EmailAddress;
							break 1;
						}
					}
				}

				if (!$r)
				{
					break 1;
				}
			}

			if ($r === true && $salir == true)
			{
				$Resultado['error'] = 'No se encontró el Usuario';
				return false;
			} else
			{
				if ($salir === false)
				{
					return validarUsuario($usuario, $clave, 5, true);
				}
			}

			return $Resultado;
		}			
	}*/

?>