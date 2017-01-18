function pro_home()
{
	$(document).delegate('.lnkProHome_AbrirCliente', 'click', function(event) 
	{
		event.preventDefault();
		var idCliente = $(this).attr("idCliente");
		localStorage.setItem("wsp_simv3_idCliente", idCliente);
		window.location.replace("../clientes/cl_Crear.html");
	});

	$(document).delegate('.lnkProHome_AbrirPropuesta', 'click', function(event) {
		event.preventDefault();
		var idPropuesta = $(this).attr("idPropuesta");
		localStorage.setItem("wsp_simv3_idPropuesta", idPropuesta);
		window.location.replace("../propuestas/pro_crear.html");
	});
	$("#btnProHome_NuevoCliente").on("click", function(ev)
		{
			ev.preventDefault();
			delete localStorage.wsp_simv3_idCliente;
			window.location.replace("pro_crearq.html");
		});
	$("#frmProHome_Buscar").on("submit", function(ev)
		{
			ev.preventDefault();
			var Criterios = localStorage.getItem('wsp_simv3_Propuestas'); 
			var parametros = {usuario : Usuario.id, Parametro: $("#txtProHome_Parametro").val()};
			if (Criterios != null)
			{
				parametros.Criterios = Criterios;
				delete localStorage.wsp_simv3_Propuestas;    
			}

			$.post('../server/php/scripts/cargarPropuestas.php', parametros, function(data, textStatus, xhr) 
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
			                tds += '<td><a href="#" class="lnkProHome_AbrirPropuesta" idPropuesta="' + val.id + '">'  + val.NumeroDeProceso + '</a></td>';
			                tds += '<td><a href="#" idCliente="' + val.Cliente + '" class="lnkProHome_AbrirCliente">' + val.nCliente + '</a></td>';
			                tds += '<td>' + val.Objeto + '</td>';
			                tds += '<td>' + val.Presupuesto + '</td>';
			                tds += '<td>' + val.Plazo + '</td>';
			                tds += '<td>' + val.Ciudad + '</td>';			                
			                tds += '<td>' + val.Area + '</td>';	
			                tds += '<td><a href="' + http + val.Link + '" target="_blank">' + val.Link + '</td>';
			             tds += '</tr>';
					});
					$("#tblProHome_Resultados").crearDataTable(tds);
				} else
				{
					Mensaje("Error", "No se encontraron resultados con el parámetro " + $("#txtProHome_Parametro").val());
				}
			}, "json");
		});
	$("#tblProHome_Resultados").crearDataTable();
	$("#btnProHome_BusquedaAvanzada").on("click", function(ev)
	{
		ev.preventDefault();
		if ($("#cntProHome_BusquedaAvanzada").is(":visible"))
		{
			$("#cntProHome_BusquedaAvanzada").hide();
		} else
		{
			$("#cntProHome_BusquedaAvanzada").show();
			$("#cntProHome_BusquedaAvanzada form")[0].reset();
		}
	});

	$(document).delegate('.btnProHome_BorrarParametro', 'click', function(event) 
	{
		event.preventDefault();
		$(this).parent("td").parent("tr").remove();
	});

	$("#btnProHome_AgregarParametro").on("click", function(ev)
	{
		ev.preventDefault();
		var tds = "";
		tds += '<tr>';
			tds += '<td class="col-md-3">';
				tds += '<select class="form-control cboProHome_Parametro">';
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
				tds += '<select class="form-control cboProHome_Condicion">';
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
				tds += '<input type="text" class="form-control cboProHome_Valor">';
			tds += '</td>';
			tds += '<td><button class="btn btn-danger btnProHome_BorrarParametro"><i class="icon wb-trash"></i> Quitar</button></td>';
		tds += '</tr>';

		$("#tblProHome_BusquedaAvanzada tbody").append(tds);
	});

	var Criterios = localStorage.getItem('wsp_simv3_Propuestas'); 
	if (Criterios != null)
	{
		$("#frmProHome_Buscar").trigger('submit');
	}
}
