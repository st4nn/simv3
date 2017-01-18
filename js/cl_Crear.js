var tmpIdCiudad = "";
function cl_Crear()
{
	$('[data-plugin="select2"]').select2();

	$("#btnCl_Crear_Nuevo").on("click", function(ev)
		{
			ev.preventDefault();
			$("#frmCl_Crear")[0].reset();
			$("#cntCl_Crear_Funciones").hide();
			$("#txtCl_Crear_Nombre").focus();
			$("#lblCl_Crear_Tipo").text("Crear Cliente");
			$('[data-plugin="select2"]').select2();
		});

	$("#btnCl_Crear_InfoEstructural").on("click", function(ev)
		{
			ev.preventDefault();
			cargarModulo("clientes/informacionEstructural.html", "Información Estructural de " + $("#txtCl_Crear_Nombre").val(), function()
				{
					informacionEstructural_cargarEstructuras($("#txtCl_Crear_idCliente").val());
				});
		});

	$("#btn_Cl_Crear_Acciones").on("click", function(ev)
		{
			ev.preventDefault();
			cargarModulo("clientes/timeline.html", "Actividades de " + $("#txtCl_Crear_Nombre").val(), function()
			{

			});
		});

	$("#txtCl_Crear_idPais").on("change", txtCl_Crear_idPais_Change); 

	
	$("#frmCl_Crear").on("submit", function(ev)
	{
		ev.preventDefault();
		if ($("#txtCl_Crear_Nombre").val() == '')
		{
			Mensaje("Error", "Debe diligenciar por lo menos el nombre de la Empresa");
			$("#txtCl_Crear_Nombre").focus();
		} else
		{
			if ($("#txtCl_Crear_idPais").val() == '')
			{
				$("#txtCl_Crear_idPais").val('190000001');
			}

			if ($("#txtCl_Crear_idCiudad").val() == '')
			{
				$("#txtCl_Crear_idCiudad").val('8099761');
			}
			
			$("#frmCl_Crear").generarDatosEnvio("txtCl_Crear_", function(datos)
			{
				$.post('../server/php/scripts/crearCliente.php', {usuario: Usuario.id, datos : datos}, function(data, textStatus, xhr) 
				{
					if(isNaN(data))	
					{
						Mensaje("Error", data);
					} else
					{
						$("#txtCl_Crear_idCliente").val(parseInt(data));
						cl_Crear_VerFunciones();
						Mensaje("Hey", "Los datos del Cliente han sido almacenados");
					}
				});
			});
		}
	});

	$.post('../server/php/scripts/cargarPaises.php', {usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		$("#txtCl_Crear_idPais").val();
		if (data != 0)	
		{
			$("#txtCl_Crear_idPais option").remove();
			var tds = "";
			$.each(data, function(index, val) 
			{
				 tds += "<option value='" + val.id + "'>" + val.Nombre + "</option>";
			});
			$("#txtCl_Crear_idPais").append(tds);

			$.post('../server/php/scripts/cargarSectoresClientes.php', {usuario : Usuario.id}, function(data, textStatus, xhr) 
			{
				$("#txtCl_Crear_Sector optgroup").remove();
				if (data != 0)
				{
					var tmpCategoria = "";
					var tds = "";
					$.each(data, function(index, val) 
					{
						if (val.Categoria != tmpCategoria)
						{
							tmpCategoria = val.Categoria;
							if (tds == "")
							{
								tds += '<optgroup label="' + val.Categoria + '">';
							} else
							{
								tds += '</optgroup><optgroup label="' + val.Categoria + '">';
							}
						}
						tds += '<option value="' + val.id + '">' + val.Nombre + '</option>';
					});
					$("#txtCl_Crear_Sector").append(tds);
				}
			}, "json");
		}
	}, "json");
}

function cl_Crear_VerFunciones()
{
	$("#lblCl_Crear_Tipo").text("Editar Cliente");
	$("#cntCl_Crear_Funciones").show();
}

function cl_Crear_CargarDatosCliente(idCliente)
{
	$.post('../server/php/scripts/cargarDatosCliente.php', {usuario: Usuario.id, idCliente : $("#txtCl_Crear_idCliente").val()}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			if (data.sectores != undefined)
			{
				$.each(data.sectores, function(index, val) 
				{
					 $("#txtCl_Crear_Sector option[value=" + val.idClSector + "]").prop("selected", "true");
				});
			}
			
			$.each(data.datos, function(index, val) 
			{
				 if ($("#txtCl_Crear_" + index).length)
				 {
				 	$("#txtCl_Crear_" + index).val(val);
				 	if (index == "idPais")
				 	{
				 		txtCl_Crear_idPais_Change();
				 	}

				 	if (index == "idCiudad")
				 	{
				 		tmpIdCiudad = val;
				 	}
				 	
				 }
			});
			$('[data-plugin="select2"]').select2();
		} 
	}, "json");
}

function txtCl_Crear_idPais_Change() 
{
	var idPais = $("#txtCl_Crear_idPais").val();
	$.post('../server/php/scripts/cargarCiudades.php', {usuario : Usuario.id, idPais : idPais}, function(data, textStatus, xhr) 
	{
		$("#txtCl_Crear_idCiudad optgroup").remove();
		if (data != 0)
		{
			var tds = "";
			var tmpDepartamento = "";
			$.each(data, function(index, val) 
			{
				if (val.Departamento != tmpDepartamento)
				{
					tmpDepartamento = val.Departamento;
					if (tds == "")
					{
						tds += '<optgroup label="' + val.Departamento + '">';
					} else
					{
						tds += '</optgroup><optgroup label="' + val.Departamento + '">';
					}
				}
				 tds += '<option value="'+ val.id + '">' + val.Nombre + '</option>';
			});
			$("#txtCl_Crear_idCiudad").append(tds);
			if (tmpIdCiudad != "")
			{
				$("#txtCl_Crear_idCiudad").val(tmpIdCiudad);
				$('[data-plugin="select2"]').select2();
				tmpIdCiudad = "";
			}
		}
	}, "json");
}

function cl_Crear_cargarCliente(idCliente)
{
	if (idCliente == 0 || idCliente == "" || idCliente == null || idCliente == undefined)
	{
		$("#lblCl_Crear_Tipo").text("Crear Cliente");
		$("#cntCl_Crear_Funciones").hide();
		$("#txtCl_Crear_idCliente").val("");
		$("#frmCl_Crear")[0].reset();
	} else
	{
		cl_Crear_VerFunciones();
		$("#txtCl_Crear_idCliente").val(idCliente);
		cl_Crear_CargarDatosCliente(idCliente);
	}
}