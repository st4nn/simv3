informacionEstructual();

var graph, paper;
function informacionEstructual()
{
	informacionEstructural_cargarEstructuras();

	$("#btnInformacionEstructural_GraficoGuardar").click(function(event) 
	{	
		$.post('../server/php/scripts/crearOrganigramaMiembros.php', {usuario: Usuario.id, idOrganigrama : $("#txtInformacionEstructural_idOrganigrama").val(), vinculos : JSON.stringify(graph.toJSON())}, 
		function(data, textStatus, xhr) 
		{
			if (data == 1)
			{
				Mensaje("Hey", "Cambios Guardados");
			} else
			{
				Mensaje("Error", data);
			}
		});
	});
	$(document).delegate('.lblInformacionOrganizacional_Estructura', 'click', function(event) 
	{
		event.preventDefault();
		var idOrganigrama = $(this).attr("idOrganigrama");
		var titulo = $(this).find("strong").text();
		
		$("#txtInformacionEstructural_idOrganigrama").val(idOrganigrama);
		$.post('../server/php/scripts/cargarOrganigrama.php', {idOrganigrama: idOrganigrama}, function(data, textStatus, xhr) 
		{
			Mensaje("Hey", "El Organigrama ha sido cargado");
			$("#lblInformacionEstructural_Titulo").text(titulo);
			
			informacionEstructural_crearGraph(function()
			{
				if (data != 0)
				{
					graph.fromJSON(data);
				} else
				{
					graph.clear();
				}					
			});

		}, "json").fail(function()
		{
			Mensaje("Hey", "No fue posible descargar el Organigrama");
		});
	});
	$(document).delegate('.btnInformacionEstructural_EstructuraBorrar', 'click', function(event) 
	{
		var obj = this;
		var idOrganigrama = $(obj).attr("idOrganigrama");
		alertify.set({"labels" : {"ok" : "Si, Borrar", "cancel" : "No, Volver"}});
		alertify.confirm("Confirma que desea borrar este elemento?", function (ev) 
		{
			if (ev)
			{
				$.post('../server/php/scripts/borrarOrganigrama.php', {idLogin: Usuario.id, idOrganigrama : idOrganigrama} , function(data, textStatus, xhr) 
				{
					if (data == 1)
					{
						$(obj).parent("td").parent("tr").remove();
					} else
					{
						Mensaje("Error", data);
					}
				});
			} 
		});

	});

	$("#frmInformacionEstructural_Crear").on("submit", function(event) 
	{
		event.preventDefault();
		if ($("#txtInformacionEstructural_CrearNombre").val() != "")
		{
			$.post('../server/php/scripts/crearOrganigrama.php', {idLogin : Usuario.id, idCliente : localStorage.wsp_simv3_idCliente, Nombre : $("#txtInformacionEstructural_CrearNombre").val()}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					if (data > 0)
					{
						Mensaje("Hey", "Estructura Creada");
						
						var tds = "";
						tds += '<tr>';
							tds += '<td>';
								tds += '<button class="btn btn-danger btn-icon btn-round btnInformacionEstructural_EstructuraBorrar" idOrganigrama="' + data + '"><i class="icon wb-trash"></i></button>';
							tds += '</td>';
							tds += '<td>';
								tds += '<a class="content lblInformacionOrganizacional_Estructura" href="#" idOrganigrama="' + data + '">';
									tds += '<strong>' + $("#txtInformacionEstructural_CrearNombre").val() + '</strong><br>';
									tds += '<span class="font-size-10">' + Usuario.nombre + ' ' + obtenerFecha() + '</span>';
								tds += '</a>';
							tds += '</td>';
						tds += '</tr>';
						$("#tblInformacionEstructural_Estructuras tbody").append(tds);
					}
				}
			});
		} else
		{
			Mensaje("Error", "Debe introducir un Nombre");
		}
	});
	$("#btnInformacionEstructural_PanelOcultar").click(function(event) 
	{
		event.preventDefault();
		$("#cntInformacionEstructual_Panel1").hide();
		$("#btnInformacionEstructural_PanelMostrar").show();
		$("#cntInformacionEstructural_AreaTrabajo").removeClass('col-md-8');
		$("#cntInformacionEstructural_AreaTrabajo").addClass('col-md-12');
		var ancho = $("#cntInfEstructural_Paper").parent("div");
		var alto = $(ancho).height();
		ancho = $(ancho).width();
		paper.setDimensions(ancho, alto);
	});

	$("#btnInformacionEstructural_PanelMostrar").click(function(event) 
	{
		event.preventDefault();
		$("#cntInformacionEstructual_Panel1").show();
		$("#btnInformacionEstructural_PanelMostrar").hide();
		$("#cntInformacionEstructural_AreaTrabajo").removeClass('col-md-12');
		$("#cntInformacionEstructural_AreaTrabajo").addClass('col-md-8');
		var ancho = $("#cntInfEstructural_Paper").parent("div");
		var alto = $(ancho).height();
		ancho = $(ancho).width();
		paper.setDimensions(ancho, alto);
	});

	
	$("#btnInformacionEstructural_MiembroBorrar").click(function(event) 
	{
		alertify.set({"labels" : {"ok" : "Si", "cancel" : "No, Volver"}});
		alertify.confirm("Confirma que desea borrar este elemento?", function (ev) 
		{
			if (ev)
			{
				var objId = $("#txtInformacionEstructural_MiembroId").val();
				var obj = graph.getCell(objId);
				obj.remove();
				$("#cntInformacionEstructural_NuevoElemento").modal("hide");
			} 
		});
	});

	$("#btnInformacionEstructural_MiembroEditar").click(function(event) 
	{
		var objId = $("#txtInformacionEstructural_MiembroId").val();
		var obj = graph.getCell(objId);
		
		obj.attr('.cargo', {text : $("#txtInformacionEstructural_MiembroCargo").val()});
		obj.attr('.nombre', {text : $("#txtInformacionEstructural_MiembroNombre").val()});
		obj.attr('.correo', {text : $("#txtInformacionEstructural_MiembroCorreo").val()});
		obj.attr('.tel', {text : $("#txtInformacionEstructural_MiembroTelefono").val()});
		obj.attr('.ext', {text : $("#txtInformacionEstructural_MiembroExtension").val()});
		obj.attr('.cel', {text : $("#txtInformacionEstructural_MiembroCelular").val()});
		obj.attr('image', {"xlink:href" : "../assets/images/" + $("#txtInformacionEstructural_MiembroGenero").val() + ".png"})
	});

	$("#btnInformacionEstructural_MiembroAgregar").on("click", function(evento)
		{
			evento.preventDefault();
			
			member(0, 
					0, 
					$("#txtInformacionEstructural_MiembroNombre").val(), 
					$("#txtInformacionEstructural_MiembroCargo").val(), 
					$("#txtInformacionEstructural_MiembroCorreo").val(), 
					$("#txtInformacionEstructural_MiembroTelefono").val(), 
					$("#txtInformacionEstructural_MiembroExtension").val(), 
					$("#txtInformacionEstructural_MiembroCelular").val(), 
					$("#txtInformacionEstructural_MiembroGenero").val() + ".png");
		});

	$("#btnInformacionEstructural_NuevoElemento").click(function(event) 
	{
		event.preventDefault();

			$("#btnInformacionEstructural_MiembroBorrar").hide();
			$("#btnInformacionEstructural_MiembroEditar").hide();
			$("#btnInformacionEstructural_MiembroAgregar").show();

		$("#cntInformacionEstructural_NuevoElemento form")[0].reset();
	});

	var randomScalingFactor = function(){
		      return Math.round(Math.random()*255);
		    };

	$("#btnInformacionEstructural_LineaNuevo").click(function(event) 
	{
		event.preventDefault();

		informacionEstructural_crearLink({ x: 20, y: 20 }, { x: 160, y: 20 });
	});

	/*
	var datos = [
		{ "x" : 300, "y" : 15, "Nombre" : "Jorge Celis", "Cargo" : "CEO", "Correo" : "jorge.celis@wspgroup.com", "Telefono" : "7562989", "Ext" : "", "Cel" :  "", "Icono" : "male.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 0},
		{ "x" : 90, "y" : 200, "Nombre" : "Jhonathan Espinosa", "Cargo" : "VPMarketing", "Correo" : "jhonathan.epsinosa@wspgroup.com", "Telefono" : "7562989", "Ext" : "", "Cel" :  "3214551215", "Icono" : "male.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 1},
		{ "x" : 300, "y" : 200, "Nombre" : "Pablo Manrrique", "Cargo" : "VPSales", "Correo" : "pablo.manrrique@wspgroup.com", "Telefono" : "7562989", "Ext" : "", "Cel" :  "", "Icono" :"male.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 1},
		{ "x" : 500, "y" : 200, "Nombre" :  "Lisa Simpson", "Cargo" : "VPProduction", "Correo" : "", "Telefono" : "7562989", "Ext" : "", "Cel" :  "", "Icono" :"female.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 1},
		{ "x" : 400, "y" : 350, "Nombre" : "Maggie Simpson", "Cargo" : "Manager", "Correo" : "", "Telefono" : "7562989", "Ext" : "", "Cel" :  "", "Icono" :"female.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 3},
		{ "x" : 190, "y" : 350, "Nombre" : "Lenny Leonard", "Cargo" : "Manager", "Correo" : "", "Telefono" : "7562989", "Ext" : "", "Cel" :  "", "Icono" :"male.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 2},
		{ "x" : 190, "y" : 500, "Nombre" : "Carl Carlson", "Cargo" : "Manager", "Correo" : "", "Telefono" : "7562989", "Ext" : "", "Cel" :  "", "Icono" : "male.png", "Color" : "#5CD29D", "textColor" : "#000", "idPadre" : 2}
	];

	var objMember = [];
	var idx = 1;
	$.each(datos, function(index, val) 
	{
		
		objMember[idx] = member(val.x, val.y, val.Nombre, val.Cargo, val.Correo, val.Telefono, val.Ext, val.Cel, val.Icono, val.Color, val.textColor);
		idx++;
	});

	idx = 1 ;
	$.each(datos, function(index, val) 
	{
		if (val.idPadre != 0)
		{
			informacionEstructural_crearLink(objMember[val.idPadre], objMember[idx]);
		}
		idx++;
	});
	*/
	
	$(document).delegate('g .rotatable', 'dblclick', function(event) 
	{
		$("#cntInformacionEstructural_NuevoElemento").modal("show");
		$("#txtInformacionEstructural_MiembroCargo").val($(this).find(".cargo").text());
		$("#txtInformacionEstructural_MiembroNombre").val($(this).find(".nombre").text());
		$("#txtInformacionEstructural_MiembroCorreo").val($(this).find(".correo").text());
		$("#txtInformacionEstructural_MiembroTelefono").val($(this).find(".tel").text());
		$("#txtInformacionEstructural_MiembroExtension").val($(this).find(".ext").text());
		$("#txtInformacionEstructural_MiembroCelular").val($(this).find(".celular").text());

		var Genero = $(this).find("image").attr("href").replace("../assets/images/", "").replace(".png", "");

		$("#txtInformacionEstructural_MiembroGenero").val(Genero);

		$("#btnInformacionEstructural_MiembroBorrar").show();
		$("#btnInformacionEstructural_MiembroEditar").show();
		$("#btnInformacionEstructural_MiembroAgregar").hide();
	});
}

