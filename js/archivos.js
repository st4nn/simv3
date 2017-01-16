infoAdministrativa();

function infoAdministrativa()
{
	$("#cntInfoAdministrativa_Arbol").nestable();

	$("#btnInfoAdministrativa_CarpetaCrear").on("click", function(evento)
		{
			evento.preventDefault();
			$("#frmInfoAdministrativa_CrearCarpeta")[0].reset();
			$("#cntInfoAdministrativa_CrearCarpeta").modal('show');
		});

	$(document).delegate('#cntInfoAdministrativa_Arbol .dd3-content', 'click', function(event) 
	{
		var ruta = $(this).attr("rutareal");
		$("#txtInfoAdministrativa_Ruta").val(ruta);
		$("#lblInfoAdministrativa_Ruta").text(ruta.replace(/\//g, " > "));
		//cargarArchivosNavegador(ruta);
		//cargarRutasNavegador2(ruta);
		var obj = $(this).parent(".dd3-item");
		var listas = $(obj).find("ol");
		listas = listas.length;

		var objIcono = $(obj).parent("ol").find("i");
		$(objIcono).removeClass("fa-folder");

		objIcono = $(objIcono[0]).find("i");

		objIcono = $(obj).find(">span");
		objIcono = $(objIcono).find("i");

		$(objIcono).addClass("fa-folder");

		if (listas > 0)
		{
			if ($(obj).hasClass('dd-collapsed'))
			{
			  $("#cntInfoAdministrativa_Arbol").nestable("expandItem", obj);
			} else
			{
			  $("#cntInfoAdministrativa_Arbol").nestable("collapseItem", obj);
			}
		}

		obj = $("[rutapadre='"+ rutaPadre + "']").find("ol");
		$(obj).nestable();
	});

	$("#frmInfoAdministrativa_CrearCarpeta").on("submit", function(evento)
	{
		evento.preventDefault();
		if ($("#txtInfoAdministrativa_CrearCarpeta_Nombre").val() == "")
		{
			Mensaje("Error", "El nombre no puede estar vacío", "danger");
		} else
		{
			$.post('../server/php/scripts/infoAdministrativa/crearCarpeta.php', {Usuario: Usuario.id, ruta : $("#txtInfoAdministrativa_Ruta").val(), nombre : $("#txtInfoAdministrativa_CrearCarpeta_Nombre").val()}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data, 'danger');
				} else
				{
					$("#cntInfoAdministrativa_CrearCarpeta").modal('hide');
					Mensaje("Hey", 'Carpeta Creada', 'success');

					navegador_agregarItem({Ruta: $("#txtInfoAdministrativa_Ruta").val() , NomCarpeta : $("#txtInfoAdministrativa_CrearCarpeta_Nombre").val()});


					/*<ol class="dd-list" rutapadre="">
						    		<li class="dd-item dd3-item" rutapadre="">
								    	<div class="dd3-content" rutaReal="">Algo</div>
								    </li>
						    	</ol>*/
				}
			});
		}
	})
}

function navegador_agregarItem(val)
{
  var nomCarpeta = val.NomCarpeta.replace(/\//g, "");
  var rutaPadre = val.Ruta.replace(/\//g, "");
  var Ruta = rutaPadre + nomCarpeta;

  var obj2 = $("[rutapadre='"+ Ruta + "']");
  if ($(obj2).length == 0)
  {
    if (rutaPadre != "hd")
    {
      var obj = $("[rutapadre='"+ rutaPadre + "']").find("ol");

      if (obj.length == 0)
      {
        tds = '<ol class="dd-list" rutapadre="ol_' + rutaPadre + '">';
          tds += '</ol>';

        $("[rutapadre='"+ rutaPadre + "']").append(tds);
      }
    }

    tds = '<li class="dd-item dd3-item" rutapadre="' + Ruta + '">';
        tds += '<div class="dd3-content" rutaReal="' + val.Ruta + '/' + val.NomCarpeta + '">' + nomCarpeta + '</div>';
    tds += '</li>';

      if (rutaPadre != "hd")
      {
        $("[rutapadre='ol_" + rutaPadre + "']").append(tds);
      } else
      {
        $("[rutapadre='" + rutaPadre + "']").append(tds);
      }
  }

}