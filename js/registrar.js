jQuery(document).ready(function($) {
  ready_registrar();
});
function ready_registrar()
{
	var Usuario = JSON.parse(localStorage.getItem('wsp_simv3'));

	if (Usuario == null || Usuario === undefined)
	{
		delete localStorage.wsp_simv3;
  		window.location.replace("../index.html");
	} 

	$("#lblUsuarioNombre").text(Usuario.Nombre);
	$("#txtRegistrar_id").val(Usuario.id);
	$("#txtRegistrar_correo").val(Usuario.Correo);

	$("#txtRegistrar_empresa").cargarCombo("Empresas");
	$("#txtRegistrar_perfil").cargarCombo("Perfiles");
	$("#txtRegistrar_sede").cargarCombo("Sedes");
	$("#txtRegistrar_area").cargarCombo("Areas");

	$("#frmRegistrar").on("submit", function(evento)
 	{
 		evento.preventDefault();
 		$("#frmRegistrar").generarDatosEnvio("txtRegistrar_", function(datos)
 		{
		  if ($("#txtCrearUsuario_perfil").val() == "")
		  {
		    Mensaje("Error", "Por favor selecciona el Perfil");
		    $("#txtCrearUsuario_perfil").focus();
		  } else
		  {
		    if ($("#txtCrearUsuario_empresa").val() == "")
		    {
		      Mensaje("Error", "Por favor selecciona la Empresa");
		      $("#txtCrearUsuario_empresa").focus();
		    } else
		    {
		        $.post("../server/php/scripts/registrarUsuario.php",
		        {datos: datos}, function(data, textStatus, xhr)
		        {
		          if (data == 1)
		          {
		            Mensaje("Ok", "El Usuario ha sido almacenado.");    
		            var objUser = JSON.parse(localStorage.getItem('wsp_simv3'));
		            var cDate = new Date();
		            objUser.Cargo = $("#txtRegistrar_cargo").val();
		            objUser.idArea = $("#txtRegistrar_area").val();
		            objUser.cDate = cDate;
				    localStorage.setItem("wsp_simv3", JSON.stringify(objUser));    
				    window.location.replace("home.html");
		            
		          } else
		          {
		            Mensaje("Error", data);    
		          }
		        }).always(function() 
		        {
		          //Cuando Finaliza
		        }).fail(function() {
		          Mensaje("Error", "No fue posible almacenar el Usuario, por favor intenta nuevamente.");
		        });
		    }
		  }
 		});
 	});
}


$.fn.cargarCombo = function(seccion, callback, restricciones)
{
  /**
   * seccion  {Perfiles, Empresas, Areas, Sedes};
  **/
  var obj = $(this);

  if (callback === undefined)
    {callback = function(){};}
  if (restricciones === undefined)
    {restricciones = [];}
  
  var idUsuario = 0;

  var ruta = '../' + calcularSubDirectorio();
  ruta += "server/php/scripts/cargar" + seccion + ".php";
  $.post(ruta, {usuario : idUsuario}, function(data)
    {
      var idx = 0;
      var tds = "";
      var flag = 0;
      $.each(data, function(index, campo)
        {
          $.each(restricciones, function(idx, restriccion) 
          {
             if (restriccion == campo.id)
             {
                flag = 1;
             }
          });
          if (flag == 0)
          {
            tds += '<option value="' + campo.id + '">' + campo.Nombre + '</option>';
          }

          flag = 0;
          idx++
        });

      if (idx == 0)
      {
        Mensaje("Error", "No fue posible cargar " + seccion + ", por favor actualiza la página.");
      } else
      {
        $(obj).find("option").remove();
        $(obj).append(tds);
        callback();
      }
    }, "json").always(function() 
    {
      
    }).fail(function() {
      Mensaje("Error", "No fue posible cargar " + seccion + ", por favor actualiza la página.");
    });
}
function calcularSubDirectorio()
{
  var numDirectorios = parseInt(location.href.split("/").length) - 5;
  var res = "";
  for (var i = 0; i < numDirectorios; i++) 
  {
    res += "../";
  }
  return res;
}
$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
      if ($(val).attr("type") == 'checkbox')
      {
          datos[$(val).attr("id").replace(restricciones, "")] = $(val).is(':checked');
      } else
      {
        datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
      }
    }
  });
  datos = JSON.stringify(datos);  

  callback(datos);
}
function Mensaje(Titulo, Mensaje)
{
  if (Titulo == "Error")
  {
    alertify.error(Mensaje);
  } else if (Titulo == "Ok")
  {
    alertify.success(Mensaje);
  } else if (Titulo == "Hey")
  {
    alertify.success(Mensaje);
  } else
  {
    alertify.message(Mensaje);
  }
}