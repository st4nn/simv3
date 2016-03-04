cl_home();

function cl_home()
{
	$(document).delegate('.lnkClHome_AbrirCliente', 'click', function(event) 
	{
		event.preventDefault();
		var idCliente = $(this).attr("idCliente");
		localStorage.setItem("wsp_simv3_idCliente", idCliente);
		window.location.replace("cl_Crear.html");
	});
	$("#btnClHome_NuevoCliente").on("click", function(ev)
		{
			ev.preventDefault();
			delete localStorage.wsp_simv3_idCliente;
			window.location.replace("cl_Crear.html");
		});
	$("#frmClHome_Buscar").on("submit", function(ev)
		{
			ev.preventDefault();
			$.post('../server/php/scripts/cargarClientes.php', {usuario : Usuario.id, Parametro: $("#txtClHome_Parametro").val()}, function(data, textStatus, xhr) 
			{
				if (data != 0)
				{
					var tds = "";
					var http = "";
					$.each(data, function(index, val) 
					{
						if (val.sitioWeb.indexOf("http") < 0)
						{
							http = "http://";
						} else
						{
							http = "";
						}

						 tds += '<tr>';
			                tds += '<td>' + val.NIT + '</td>';
			                tds += '<td><a href="#" idCliente="' + val.idCliente + '" class="lnkClHome_AbrirCliente">' + val.Nombre + '</a></td>';
			                tds += '<td>' + val.Telefono + '</td>';
			                tds += '<td>' + val.Pais + '</td>';
			                tds += '<td>' + val.Ciudad + '</td>';
			                tds += '<td><a href="' + http + val.sitioWeb + '" target="_blank">' + val.sitioWeb + '</td>';
			             tds += '</tr>';
					});
					$("#tblClHome_Resultados").crearDataTable(tds);
				} else
				{
					Mensaje("Error", "No se encontraron resultados con el parámetro " + $("#txtClHome_Parametro").val());
				}
			}, "json");
		});
	$("#tblClHome_Resultados").crearDataTable();
	$("#btnClHome_BusquedaAvanzada").on("click", function(ev)
	{
		ev.preventDefault();
		if ($("#cntClHome_BusquedaAvanzada").is(":visible"))
		{
			$("#cntClHome_BusquedaAvanzada").hide();
		} else
		{
			$("#cntClHome_BusquedaAvanzada").show();
			$("#cntClHome_BusquedaAvanzada form")[0].reset();
		}
	});

	$(document).delegate('.btnClHome_BorrarParametro', 'click', function(event) 
	{
		event.preventDefault();
		$(this).parent("td").parent("tr").remove();
	});

	$("#btnClHome_AgregarParametro").on("click", function(ev)
	{
		ev.preventDefault();
		var tds = "";
		tds += '<tr>';
			tds += '<td class="col-md-3">';
				tds += '<select class="form-control cboClHome_Parametro">';
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
				tds += '<select class="form-control cboClHome_Condicion">';
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
				tds += '<input type="text" class="form-control cboClHome_Valor">';
			tds += '</td>';
			tds += '<td><button class="btn btn-danger btnClHome_BorrarParametro"><i class="icon wb-trash"></i> Quitar</button></td>';
		tds += '</tr>';

		$("#tblClHome_BusquedaAvanzada tbody").append(tds);
	});
}
