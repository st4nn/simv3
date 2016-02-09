<?php
require("class.phpmailer.php");

function EnviarCorreo($Destinatario, $Asunto, $Mensaje)
{
	
	
	$mail = new PHPMailer();
	$Destinatario .= ", sistema@wspsiso.com";
	$mail->SMTPAuth = true;
	$mail->Username = "sistema@wspsiso.com";
	$mail->Password = "holamundo"; 
	$mail->Host = "localhost";
	$mail->From = "sistema@wspsiso.com";
	$mail->FromName = utf8_decode("Sistema de Información Soteria");
	$mail->Subject = utf8_decode($Asunto);
	$mail->AddAddress($Destinatario . ", sistema@wspsiso.com");
	
	$mail->Body = "<img src='http://wspsiso.com/css/imagenes/Logo.png' /><br />" . utf8_decode($Mensaje . "<br /><br /><span style='font-size:1.5em; color:white;background:black;'><strong>Este mensaje ha sido generado de forma automática, y las respuestas a esta cuenta no serán revisadas.</strong></span>");
	$mail->IsHTML(true);
	$mail->Send();
}	
?>
