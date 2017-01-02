<?php
	include "init.php";

	$ec = new ExchangeClient();
	$usuario = $_GET['usuario'];
	$obj = $ec->init("gcg\\$usuario", "Aqui va la Clave", NULL, "https://oamail-ca.wspgroup.com/EWS/Services.wsdl");

	$abj = $ec->get_messages(1);
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
	}

	echo "Bienvenido $Nombre";
?>