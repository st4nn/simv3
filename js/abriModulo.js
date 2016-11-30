
jQuery(document).ready(function($) {
  abrirModulo();
});

function abrirModulo()
{
  $.ajaxSetup({
    cache: true
  });

  desplegarCargando();
  
  $("body > header").abrirModulo_cargarArchivos("../admin/header.html", function()
    {
      $("#lblCerrarSesion").on("click", cerrarSesion);
      $("#lblUsuario").text(Usuario.nombre);
    });
  
    $("body > sidebar").abrirModulo_cargarArchivos("../admin/sidebar.html", function()
    {
      $("body > footer").abrirModulo_cargarArchivos("../admin/footer.html", function()
        {
            Site.run();
            
            var nomArchivo = location.href;
            
            var arrNomArchivo = location.href.split("/");
            nomArchivo = arrNomArchivo[arrNomArchivo.length - 2] + "/" + arrNomArchivo[arrNomArchivo.length - 1];
            var lnkMenu = $("a[href='..\/" + arrNomArchivo[arrNomArchivo.length - 2] + "\/" + arrNomArchivo[arrNomArchivo.length - 1] + "");

            var tmpNomArchivo = arrNomArchivo[arrNomArchivo.length - 1];
            arrNomArchivo = nomArchivo.split("?");
            nomArchivo = arrNomArchivo[0];
            arrNomArchivo = nomArchivo.split("#");
            nomArchivo = arrNomArchivo[0];
            //abrirModulo_cargarPlugins(nomArchivo);
            //
            if ($(lnkMenu != undefined))
            {
              $(lnkMenu).parent("li").addClass('active');
              $(lnkMenu).parent("li").parent('ul').parent('li').addClass('active open');
            }
            
            
            if (modulos[nomArchivo] != undefined )
            {
              $("#lblNomModulo").text(modulos[nomArchivo].titulo);
              abrirModulo_CargarScriptPropio();
            } 
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

function abrirModulo_cargarPlugins(nomArchivo)
{
  if (modulos[nomArchivo] != undefined )
  {
    if  (arrPlugins[modulos[nomArchivo].nick].length > 0)
    {
      $.each(arrPlugins[modulos[nomArchivo].nick], function(index, val) 
      {
         $("customCss").append(archivosCSS[val]);
         
      });
      
      abrirModulo_cargarJs(arrPlugins[modulos[nomArchivo].nick]);

    } else
    {
      abrirModulo_cargarJs();
    }
  }
}

function abrirModulo_cargarJs(plugins)
{
  if (plugins === undefined)
  {
    plugins = {};
  }

  var idxPlugin = 0;
  var idxCargue = 0;
  $.each(plugins, function(index, val) 
  {
    idxPlugin += archivosJS[val].length;
    $.each(archivosJS[val], function(index2, urlPlugin) 
    {
       $.getScript(urlPlugin, function()
       {
          idxCargue++;
          if (idxCargue >= idxPlugin)
          {
            abrirModulo_CargarScriptPropio(); 
          }
       });
       $(this).delay(10);
    });
  });
  
  if (plugins === {})
  {
    abrirModulo_CargarScriptPropio(); 
  }
    
}

function abrirModulo_CargarScriptPropio()
{
  $.ajaxSetup({
    cache: false
  })
  
  var arrNomArchivo = location.href.split("/");
  nomArchivo = arrNomArchivo[arrNomArchivo.length - 1];    //$("fixedScripts").append("<script src='../js/" + nomArchivo.replace(".html", ".js") + "'>");
  $.getScript("../js/" + nomArchivo.replace(".html", ".js"), function(ev)
    {
      controlarPermisos();
      $("#cntCargando").modal("hide");
    });
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