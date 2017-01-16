home();

var tmpColores = ['249, 104, 104', '98, 168, 234', '158, 206, 103', '117, 117, 117', '247, 218, 100', '58, 169, 158', '141, 102, 88', '249, 120, 166', '146, 102, 222', '119, 214, 225', '55, 71, 79', '236, 153, 64'];

function home()
{
	jQuery.expr[':'].Contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};
	jQuery.expr[':'].contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};

	$("#lblHome_Usuario").text(Usuario.Nombre);

	$("#txtHome_Trazabilidad_Buscar").on("change keyup paste", function()
	{
		var str = $(this).val();
		str = str.replace(/ /g, '%');

		if (str == "")
		{
			$("#cntHome_Trazabilidad li").show();
		} else
		{
			$("#cntHome_Trazabilidad li").hide();
			$("#cntHome_Trazabilidad li:contains('" + str + "')").show();
		}
	});

	home_cargarDatos();
	home_GenerarGraficaArea();
}


function home_cargarDatos()
{
	$.post('../server/php/scripts/inicio_cargarOportunidadesPropuestas.php', {Usuario : Usuario.id}, function(data2, textStatus, xhr) 
    {
        var Oportunidades = 0, Propuestas = 0;
        $("#tblHome_Oportunidades tbody tr").remove();
        var tds = "";
        $.each(data2, function(index, val) 
        {
             Oportunidades += parseInt(val.Oportunidades);
             Propuestas += parseInt(val.Propuestas);
        });

        tds = "";
        var porcentaje = 0;
        if (Oportunidades == 0)
        {
        	Oportunidades = 1;
        }

        if (Propuestas == 0)
        {
        	Propuestas = 1;
        }

        $.each(data2, function(index, val) 
        {
        	tds += '<tr>';
             	tds += '<td>' + val.Sector + '</td>';
                porcentaje = ((val.Propuestas * 100)/Propuestas);
             	tds += '<td>';
                 	tds += '<div class="progress progress-xs">'
                        tds += '<div class="progress-bar progress-bar-info bg-green-600" aria-valuenow="' + porcentaje + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentaje + '%" role="progressbar">'
                          tds += '<span class="sr-only">' + porcentaje + '%</span>'
                        tds += '</div>'
                    tds += '</div>'
                tds += '</td>';
                if (val.Propuestas > 0)
                {
                    tds += '<td><a href="#cntDetalles" class="lnkPropuestas" Sector="' + val.Sector + '">' + val.Propuestas + '</a></td>';
                } else
                {
                    tds += '<td>' + val.Propuestas + '</td>';
                }
             	porcentaje = ((val.Oportunidades * 100)/Oportunidades);
             	tds += '<td class="">';
                 	tds += '<div class="progress progress-xs">'
                        tds += '<div class="progress-bar progress-bar-info bg-green-600" aria-valuenow="' + porcentaje + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentaje + '%" role="progressbar">'
                          tds += '<span class="sr-only">' + porcentaje + '%</span>'
                        tds += '</div>'
                    tds += '</div>'
                tds += '</td>';
               	if (val.Oportunidades > 0)
                {
                    tds += '<td><a href="#cntDetalles" class="lnkOportunidades" Sector="' + val.Sector + '">' + val.Oportunidades + '</a></td>';
                } else
                {
                    tds += '<td>' + val.Oportunidades + '</td>';
                }
            tds += '</tr>';
        });

        tds += '<tr class="font-weight-900">';
        tds += '<td>TOTAL</td>';
        tds += '<td></td>';
        tds += '<td><a href="#cntDetalles" class="lnkPropuestas" Sector="">' + Propuestas + '</a></td>';
        tds += '<td></td>';
        tds += '<td><a href="#cntDetalles" class="lnkOportunidades" Sector="">' + Oportunidades + '</a></td>';
        tds += '</tr>';

        $("#tblHome_Oportunidades tbody").append(tds);

    }, "json");
}

var randomScalingFactor = function()
{
  return Math.round(Math.random()*255);
};

