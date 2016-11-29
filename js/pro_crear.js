pro_crear();

function pro_crear()
{
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
		} else
		{
			$("#txtPro_Crear_PorcentajeParticipacion").attr("readonly", true);
			$("#txtPro_Crear_PorcentajeParticipacion").val(100);
		}
	});

	$(document).delegate('.btnPorpuestas_Consorciado_Quitar', 'click', function(evento) {
		evento.preventDefault();
		$(this).parent("div").parent("div").remove();
	});

	$("#btnPropuestas_AgregarConsorciado").on("click", function(evento)
	{
		evento.preventDefault();
		var modulo = $("#cntPropuestas_Consorcios_PrimeraFila").html();
		modulo = modulo.replace(" btnQuitarFake hide", "");
		$("#cntPropuestas_Consorcios").append('<div class="col-sm-12">' + modulo + '</div>');
	});
	
}