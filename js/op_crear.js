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

	$("#txtOp_Crear_Prefijo").val(obtenerPrefijo());

	$('#txtOp_Crear_Cliente').iniciarSelectRemoto("cargarClientes");
	$("#txtOp_Crear_idArea").iniciarSelectRemoto("cargarAreas", 350, 1);
	$("#txtOp_Crear_idCiudad").iniciarSelectRemoto("cargarCiudades");

	var elem = document.querySelector('#frmOp_Crear .switchery');
	var init = new Switchery(elem);

	var idOportunidad = localStorage.getItem('wsp_simv3_idOportunidad'); 
	if (idOportunidad != null)
	{
		cargarOportunidad(idOportunidad);
	}


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
		abrirURL($("#txtOp_Crear_Link").val());
	});

	$("#btnOportunidades_AgregarPerfil").on("click", function(evento)
	{
		evento.preventDefault();
		var modulo = '';
		modulo += '<div class="col-sm-6 col-md-4">';
		  modulo += '<div class="panel panel-bordered panel-dark">';
		    modulo += '<div class="panel-heading">';
		        modulo += '<div class="panel-heading">';
		          modulo += '<h3 class="panel-title"></h3>';
		          modulo += '<div class="panel-actions">';
					modulo += '<button type="button" class="btn btn-icon btn-danger btn-round pull-right btnOportunidades_Perfiles_Borrar">';
						modulo += '<i class="icon wb-close" aria-hidden="true"></i>';
					modulo += '</button>';
		          modulo += '</div>';
		        modulo += '</div>';
		    modulo += '</div>';
		    modulo += '<div class="panel-body cntOportunidades_Perfiles_Perfil">';
		    	modulo += '<div class="row">';
		        	modulo += '<div class="col-sm-4">';
		        		modulo += '<div class=" form-group">';
							modulo += '<label for="" class="control-label">Cantidad</label>';
							modulo += '<input type="number" placeholder="Cantidad" class="form-control">';
		        		modulo += '</div>';
					modulo += '</div>';
					modulo += '<div class="col-sm-8 form-group">';
						modulo += '<label for="" class="control-label">Cargo</label>';
						modulo += '<input type="text" placeholder="Cargo" class="form-control">';
					modulo += '</div>';
		    	modulo += '</div>';
		    	modulo += '<div class="row">';
					modulo += '<h5>Habilitante</h5>';
					modulo += '<div class="col-sm-6 form-group">';
						modulo += '<textarea id="" rows="2" class="form-control" placeholder="Estudios"></textarea>';
					modulo += '</div>';
					modulo += '<div class="col-sm-6 form-group">';
						modulo += '<textarea id="" rows="2" class="form-control" placeholder="Estudios"></textarea>';
					modulo += '</div>';
				modulo += '</div>';
				modulo += '<div class="row">';
					modulo += '<h5>Adicional</h5>';
					modulo += '<div class="col-sm-6 form-group">';
						modulo += '<textarea id="" rows="2" class="form-control" placeholder="Estudios"></textarea>';
					modulo += '</div>';
					modulo += '<div class="col-sm-6">';
						modulo += '<textarea id="" rows="2" class="form-control" placeholder="Experiencia"></textarea>';
					modulo += '</div>';
				modulo += '</div>';
		    modulo += '</div>';
		  modulo += '</div>';
		modulo += '</div>';
		$("#cntOportunidades_Perfiles").append(modulo);
	});

	$(document).delegate('.btnOportunidades_Perfiles_Borrar', 'click', function(evento) 
	{
		evento.preventDefault();
		$(this).parent("div").parent("div").parent("div").parent("div").parent("div").remove();
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
				$("#cntOportunidades_Perfiles div").remove();
				$("#cntOp_Crear_Responsables_Correos li").remove();
				$("#cntOp_Archivos_DivArchivo_Listado li").remove();
		  	} 		  
		  });
	});

	$("#txtOp_Crear_AgregarResponsable").on('keyup', function (e, ev) 
	{
		ev.preventDefault();
	    if (e.keyCode == 13) 
	    {
	        alert("Diste enter");
	    }
	});

	$("#btnOp_Crear_CompartirProceso").on("click", function(evento)
	{
		evento.preventDefault();
		modalCompartirProceso("Oportunidad");
	});

	$("#chkOp_Crear_CompraPliego").on("change", function()
	{
		if ($(this).is(":checked"))
		{
			$("#cntOp_CompraPliego").slideDown();
			$("#txtOp_Crear_CompraPliego").val("Si");
		} else
		{
			$("#cntOp_CompraPliego").slideUp();
			$("#txtOp_Crear_CompraPliego").val("No");
		}
	});

	$("#btnOp_Crear_Adjunto").on("click", function(evento)
	{
		evento.preventDefault();
		$("#txtOp_Archivos_Archivo").trigger('click');
	});

	$("#frmOp_Crear").on("submit", function(evento)
	{
		evento.preventDefault();
		
		$("#frmOp_Crear").generarDatosEnvio("txtOp_Crear_", function(datos)
		{
			datos = $.parseJSON(datos);

			objPerfiles = $(".cntOportunidades_Perfiles_Perfil");
			if (objPerfiles.length == 0)
			{
				datos.Perfiles = 0;
			} else
			{
				var idx = 0;
				var objPerfil = [];
				var txtPerfiles = {};
				$.each(objPerfiles, function(index2, val2) 
				{
					objPerfil[idx] = {};
					txtPerfiles = $(val2).find(".form-control");
					objPerfil[idx].Cantidad = $(txtPerfiles[0]).val();
					objPerfil[idx].Cargo = $(txtPerfiles[1]).val();
					objPerfil[idx].Hab_Estudios = $(txtPerfiles[2]).val();
					objPerfil[idx].Hab_Experiencia = $(txtPerfiles[3]).val();
					objPerfil[idx].Adi_Estudios = $(txtPerfiles[4]).val();
					objPerfil[idx].Adi_Experiencia = $(txtPerfiles[5]).val();
					
					idx++;
				});

				datos.Perfiles = objPerfil;
			}

			objResponsables = $("#cntOp_Crear_Responsables_Correos .list-group-item");

			if (objResponsables.length == 0)
			{
				datos.Responsables = 0;
			} else
			{
				datos.Responsables = '';
				$.each(objResponsables, function(index, val) 
				{
					datos.Responsables += $(val).attr('idUsuario') + ', ';
				});

				datos.Responsables = datos.Responsables.substr(0, (datos.Responsables.length - 2));
			}

			datos = JSON.stringify(datos);
			
			$.post('../server/php/scripts/crearOportunidad.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
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

	$("#cntOp_Archivos").iniciarObjArchivos({objPrefijo : $("#txtOp_Crear_Prefijo"), Proceso: "Oportunidades", Usuario: Usuario.id});

	$("#cntOp_Crear_Responsables").iniciarResponsables();

	$("#btnOportunidades_ActualizarEstado").on("click", function(evento)
	{
		$("#btnOp_Crear_Guardar").trigger('click');
	});
}

function cargarOportunidad(idOportunidad)
{
	var criterios = [];

    criterios[0] = 
    {
        parametro : 'id',
        condicion : '=',
        valor : idOportunidad
    };

    criterios = JSON.stringify(criterios);

	$.post('../server/php/scripts/cargarOportunidades.php', {usuario: Usuario.id, Parametro: '', Criterios : criterios}, function(data, textStatus, xhr) 
	{
		$("#lblOp_Crear_Tipo").text("Editar");
		delete localStorage.wsp_simv3_idOportunidad;    
		
		$.post('../server/php/scripts/oportunidades_CargarPersonal.php', {Usuario : Usuario.id, idOportunidad: idOportunidad}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				var objContenedor;
				$.each(data, function(index, val) 
				{
					$("#btnOportunidades_AgregarPerfil").trigger('click');
					objContenedor = $(".cntOportunidades_Perfiles_Perfil");
					objContenedor = objContenedor[objContenedor.length - 1];
					var txtPerfiles = $(objContenedor).find(".form-control");
					
					$(txtPerfiles[0]).val(val.Cantidad);
					$(txtPerfiles[1]).val(val.Cargo);
					$(txtPerfiles[2]).val(val.habilitanteEstudios);
					$(txtPerfiles[3]).val(val.habilitanteExperiencia);
					$(txtPerfiles[4]).val(val.adicionalEstudios);
					$(txtPerfiles[5]).val(val.adicionalExperiencia);

				});
			}
		}, 'json');

		$.post('../server/php/scripts/oportunidades_CargarResponsables.php', {Usuario : Usuario.id, idOportunidad: idOportunidad}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				var tds = "";
				$.each(data, function(index, val) 
				{
		          tds += '<li class="list-group-item" idUsuario="' + val.idUsuario + '">';
		            tds += '<div class="media">';
		              tds += '<div class="media-left text-center">';
		                  tds += '<i class="icon wb-user margin-left-10 font-size-20"></i>';
		              tds += '</div>';
		              tds += '<div class="media-body">';
		                tds += '<h4 class="media-heading">' + val.Nombre + '</h4>';
		                tds += '<small>' + val.Correo + '</small>';
		              tds += '</div>';
		              tds += '<div class="media-right">';
		                tds += '<a class="btnResponsables_Quitar" href="javascript:void(0)">';
		                  tds += '<i class="icon wb-close">';
		                tds += '</a>';
		              tds += '</div>';
		            tds += '</div>';
		          tds += '</li>';
				});
				$("#cntOp_Crear_Responsables_Correos").append(tds);
			}

		}, 'json');
		
		$.each(data, function(index, val) 
		{
			$("#txtOp_Crear_NumeroDeProceso").val(val.NumeroDeProceso);
			$("#txtOp_Crear_Cliente").iniciarSelectRemotoConDefault({script : "cargarClientes", id : val.Cliente, name : val.ClienteNombre});
			$("#txtOp_Crear_Objeto").val(val.Objeto);
			$("#txtOp_Crear_Presupuesto").val(val.Presupuesto);
			$("#txtOp_Crear_Plazo").val(val.Plazo);
			$("#txtOp_Crear_idArea").iniciarSelectRemotoConDefault({script : "cargarAreas", delay : 350, minimo : 1, id : val.idArea, name : val.Area});
			$("#txtOp_Crear_idCiudad").iniciarSelectRemotoConDefault({script : "cargarCiudades", id : val.idCiudad, name : val.Ciudad});
			$("#txtOp_Crear_ExpresionInteres").val(val.ExpresionInteres);
			$("#txtOp_Crear_Propuesta").val(val.Propuesta);
			 if (val.requiereCompraPliego == 'Si')
			 {
				$("#chkOp_Crear_CompraPliego").trigger('click');
				$("#txtOp_Crear_Fecha_PlazoCompraPliego").val(val.plazoCompra);
				$("#txtOp_Crear_Fecha_ValorPliego").val(val.valorPliego);
			 }

			 $("#txtOp_Crear_Fecha_Publicacion").val(val.Publicacion);
			 $("#txtOp_Crear_Fecha_ObservacionesPrepliego").val(val.obsPrepliego);
			 $("#txtOp_Crear_Fecha_Apertura").val(val.Apertura);
			 $("#txtOp_Crear_Fecha_Audiencia").val(val.Visita);
			 $("#txtOp_Crear_Fecha_ObservacionesPliego").val(val.obsPliego);
			 $("#txtOp_Crear_Fecha_Cierre").val(val.Cierre);

			 $("#txtOp_Crear_ExperienciaHabilitante").val(val.experienciaHabilitante);
			 $("#txtOp_Crear_ExperienciaEspecifica").val(val.experienciaEspecifica);

			 $("#txtOp_Crear_Evaluacion_Tecnica").val(val.Tecnica);
			 $("#txtOp_Crear_Evaluacion_Financiera").val(val.Financiera);
			 $("#txtOp_Crear_Evaluacion_Economica").val(val.Economica);
			 $("#txtOp_Crear_Evaluacion_IndustriaNacional").val(val.industriaNacional);
			 $("#txtOp_Crear_Evaluacion_CriteriosDesempate").val(val.criteriosDesempate);
			 $("#txtOp_Crear_ResultadoPreEvaluacion").val(val.resultadoPreEvaluacion);

			 $("#txtOp_Crear_Req_CapitalDeTrabajo").val(val.capitalDeTrabajo);
			 $("#txtOp_Crear_Req_Liquidez").val(val.Liquidez);
			 $("#txtOp_Crear_Req_Endeudamiento").val(val.Endeudamiento);
			 $("#txtOp_Crear_Req_CoberturaIntereses").val(val.coberturaIntereses);
			 $("#txtOp_Crear_Req_RentabilidadPatrimonio").val(val.rentabilidadPatrimonio);
			 $("#txtOp_Crear_Req_RentabilidadActivo").val(val.rentabilidadActivo);
			 //$("#txtOp_Crear_Req_").val(val.);

			 $(".txtOpotunidad_Requisitos").trigger('change');

			 $("#txtOp_Crear_Link").val(val.Link);
			 $("#txtOp_Crear_ResultadoFinal").val(val.idEstado);


		});

		//$("#frmOp_Crear [plugin=select2]").select2('refresh');
	}, 'json');
}