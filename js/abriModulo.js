var idxJs = 0;
jQuery(document).ready(function($) {
  abrirModulo();
});
function abrirModulo()
{
  $("body > header").abrirModulo_cargarArchivos("../admin/header.html", function()
    {
      $("#lblCerrarSesion").on("click", cerrarSesion);
      $("#lblUsuario").text(Usuario.nombre);
    });
  //$("fixedHead").abrirModulo_cargarArchivos("../admin/head.html");
    $("body > sidebar").abrirModulo_cargarArchivos("../admin/sidebar.html", function()
    {
      $("body > footer").abrirModulo_cargarArchivos("../admin/footer.html", function()
        {
            
            var nomArchivo = location.href;
            var arrNomArchivo = location.href.split("/");
            nomArchivo = arrNomArchivo[arrNomArchivo.length - 2] + "/" + arrNomArchivo[arrNomArchivo.length - 1];
            arrNomArchivo = nomArchivo.split("?");
            nomArchivo = arrNomArchivo[0];
            arrNomArchivo = nomArchivo.split("#");
            nomArchivo = arrNomArchivo[0];
            abrirModulo_cargarPlugins(nomArchivo);
            
            if (modulos[nomArchivo] != undefined )
            {
              $("#lblNomModulo").text(modulos[nomArchivo].titulo);
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
         //$("fixedScripts").append(archivosJS[val]);
         /*idxJs = archivosJS[val].length; */
         abrirModulo_cargarJs(val);
         /*
         $.each(archivosJS[val], function(index2, val2) 
         {
            $.getScript(val2);    
            console.log(val2);
         });
         /*
        $.getScript('../assets/vendor/jointjs/lodash.min.js');
        $.getScript('../assets/vendor/jointjs/backbone-min.js');
        $.getScript('../assets/vendor/jointjs/joint.js');*/

      });
    }
  }
    
}
function abrirModulo_cargarJs(val)
{
  if (idxJs < archivosJS[val].length)
  {
    $.getScript(archivosJS[val][idxJs], function()
      {
        idxJs++;
        abrirModulo_cargarJs(val);
      }); 
  } else
  {
    var arrNomArchivo = location.href.split("/");
    nomArchivo = arrNomArchivo[arrNomArchivo.length - 1];    //$("fixedScripts").append("<script src='../js/" + nomArchivo.replace(".html", ".js") + "'>");
    $.getScript("../js/" + nomArchivo.replace(".html", ".js"), function(ev)
      {

      });
    Site.run();
  }
}