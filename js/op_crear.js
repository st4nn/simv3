op_crear();

function op_crear()
{
	$(".datepicker").datepicker({
		    clearBtn: true,
		    language: "es",
		    orientation: "top auto",
		    daysOfWeekHighlighted: "0",
		    autoclose: true,
		    todayHighlight: true
		});

	$(document).delegate('.txtOpotunidad_Requisitos', 'change', function(event) 
	{
		var contenedor = $(this).parent("td").parent("tr");
		var comparadores = $(contenedor).find("[data-valor]");
		var valor = "";
		var ingresado = $(this).val();
		$.each(comparadores, function(index, val) 
		{
			$(val).removeClass('green-600');
			$(val).removeClass('red-600');
			$(val).removeClass('wb-close');
			$(val).removeClass('wb-minus');
			$(val).removeClass('wb-check');

			valor = $(val).attr("data-valor");

			if (ingresado == "")
			{
				$(val).addClass('wb-minus');
			} else
			{
				if (valor >= ingresado)
				{
					$(val).addClass('wb-check');
					$(val).addClass('green-600');
				} else
				{
					$(val).addClass('wb-close');
					$(val).addClass('red-600');
				}
			}
		});
	});

	$("#btnOportunidades_AbrirLink").on("click", function(evento)
	{
		abrirURL($("#txtOportunidades_Link").val());
	});

	$("#btnOportunidades_AgregarPerfil").on("click", function(evento)
	{
		evento.preventDefault();
		var modulo = $("#cntOportunidades_Perfiles_PrimeraFila").html();
		modulo = modulo.replace("btnOportunidades_Perfiles_Borrar hide", "btnOportunidades_Perfiles_Borrar");
		$("#cntOportunidades_Perfiles").append('<div class="col-sm-6">' + modulo + '</div>');
	});

	$(document).delegate('.btnOportunidades_Perfiles_Borrar', 'click', function(evento) 
	{
		evento.preventDefault();
		$(this).parent("h3").parent("div").parent("div").remove();
	});
}