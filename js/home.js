home();

function home()
{
	$("#lblHome_Usuario").text(Usuario.nombre);

	$.post('../server/php/scripts/cargarDatosInicio.php', {usuario : Usuario.id}, function(data2, textStatus, xhr) 
                {
                    var Oportunidades = 0, Propuestas = 0;
                    $("#tblHome_Oportunidades tbody tr").remove();
                    var tds = "";
                    $.each(data2, function(index, val) 
                    {
                         tds += '<tr>';
                         tds += '<td>' + val.Sector + '</td>';
                         if (val.Propuestas > 0)
                         {
                            tds += '<td><a href="#cntDetalles" class="lnkPropuestas" Sector="' + val.Sector + '">' + val.Propuestas + '</a></td>';
                         } else
                         {
                            tds += '<td>' + val.Propuestas + '</td>';
                         }

                         if (val.Oportunidades > 0)
                         {
                            tds += '<td><a href="#cntDetalles" class="lnkOportunidades" Sector="' + val.Sector + '">' + val.Oportunidades + '</a></td>';
                         } else
                         {
                            tds += '<td>' + val.Oportunidades + '</td>';
                         }

                         tds += '</tr>';
                         Oportunidades += parseInt(val.Oportunidades);
                         Propuestas += parseInt(val.Propuestas);
                    });

                     tds += '<tr class="font-weight-900">';
                     tds += '<td>TOTAL</td>';
                     tds += '<td><a href="#cntDetalles" class="lnkPropuestas" Sector="">' + Propuestas + '</a></td>';
                     tds += '<td><a href="#cntDetalles" class="lnkOportunidades" Sector="">' + Oportunidades + '</a></td>';
                     tds += '</tr>';

                    $("#tblHome_Oportunidades tbody").append(tds);

                     /*
                     $(".lnkOportunidades").on("click", function(evento)
                    {
                        cargarDetalles("Oportunidades", $(this).attr("Sector"));
                    });

                    $(".lnkPropuestas").on("click", function(evento)
                    {
                        cargarDetalles("Propuestas", $(this).attr("Sector"));
                    });
                    */


                }, "json");

	var randomScalingFactor = function(){
		      return Math.round(Math.random()*255);
		    };
		  	var barChartData = {
		  		labels : ["Sin Asignar","Estado 2","Estado 3", "Estado 4"],
		  		datasets : [
		  			{
		  				label: "My 1 dataset",
		  				fillColor : "rgba(rgbStyle,0.5)",
		  				strokeColor : "rgba(rgbStyle,0.8)",
		  				highlightFill : "rgba(rgbStyle,0.75)",
		  				highlightStroke : "rgba(rgbStyle,1)",
		  				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(), randomScalingFactor()]
		  			},
		  			{
		  				label: "My 2 dataset",
		  				fillColor : "rgba(rgbStyle,0.5)",
		  				strokeColor : "rgba(rgbStyle,0.8)",
		  				highlightFill : "rgba(rgbStyle,0.75)",
		  				highlightStroke : "rgba(rgbStyle,1)",
		  				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(), randomScalingFactor()]
		  			},
		  			{
		  				label: "My 3 dataset",
		  				fillColor : "rgba(rgbStyle,0.5)",
		  				strokeColor : "rgba(rgbStyle,0.8)",
		  				highlightFill : "rgba(rgbStyle,0.75)",
		  				highlightStroke : "rgba(rgbStyle,1)",
		  				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(), randomScalingFactor()]
		  			},
		  			{
		  				label: "My 4 dataset",
		  				fillColor : "rgba(rgbStyle,0.5)",
		  				strokeColor : "rgba(rgbStyle,0.8)",
		  				highlightFill : "rgba(rgbStyle,0.75)",
		  				highlightStroke : "rgba(rgbStyle,1)",
		  				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(), randomScalingFactor()]
		  			},
		  			{
		  				label: "My 4 dataset",
		  				fillColor : "rgba(rgbStyle,0.5)",
		  				strokeColor : "rgba(rgbStyle,0.8)",
		  				highlightFill : "rgba(rgbStyle,0.75)",
		  				highlightStroke : "rgba(rgbStyle,1)",
		  				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(), randomScalingFactor()]
		  			}

		  		]
		  	};

  	var ctx = document.getElementById("canvas").getContext("2d");

  	//var chart = new Chart(ctx).HorizontalBar(barChartData, {
	var objRGB = "";
	//console.log(barChartData.datasets);
	$.each(barChartData.datasets, function(index, val) 
	{	
		objRGB = randomScalingFactor() + "," + randomScalingFactor() + "," + randomScalingFactor();
		
		barChartData.datasets[index].fillColor = val.fillColor.replace("rgbStyle", objRGB);
		barChartData.datasets[index].strokeColor = val.strokeColor.replace("rgbStyle", objRGB);
		barChartData.datasets[index].highlightFill = val.highlightFill.replace("rgbStyle", objRGB);
		barChartData.datasets[index].highlightStroke = val.highlightStroke.replace("rgbStyle", objRGB);
	});
  		//console.log(barChartData.datasets);
  		
	var chart = new Chart(ctx).Bar(barChartData, {
			responsive: true,
    	barShowStroke: true
		});
}
