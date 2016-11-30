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

	$('#txtOp_Crear_Cliente').iniciarSelectRemoto("cargarClientes");
	$("#txtOp_Crear_idArea").iniciarSelectRemoto("cargarAreas", 350, 1);
	$("#txtOp_Crear_idCiudad").iniciarSelectRemoto("cargarCiudades");

	$(document).delegate('.txtOpotunidad_Requisitos', 'change', function(event) 
	{
		var obj = this;
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
				var condicion = $(obj).attr("data-condicion");

				if (eval(valor + " " + condicion + " " + ingresado))
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

	$("#btnOp_Crear_AgregarCliente").on("click", function(evento)
	{
		evento.preventDefault();
	});

	$("#btnOp_Crear_AgregarCliente").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearCliente();
	});

	$("#btnOp_Crear_AgregarArea").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearArea();
	});

	$("#btnOp_Crear_AgregarCiudad").on("click", function(evento)
	{
		evento.preventDefault();
		modalCrearCiudad();
	});

	$("#btnOp_Crear_Nueva").on("click", function(evento)
	{
		evento.preventDefault();
		alertify.set({"labels" : {"ok" : "Si, continuar", "cancel" : "No, Volver"}});
		alertify.confirm("Se perderan los datos que no haya guardar, ¿está seguro de continuar?.",
		  function(ev){
		  	if (ev)
		  	{
				$("#frmOp_Crear")[0].reset();
				$("[data-plugin=select2]").val("");
				$("[data-plugin=select2]").trigger("change");
		  	} 		  
		  });
	});

	$("#btnOp_Crear_CompartirProceso").on("click", function(evento)
	{
		evento.preventDefault();
		modalCompartirProceso("Oportunidad");
	});

	
}