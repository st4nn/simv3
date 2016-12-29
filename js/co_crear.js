co_crear();

function co_crear()
{
	$(".datepicker").datepicker({
		    clearBtn: true,
		    language: "es",
		    orientation: "top auto",
		    daysOfWeekHighlighted: "0",
		    autoclose: true,
		    todayHighlight: true
		});

	$("#txtCo_Crear_TipoDeTrabajo, #txtCo_Crear_Especialidad").select2();
	$('#txtCo_Crear_Cliente').iniciarSelectRemoto("cargarClientes");
	$("#txtCo_Crear_idArea").iniciarSelectRemoto("cargarAreas", 350, 1);
	$("#txtCo_Crear_idCiudad").iniciarSelectRemoto("cargarCiudades");

	$("#btnCo_Crear_AgregarCliente").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearCliente();
	});

	$("#btnCo_Crear_AgregarArea").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearArea();
	});

	$("#btnCo_Crear_AgregarCiudad").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearCiudad();
	});

	$("#btnCo_Crear_Adjunto").on("click", function()
	{
		$("#txtCo_Archivos_Archivo").trigger('click');
	});

	$("#cntCo_Crear_DirectorProyecto").iniciarResponsables();

	$("#cntCo_Archivos").iniciarObjArchivos({objPrefijo : $("#txtCo_Crear_Prefijo"), Proceso: "Contratos", Usuario: Usuario.id});

	$("#txtCo_Crear_Consorcio").on("change", function()
	{
		if ($(this).val() == "Si")
		{
			$("#txtCo_Crear_PorcentajeParticipacion").attr("readonly", false);
			$("#cntCo_Crear_Consorcio").slideDown();
		} else
		{
			$("#txtCo_Crear_PorcentajeParticipacion").attr("readonly", true);
			$("#txtCo_Crear_PorcentajeParticipacion").val(100);
			$("#cntCo_Crear_Consorcio").slideUp();
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
		$("#cntPropuestas_Consorcios").append('<div class="row">' + modulo + '</div>');
	});

	$("#cntCo_Crear_Documentos [data-plugin=switchery]").on("change", function()
	{
		var obj = $(this).parent('td').parent('tr').find('.chkCo_Crear_Documento');
		console.log(obj);

		if ($(this).is(':checked'))
		{
			$(obj).attr('disabled', false);
		} else
		{
			$(obj).attr('disabled', true);
		}
	});
}