function home_GenerarGraficaBarras(idObj, barChartData, opciones)
{
	opciones = opciones || {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    };

	var ctx = document.getElementById(idObj).getContext("2d");

	var chart = new Chart(ctx, {type : 'bar', data : barChartData, options: opciones});
}

function home_GenerarGraficaEmpresa()
{
	$.post('../server/php/scripts/inicio_cargarGraficas.php', {Usuario : Usuario.id}, function(data, textStatus, xhr) 
    {

    	if (data.Oportunidades != 0)
    	{
    		var labels = [];
    		var datasets = [];
    	
    		var datos = [];
    		var vBackgroundColor = [];
    		var vBorderColor = [];
			
			var objRGB = randomScalingFactor() + "," + randomScalingFactor() + "," + randomScalingFactor();

    		$.each(data.Oportunidades, function(index, val) 
    		{
    			datos.push(val.Cantidad);
    			labels.push(val.Nombre);
    			vBackgroundColor.push('rgba(' + objRGB + ',0.5)');
    			vBorderColor.push('rgba(' + objRGB + ',1)');
    		});

	  		datasets.push({
	  				label: 'Oportunidades',
	  				data : datos,
	  				borderWidth: 1,
	  				backgroundColor: vBackgroundColor,
	  				borderColor: vBorderColor});
	  				

    		var barChartData = {labels:labels, datasets : datasets};
    		home_GenerarGraficaBarras('canOportunidades', barChartData);
    	}

    	if (data.Propuestas != 0)
    	{
    		var labels = [];
    		var datasets = [];
    	
    		var datos = [];
    		var vBackgroundColor = [];
    		var vBorderColor = [];
    		var objRGB = randomScalingFactor() + "," + randomScalingFactor() + "," + randomScalingFactor();

    		$.each(data.Propuestas, function(index, val) 
    		{
    			datos.push(val.Cantidad);
    			labels.push(val.Nombre);
    			vBackgroundColor.push('rgba(' + objRGB + ',0.5)');
    			vBorderColor.push('rgba(' + objRGB + ',1)');
    		});

	  		datasets.push({
	  				label: 'Propuestas',
	  				data : datos,
	  				borderWidth: 1,
	  				backgroundColor: vBackgroundColor,
	  				borderColor: vBorderColor});
	  				

    		var barChartData = {labels:labels, datasets : datasets};
    		home_GenerarGraficaBarras('canPropuestas', barChartData);
    	}   	

    }, "json");
}

