<?php
	include "init.php";

	function validarUsuario($usuario, $clave)
	{
		$ec = new ExchangeClient();
		$obj = $ec->init("gcg\\$usuario", $clave, NULL, "https://oamail-ca.wspgroup.com/EWS/Services.wsdl");

		$abj = $ec->get_messages(1);
		if ($abj === false)
		{
			return false;
		} else
		{
			$abj = $abj[0];

			$r = true;
			$Resultado = array();

			$Resultado['error'] = "";

			foreach ($abj->to_recipients as $key => $value) 
			{
				$find = strpos($value->EmailAddress, $usuario);
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
					$find = strpos($value->EmailAddress, $usuario);
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

			if ($r)
			{
				$Resultado['error'] = 'No se encontró el Usuario';
				return false;
			}

			return $Resultado;
		}			
	}

?>