function member(x, y, nombre, cargo, correo, telefono, extension, celular, image, background, textColor) {
		background  = background || '#5CD29D';
	    textColor = textColor || "#000";

	    var cell = new joint.shapes.org.Member({
	        position: { x: x, y: y },
	        attrs: {
	            '.card': { fill: background, stroke: 'none'},
	              image: { 'xlink:href': '../assets/images/'+ image, opacity: 0.7 },
	            '.cargo': { text: cargo, fill: textColor, 'word-spacing': '-5px', 'letter-spacing': 0},
	            '.nombre': { text: nombre, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 },
	            '.correo' : { text: correo, fill: "#3366FF", 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 },
	            '.tel' : { text: telefono, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 },
	            '.ext' : { text: extension, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 },
	            '.cel' : { text: celular, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
	        }
	    });
	    
	    graph.addCell(cell);

	    
	    return false;
	};

function informacionEstructural_cargarEstructuras()
{
	$.post('../server/php/scripts/cargarEstructuras.php', {usuario : Usuario.id, idCliente : localStorage.wsp_simv3_idCliente}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			var tds = "";
			$.each(data, function(index, val) 
			{
				tds += '<tr>';
					tds += '<td>';
						tds += '<button class="btn btn-danger btn-icon btn-round btnInformacionEstructural_EstructuraBorrar" idOrganigrama="' + val.idOrganigrama + '"><i class="icon wb-trash"></i></button>';
					tds += '</td>';
					tds += '<td>';
						tds += '<a class="content lblInformacionOrganizacional_Estructura" href="#" idOrganigrama="' + val.idOrganigrama + '">';
							tds += '<strong>' + val.Nombre + '</strong><br>';
							tds += '<span class="font-size-10">' + val.Usuario + ' ' + val.fechaActualizacion + '</span>';
						tds += '</a>';
					tds += '</td>';
				tds += '</tr>';
			});
			$("#tblInformacionEstructural_Estructuras tbody").append(tds);
		} 
	}, "json");
}
function informacionEstructural_crearLink(source, target, breakpoints)
{
	var tmpSource = { x: 20, y: 20 }, tmpTarget = { x: 150, y: 20 };
	if (source === undefined)
	{

	} else
	{
		if (source.id === undefined)
		{
			source = source || tmpSource;
			tmpSource = { x : source.x, y : source.y };
		} else
		{
			tmpSource = { id: source.id };
		}

		if (target.id === undefined)
		{
			target = target || tmpTarget;
			tmpTarget = { x : target.x, y : target.y };
		} else
		{
			tmpTarget = { id: target.id };
		}
	}

	var link = new joint.dia.Link({
		    source: tmpSource,
		    target: tmpTarget,
		    vertices: breakpoints,
		    attrs: {
	            '.connection': {
	                'fill': 'none',
	                'stroke-linejoin': 'round',
	                'stroke-width': '2',
	                'stroke': '#4b4a67'
	            },
	            '.marker-target': { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 10 0 L 0 5 L 10 10 z' }
	        }
		});
	
	graph.addCell([link]);
	return link;
}

function informacionEstructural_crearGraph(callback)
{
	if (callback === undefined)
    {callback = function(){};}

	if (graph == null)
	{
		$("#cntInformacionEstructural_Inicio").remove();
		graph = new joint.dia.Graph();

		var ancho = $("#cntInfEstructural_Paper").parent("div");
			ancho = $(ancho).width();

		paper = new joint.dia.Paper({
		    el: $('#cntInfEstructural_Paper'),
		    width: ancho,
		    height: 1000,
		    gridSize: 20,
		    model: graph,
		    perpendicularLinks: true,
		    restrictTranslate: false
		});

		paper.on("cell:pointerdblclick", function(cellView, evt, x, y)
		{
			$("#txtInformacionEstructural_MiembroId").val(cellView.model.cid);
		});
	}

	callback();
}