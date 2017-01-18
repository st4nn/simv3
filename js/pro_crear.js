function pro_crear()
{
	$("#txtPro_Crear_Prefijo").val(obtenerPrefijo());

	$(".datepicker").datepicker({
		    clearBtn: true,
		    language: "es",
		    orientation: "top auto",
		    daysOfWeekHighlighted: "0",
		    autoclose: true,
		    todayHighlight: true
		});

	$("#txtPro_Crear_Consorcio").on("change", function()
	{
		if ($(this).val() == "Si")
		{
			$("#txtPro_Crear_PorcentajeParticipacion").attr("readonly", false);
			$("#cntPro_Crear_Consorcio").slideDown();
		} else
		{
			$("#txtPro_Crear_PorcentajeParticipacion").attr("readonly", true);
			$("#txtPro_Crear_PorcentajeParticipacion").val(100);
			$("#cntPro_Crear_Consorcio").slideUp();
		}
	});

	$(document).delegate('.btnPorpuestas_Consorciado_Quitar', 'click', function(evento) {
		evento.preventDefault();
		$(this).parent('div').parent("div").parent("div").remove();
	});

	$("#btnPropuestas_AgregarConsorciado").on("click", function(evento)
	{
		evento.preventDefault();
		var modulo = $("#cntPropuestas_Consorcios_PrimeraFila").html();
		modulo = modulo.replace(" btnQuitarFake hide", "");
		$("#cntPropuestas_Consorcios").append('<div class="cntPropuestas_Consorcio">' + modulo + '</div>');
	});

	$("#cntPro_Crear_Responsable_Tecnico").iniciarResponsables();	

	$("#cntPro_Crear_Responsable_Comercial").iniciarResponsables();

	$("#cntPro_Archivos").iniciarObjArchivos({objPrefijo : $("#txtPro_Crear_Prefijo"), Proceso: "Propuestas", Usuario: Usuario.id});

	$('#txtPro_Crear_Cliente').iniciarSelectRemoto("cargarClientes");
	$("#txtPro_Crear_idArea").iniciarSelectRemoto("cargarAreas", 350, 1);
	$("#txtPro_Crear_idCiudad").iniciarSelectRemoto("cargarCiudades");

	$("#btnPro_Crear_AgregarCliente").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearCliente();
	});

	$("#btnPro_Crear_AgregarArea").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearArea();
	});

	$("#btnPro_Crear_AgregarCiudad").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearCiudad();
	});

	$("#btnPropuestas_AbrirLink").on("click", function(evento)
	{
		abrirURL($("#txtPro_Crear_Link").val());
	});

	$("#btnPro_Crear_Adjunto").on("click", function()
	{
		$("#txtPro_Archivos_Archivo").trigger('click');
	});

	$("#btnPropuestas_ActualizarEstado").on("click", function(evento)
	{
		$("#btnPro_Crear_Guardar").trigger('click');
	});

	$("#frmPro_Crear").on("submit", function(evento)
	{
		evento.preventDefault();
		
		$("#frmPro_Crear").generarDatosEnvio("txtPro_Crear_", function(datos)
		{
			datos = $.parseJSON(datos);

			if ($("#txtPro_Crear_Consorcio").val() == 'No')
			{
				datos.Consorciados = 0;
			} else
			{
				var objConsorcios = $(".cntPropuestas_Consorcio");

				var idx = 0;
				var objConsorcio = [];
				var txtConsorcios = {};

				$.each(objConsorcios, function(index2, val2) 
				{
					objConsorcio[idx] = {};
					txtConsorcios = $(val2).find(".form-control");
					objConsorcio[idx].Nombre = $(txtConsorcios[0]).val();
					objConsorcio[idx].Porcentaje = $(txtConsorcios[1]).val();

					idx++;
				});

				datos.Consorciados = objConsorcio;
			}

			var objResponsables = $("#cntPro_Crear_Responsable_Comercial .list-group-item");

			var idx = 0;
			var objResponsable = [];	

			if (objResponsables.length > 0)
			{
				$.each(objResponsables, function(index, val) 
				{
					objResponsable[idx] = {};
					objResponsable[idx].id = $(val).attr("idUsuario");
					objResponsable[idx].Tipo = 'Comercial';

					idx++;
					
				});
			}

			objResponsables = $("#cntPro_Crear_Responsable_Tecnico .list-group-item");

			if (objResponsables.length > 0)
			{
			
				$.each(objResponsables, function(index, val) 
				{
					objResponsable[idx] = {};
					objResponsable[idx].id = $(val).attr("idUsuario");
					objResponsable[idx].Tipo = 'Tecnico';

					idx++;
					
				});
			}

			datos.Responsables = objResponsable;

			datos = JSON.stringify(datos);

			$.post('../server/php/scripts/crearPropuesta.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					Mensaje("Hey", "Los datos han sido ingresados");
					$("#txtOp_Crear_idOportunidad").val(data);
				}
			});
		});
	});

	var idPropuesta = localStorage.getItem('wsp_simv3_idPropuesta'); 
	if (idPropuesta != null)
	{
		var criterios = [];

        criterios[0] = 
        {
            parametro : 'id',
            condicion : '=',
            valor : idPropuesta
        };

        criterios = JSON.stringify(criterios);

		$.post('../server/php/scripts/cargarPropuestas.php', {usuario: Usuario.id, Parametro: '', Criterios : criterios}, function(data, textStatus, xhr) 
		{
			delete localStorage.wsp_simv3_idPropuesta;    
			$.each(data, function(index, val) 
			{
			 	$("#txtPro_Crear_Proceso").val(val.NumeroDeProceso);
				 $.each(val, function(key, valor) 
				 {
				 	if ($("#txtPro_Crear_" + key).length > 0)
				 	{
				 		$("#txtPro_Crear_" + key).val(valor);
				 	}
				 });
			});
		}, 'json');
	}
}