function home_GenerarGraficaArea()
{
	var data = {
	    labels: ["En trámite", "Se presenta propuesta solo WSP", "Se presenta propuesta en Consorcio"],
	    datasets: [
	        {
	            label: "Energía",
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(255, 99, 132, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(255,99,132,1)',
	                'rgba(255,99,132,1)'
	            ],
	            borderWidth: 1,
	            data: [8, 2, 1],
	        },
	        {
	            label: "Telecomunicaciones",
	            backgroundColor: [
	                'rgba(54, 162, 235, 0.2)'
	            ],
	            borderColor: [
	                'rgba(54, 162, 235, 1)'
	            ],
	            borderWidth: 1,
	            data: [7, 0, 0]
	        },
	        {
	            label: "Area 3 ",
	            backgroundColor: [
	                'rgba(255, 0, 0, 0.2)',
	                'rgba(255, 0, 0, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 0, 0, 1)',
	                'rgba(255, 0, 0, 1)'
	            ],
	            borderWidth: 1,
	            data: [0, 6, 0]
	        }
	    ]
	};
	var opciones = {
    barValueSpacing: 20,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        }
      }]
    }
  };

	//home_GenerarGraficaBarras('canOportunidades', data, opciones);
	$.post('../server/php/scripts/inicio_cargarGraficasArea.php', {Usuario : Usuario.id}, function(data, textStatus, xhr) 
    {
    	var estados = [];
    	var areas = [];
    	var coloresBackground = [];
    	var coloresBorder = [];
    	var datos = [];
  	
    	if (data.Oportunidades != 0)
    	{
    		estados = [];
	    	areas = [];
	    	coloresBackground = [];
	    	coloresBorder = [];
	    	datos = [];

    		$.each(data.Oportunidades, function(index, val) 
    		{
    			 estados[val.id] = val.Nombre;
    			 areas[val.idArea] = val.Area;
    		});

    		var labels = [];

    		$.each(areas, function(index, val) 
    		{
    			if (index > 0)
    			{
	    			if (val != undefined)
	    			{
		    			$.each(estados, function(index2, val2) 
		    			{
		    				datos[index] = datos[index] || [];
		    				datos[index][index2] = 0;
		    				coloresBackground[index] = 'rgba(' + tmpColores[index] + ', 0.7)';
							coloresBorder[index] = 'rgba(' + tmpColores[index] + ', 1)';
		    			});
	    			}
    			}
    		});


    		var datasets = [];

    		$.each(data.Oportunidades, function(index, val) 
    		{
    			datos[val.idArea][val.id] = datos[val.idArea][val.id] || parseInt(val.Cantidad);
    		});

    		$.each(estados, function(index, val) 
    		{
    			 if (val != undefined)
    			 {
    			 	labels.push(val);
    			 }
    		});

    		var idSplice = 0;

    		$.each(datos, function(index, val) 
    		{
    			if (val != undefined)
    			{
    				idSplice = 0;
    				$.each(estados, function(indexEstado, valEstado) 
    				{
    					 if (valEstado == undefined)
    					 {
						    val.splice(indexEstado - idSplice,1);
    					 	idSplice++;
    					 }
    				});

					datasets.push({
			            label: areas[index],
			            backgroundColor: coloresBackground[index],
			            borderColor: coloresBackground[index],
			            borderWidth: 1,
			            data: val
			        });
    			}
    		});


    		var barChartData = {labels:labels, datasets : datasets};
    		
			home_GenerarGraficaBarras('canOportunidades', barChartData, opciones);
    	}

    	if (data.Propuestas != 0)
    	{
    		estados = [];
	    	areas = [];
	    	coloresBackground = [];
	    	coloresBorder = [];
	    	datos = [];

    		$.each(data.Propuestas, function(index, val) 
    		{
    			 estados[val.id] = val.Nombre;
    			 areas[val.idArea] = val.Area;
    		});

    		var labels = [];

    		$.each(areas, function(index, val) 
    		{
    			if (index > 0)
    			{
	    			if (val != undefined)
	    			{
		    			$.each(estados, function(index2, val2) 
		    			{
		    				datos[index] = datos[index] || [];
		    				datos[index][index2] = 0;
		    				coloresBackground[index] = 'rgba(' + tmpColores[index] + ', 0.7)';
							coloresBorder[index] = 'rgba(' + tmpColores[index] + ', 1)';
		    			});
	    			}
    			}
    		});


    		var datasets = [];

    		$.each(data.Propuestas, function(index, val) 
    		{
    			datos[val.idArea][val.id] = datos[val.idArea][val.id] || parseInt(val.Cantidad);
    		});

    		$.each(estados, function(index, val) 
    		{
    			 if (val != undefined)
    			 {
    			 	labels.push(val);
    			 }
    		});

    		var idSplice = 0;

    		$.each(datos, function(index, val) 
    		{
    			if (val != undefined)
    			{
    				idSplice = 0;
    				$.each(estados, function(indexEstado, valEstado) 
    				{
    					 if (valEstado == undefined)
    					 {
						    val.splice(indexEstado - idSplice,1);
    					 	idSplice++;
    					 }
    				});

					datasets.push({
			            label: areas[index],
			            backgroundColor: coloresBackground[index],
			            borderColor: coloresBackground[index],
			            borderWidth: 1,
			            data: val
			        });
    			}
    		});


    		var barChartData = {labels:labels, datasets : datasets};
    		
			home_GenerarGraficaBarras('canPropuestas', barChartData, opciones);
    	}
    }, "json");
}