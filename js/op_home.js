op_home();

function op_home()
{
	$(document).delegate('.lnkOpHome_AbrirCliente', 'click', function(event) 
	{
		event.preventDefault();
		var idCliente = $(this).attr("idCliente");
		localStorage.setItem("wsp_simv3_idCliente", idCliente);
		window.location.replace("../clientes/cl_Crear.html");
	});
	$("#btnOpHome_NuevoCliente").on("click", function(ev)
		{
			ev.preventDefault();
			delete localStorage.wsp_simv3_idCliente;
			window.location.replace("op_crear.html");
		});
	$("#frmOpHome_Buscar").on("submit", function(ev)
		{
			ev.preventDefault();
			$.post('../server/php/scripts/cargarOportunidades.php', {usuario : Usuario.id, Parametro: $("#txtOpHome_Parametro").val()}, function(data, textStatus, xhr) 
			{
				if (data != 0)
				{
					var tds = "";
					var http = "";
					$.each(data, function(index, val) 
					{
						if (val.Link.indexOf("http") < 0)
						{
							http = "http://";
						} else
						{
							http = "";
						}

						 tds += '<tr>';
			                tds += '<td>' + val.NumeroDeProceso + '</td>';
			                tds += '<td><a href="#" idCliente="' + val.Cliente + '" class="lnkOpHome_AbrirCliente">' + val.ClienteNombre + '</a></td>';
			                tds += '<td>' + val.Objeto + '</td>';
			                tds += '<td>' + val.Presupuesto + '</td>';
			                tds += '<td>' + val.Plazo + '</td>';
			                tds += '<td>' + val.Ciudad + '</td>';			                
			                tds += '<td>' + val.Area + '</td>';	
			                tds += '<td><a href="' + http + val.Link + '" target="_blank">' + val.Link + '</td>';
			             tds += '</tr>';
					});
					$("#tblOpHome_Resultados").crearDataTable(tds);
				} else
				{
					Mensaje("Error", "No se encontraron resultados con el parámetro " + $("#txtOpHome_Parametro").val());
				}
			}, "json");
		});
	$("#tblOpHome_Resultados").crearDataTable();
	$("#btnOpHome_BusquedaAvanzada").on("click", function(ev)
	{
		ev.preventDefault();
		if ($("#cntOpHome_BusquedaAvanzada").is(":visible"))
		{
			$("#cntOpHome_BusquedaAvanzada").hide();
		} else
		{
			$("#cntOpHome_BusquedaAvanzada").show();
			$("#cntOpHome_BusquedaAvanzada form")[0].reset();
		}
	});

	$(document).delegate('.btnOpHome_BorrarParametro', 'click', function(event) 
	{
		event.preventDefault();
		$(this).parent("td").parent("tr").remove();
	});

	$("#btnOpHome_AgregarParametro").on("click", function(ev)
	{
		ev.preventDefault();
		var tds = "";
		tds += '<tr>';
			tds += '<td class="col-md-3">';
				tds += '<select class="form-control cboOpHome_Parametro">';
					tds += '<option value="Nombre">Nombre</option>';
					tds += '<option value="NIT">NIT</option>';
					tds += '<option value="Naturaleza">Naturaleza</option>';
					tds += '<option value="Direccion">Direccion</option>';
					tds += '<option value="Telefono">Telefono</option>';
					tds += '<option value="sitioWeb">sitio Web</option>';
					tds += '<option value="Pais">Pais</option>';
					tds += '<option value="Ciudad">Ciudad</option>';
					tds += '<option value="Mision">Misión</option>';
					tds += '<option value="Vision">Visión</option>';
				tds += '</select>';
			tds += '</td>';
			tds += '<td class="col-md-3">';
				tds += '<select class="form-control cboOpHome_Condicion">';
					tds += '<option value="=">Igual a</option>';
					tds += '<option value=">">Mayor que</option>';
					tds += '<option value=">=">Mayor o Igual que</option>';
					tds += '<option value="<">Menor que</option>';
					tds += '<option value="<">Menor o igual que</option>';
					tds += '<option value="<>">Diferente de</option>';
					tds += '<option value="LIKE">Contiene</option>';
					tds += '<option value="Empieza">Empieza por</option>';
					tds += '<option value="Termina">Termina por</option>';
					tds += '<option value="NOT LIKE">No Contiene</option>';
					tds += '<option value="IN">Incluye</option>';
					tds += '<option value="NOT IN">No Incluye</option>';
					tds += '<option value="IS NULL">Vacío</option>';
					tds += '<option value="IS NOT NULL">No está vacío</option>';
				tds += '</select>';
			tds += '</td>';
			tds += '<td class="col-md-4">';
				tds += '<input type="text" class="form-control cboOpHome_Valor">';
			tds += '</td>';
			tds += '<td><button class="btn btn-danger btnOpHome_BorrarParametro"><i class="icon wb-trash"></i> Quitar</button></td>';
		tds += '</tr>';

		$("#tblOpHome_BusquedaAvanzada tbody").append(tds);
	});
}
