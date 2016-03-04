var Usuario = null;
var Permisos = null;

$(document).ready(function() {
	functiones();
});
function functiones()
{
  Usuario = JSON.parse(localStorage.getItem('wsp_simv3'));
}

function cargarModulo(vinculo, titulo, callback)
{
  if (callback === undefined)
    {callback = function(){};}

  $(".Modulo").hide();
        var tds = "";
        var nomModulo = "modulo_" + vinculo.replace(/\s/g, "_");
        nomModulo = nomModulo.replace(/\./g, "_");
        nomModulo = nomModulo.replace(/\//g, "_");

        if ($('#' + nomModulo).length)
        {
          $('#' + nomModulo).show();
          if (titulo != null)
          {
            $('#' + nomModulo).find('.page-header').find(".page-title").text(titulo);
          }
          callback();
          controlarPermisos();
        } else
        {
          tds += '<div id="' + nomModulo + '" class="page Modulo">';
            tds += '<div class="page-header">';
              tds += '<h1 class="page-title">' + titulo + '</h1>';
            tds += '</div>';
            tds += '<div class="page-content">';
              tds += '<div class="panel">';
                tds += '<p>Cargando...</p>';
              tds += '</div>';
            tds += '</div>';
          tds += '</div>';

          $("#contenedorDeModulos").append(tds);
          $.get(vinculo, function(data) 
          {
            $("#" + nomModulo + " .panel").html(data);
            callback();
            controlarPermisos();
            
          });
        }
}

$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
     datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
    }
  });
  datos = JSON.stringify(datos);  

  callback(datos);
}
function Mensaje(Titulo, Mensaje)
{
  if (Titulo == "Error")
  {
    alertify.error(Mensaje);
  } else
  {
    alertify.success(Mensaje);
  }
}
function cargadorDeArchivos()
{
  $("#frmCargarCronograma_CargarArchivo").ajaxForm(
  {
    beforeSend: function() 
    {
        var percentVal = '0%';
        $("#txtCargarCronograma_ArchivoProgreso").width(percentVal);
        $("#txtCargarCronograma_ArchivoProgreso").text(percentVal);
    },
    uploadProgress: function(event, position, total, percentComplete) {
        
        var percentVal = percentComplete + '%';
        $("#txtCargarCronograma_ArchivoProgreso").width(percentVal);
        $("#txtCargarCronograma_ArchivoProgreso").text(percentVal);
    },
    success: function() {
        var percentVal = '100%';
        $("#txtCargarCronograma_ArchivoProgreso").width(percentVal);
        $("#txtCargarCronograma_ArchivoProgreso").text(percentVal);
    },
  complete: function(xhr) {
      var respuesta = xhr.responseText;
      if (respuesta.substring(0, 6) == "../../")
      {
        var idEtapa = $("#frmCargarCronograma_CargarArchivo").attr("idEtapa");

        $.post("../server/php/proyectos/manejoArchivos.php", 
        {
          idProyecto : $("#txtIdProyecto").val(),
          idEtapa : idEtapa, 
          ruta : respuesta,
          descripcion : $("#txtAsociar_Observaciones").val()
        },
        function(data)
        {
          $("#cntAuditoria_AistenteSoportes").modal("hide");
        }, "json").fail(function()
        {
          //Mensaje("Error", "No hay conexión con el Servidor SI");
        });
      } else
      {
        Mensaje("Error","Hubo un Error, " + respuesta, "danger");
      }
    }
  }); 
}


function CompletarConCero(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}

function cerrarSesion()
{
  delete localStorage.wsp_simv3;
  window.location.replace("../index.html");
}

function controlarPermisos()
{
  if (Permisos == null)
  {
    $.post('server/php/proyectos/cargarRestricciones.php', {Perfil: Usuario.idPerfil}, function(data, textStatus, xhr) 
    {
      Permisos = data;
      aplicarRestricciones();
    }, "json");
  } else
  {
    aplicarRestricciones();
  }
}

function aplicarRestricciones()
{
  $.each(Permisos, function(index, val) 
  {
    $(val.campo).remove();
  });
}
$.fn.cargarCombo = function(seccion, callback, restricciones)
{
  /**
   * seccion  {Perfiles, Empresas, Areas, Sedes};
  **/
  var obj = $(this);

  if (callback === undefined)
    {callback = function(){};}
  if (restricciones === undefined)
    {restricciones = [];}
  
  var idUsuario = 0;
  if (Usuario != null && Usuario != undefined)
  {
    idUsuario = Usuario.id;
  }

  var ruta = calcularSubDirectorio();
  ruta += "server/php/scripts/cargar" + seccion + ".php";
  $.post(ruta, {usuario : idUsuario}, function(data)
    {
      var idx = 0;
      var tds = "";
      var flag = 0;
      $.each(data, function(index, campo)
        {
          $.each(restricciones, function(idx, restriccion) 
          {
             if (restriccion == campo.id)
             {
                flag = 1;
             }
          });
          if (flag == 0)
          {
            tds += '<option value="' + campo.id + '">' + campo.Nombre + '</option>';
          }

          flag = 0;
          idx++
        });

      if (idx == 0)
      {
        Mensaje("Error", "No fue posible cargar " + seccion + ", por favor actualiza la página.");
      } else
      {
        $(obj).find("option").remove();
        $(obj).append(tds);
        callback();
      }
    }, "json").always(function() 
    {
      
    }).fail(function() {
      Mensaje("Error", "No fue posible cargar " + seccion + ", por favor actualiza la página.");
    });
}
function calcularSubDirectorio()
{
  var numDirectorios = parseInt(location.href.split("/").length) - 5;
  var res = "";
  for (var i = 0; i < numDirectorios; i++) 
  {
    res += "../";
  }
  return res;
}
function obtenerFecha()
{
  var f = new Date();
    return f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 2);
}

$.fn.crearDataTable = function(tds, callback)
{
  if (callback === undefined)
    {callback = function(){};}

  var dtSpanish = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Filtrar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };

  var options = {
        "aoColumnDefs": [{
          'bSortable': false,
          'aTargets': [-1]
        }],
        "iDisplayLength": 10,
        "aLengthMenu": [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"]
        ],
        "sDom": '<"dt-panelmenu clearfix"Tfr>t<"dt-panelfooter clearfix"ip>',
        "oTableTools": {
          "sSwfPath": "../assets/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
        },
        "language" : dtSpanish
      };

      var idObj = $(this).attr("id");
  if ($("#" + idObj + "_wrapper").length == 1)
    {
        $(this).dataTable().fnDestroy();
    } 

    $(this).find("tbody").find("tr").remove();
    $("#" + idObj + " tbody").append(tds);

  $(this).DataTable(options);
  callback();
}