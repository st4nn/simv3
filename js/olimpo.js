	
	$.getScript("../js/cl_Crear.js", function(ev)
	{

	});

	jQuery.expr[':'].Contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};
	jQuery.expr[':'].contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};

	$(document).delegate('.lnAbrirCliente', 'click', function(event) 
	{
		event.preventDefault();
		var idCliente = $(this).attr("idCliente");

		cargarModulo("clientes/cl_Crear.html", "Ver Cliente", function()
		{
			cl_Crear_cargarCliente(idCliente);
		});
	});

	$(document).delegate('.lnkAbrirOportunidad', 'click', function(event) 
	{
		event.preventDefault();
		var idOportunidad = $(this).attr("idOportunidad");
		localStorage.setItem("wsp_simv3_idOportunidad", idOportunidad);
		cargarModulo("oportunidades/op_crear.html", "Ver Oportunidad", function()
		{
			if (jQuery.isFunction(op_home))
        	{
				cargarOportunidad(op_crear);
			}
		});
		
	});

	$(document).delegate('.lnkOportunidades', 'click', function(event) 
    {
    	event.preventDefault();
        var criterios = [];
        var idArea = parseInt($(this).attr("idArea"));
        var Cierre = parseInt($(this).attr("Cierre"));
        var fecha = "'" + obtenerFecha().substr(0, 10) + " 00:00:00'";
        if (Cierre != undefined)
        {
	        criterios.push({
	            parametro : 'Cierre',
	            condicion : '>=',
	            valor : fecha
	        });
        	
        }
        if (idArea > 0)
        {
            criterios.push({
                parametro : 'idArea',
                condicion : '=',
                valor : idArea
            });
        }

        localStorage.setItem("wsp_simv3_Oportunidades", JSON.stringify(criterios));

        cargarModulo("oportunidades/op_home.html", "Oportunidades", function()
        {
        	if (jQuery.isFunction(op_home))
        	{
        		$("#frmOpHome_Buscar").trigger('submit');
        	}
        });
    });