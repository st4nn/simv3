var modulosVisitados = [];
jQuery(document).ready(function($) {
  abrirModulo();
});

function abrirModulo()
{
  $.ajaxSetup({
    cache: false
  });

  desplegarCargando();
  
  $("body > header").abrirModulo_cargarArchivos("header.html", function()
    {
      $("#lblCerrarSesion").on("click", cerrarSesion);
      $("#lblUsuario").text(Usuario.nombre);

      $("#btnAtras").on("click", function(evento)
        {
          evento.preventDefault();
          var idPagina = parseInt($("#btnAtras").attr("idPagina"));
          if (idPagina > 0)
          {
            idPagina--;
            $("#btnAtras").attr("idPagina", idPagina);
            if (idPagina >= 0 && idPagina < modulosVisitados.length)
            {
              cargarModulo(modulosVisitados[idPagina].vinculo, modulosVisitados[idPagina].titulo, function(){}, false);
            }
          }
        });
    });
  
    $("body > sidebar").abrirModulo_cargarArchivos("sidebar.html", function()
    {
      $(document).delegate('.lnkMenu_Item', 'click', function(event) 
      {
        event.preventDefault();
        var vinculo = $(this).attr("vinculo");
        var titulo = $(this).find(".site-menu-title").text();
        cargarModulo(vinculo, titulo);
      });
      $("body > footer").abrirModulo_cargarArchivos("footer.html", function()
        {
            Site.run();
            
            cargarModulo("inicio.html", "Inicio");
        });
    });
}

$.fn.abrirModulo_cargarArchivos = function (modulo, callback)
{
  if (callback === undefined)
    {callback = function(){};}
  var obj = this;

  //modulo += "?timeStamp=" + Date.now();
  $.get(modulo, function(data) 
    {
      $(obj).html(data).promise().done(function()
      {
        callback();
      });

    });
  return 1;
}

function desplegarCargando()
{
  if ($("#cntCargando").length == 0)
  {
    var tds = "";
    tds += '<div class="modal fade modal-fill-in" id="cntCargando" aria-hidden="false" aria-labelledby="cntCargando" role="dialog" tabindex="-1" style="background: rgba(0,0,0, 0.3);">';
      tds += '<div class="modal-dialog">';
        tds += '<div class="modal-content">';
          tds += '<div class="animsition vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">';
            tds += '<div class="vertical-align-middle">';
              tds += '<i class="icon fa-circle-o-notch icon-spin font-size-80 blue-700"></i>';
            tds += '</div>';
          tds += '</div>';
        tds += '</div>';
      tds += '</div>';
    tds += '</div>';

    $("body").append(tds);
  }

  $("#cntCargando").modal("show");
}

function cargarModulo(vinculo, titulo, callback, btnAtras=true)
{
  titulo = titulo || null;

  if (callback === undefined)
    {callback = function(){};}


  $(".Modulo").hide();

  var tds = "";
  var nomModulo = "modulo_" + vinculo.replace(/\s/g, "_");
  nomModulo = nomModulo.replace(/\./g, "_");
  nomModulo = nomModulo.replace(/\//g, "_");

  if (btnAtras)
  {
    modulosVisitados.push({
      vinculo : vinculo,
      titulo : titulo,
      fecha : obtenerFecha()
    });
    
    $("#btnAtras").attr("idPagina", (modulosVisitados.length-1));
  }


  if ($('#' + nomModulo).length)
  {
    $('#' + nomModulo).show();
    if (titulo != null)
    {
      $('#' + nomModulo).find('.page-header').find(".page-title").text(titulo);
    }
    postCargarModulo(callback);
    
  } else
  {
    tds += '<div id="' + nomModulo + '" class="Modulo"></div>';

    $("#contenedorDeModulos").append(tds);
    $.get(vinculo, function(data) 
    {
      $("#" + nomModulo).html(data);
      postCargarModulo(callback);
    }).fail(function() {
      Mensaje("Error", "No tiene permisos para acceder a este modulo", "danger");
      $("#cntCargando").modal("hide");
    });
  }
  $("#lblNomModulo").text(titulo);
}

function postCargarModulo(callback)
{
  if (callback === undefined)
    {callback = function(){};}

  callback();
  $("#cntCargando").modal("hide");
  controlarPermisos();
}