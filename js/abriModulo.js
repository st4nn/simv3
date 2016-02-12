jQuery(document).ready(function($) {
  abrirModulo();
});
function abrirModulo()
{

  $("body > header").abrirModulo_cargarArchivos("../admin/header.html");
  $("fixedHead").abrirModulo_cargarArchivos("../admin/head.html", function()
    {
    });
    $("body > sidebar").abrirModulo_cargarArchivos("../admin/sidebar.html", function()
    {
      $("body > footer").abrirModulo_cargarArchivos("../admin/footer.html", function()
        {
              var nomArchivo = location.href;
              var arrNomArchivo = location.href.split("/");
              nomArchivo = arrNomArchivo[arrNomArchivo.length - 2] + "/" + arrNomArchivo[arrNomArchivo.length - 1];
              abrirModulo_cargarPlugins(nomArchivo);
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
    $.each(arrPlugins[modulos[nomArchivo].nick], function(index, val) 
    {
       $("customCss").append(archivosCSS[val]);
       $("fixedScripts").append(archivosJS[val]);
    });
    Site.run();
    var arrNomArchivo = location.href.split("/");
    nomArchivo = arrNomArchivo[arrNomArchivo.length - 1];
    $("fixedScripts").append("<script src='../js/" + nomArchivo.replace(".html", ".js") + "'>");
}