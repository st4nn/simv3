jQuery(document).ready(function($) {
  abrirModulo();
});
function abrirModulo()
{
  $("body > header").abrirModulo_cargarArchivos("../admin/header.html");
  $("fixedHead").abrirModulo_cargarArchivos("../admin/head.html", function()
    {
      $("body > footer").abrirModulo_cargarArchivos("../admin/footer.html", function()
        {

        });
    });
    $("body > sidebar").abrirModulo_cargarArchivos("../admin/sidebar.html", function()
    {
      //$("body > content").abrirModulo_cargarArchivos("../admin/content.html");    
    });
    var nomArchivo = location.href;
    var arrNomArchivo = location.href.split("/");
    nomArchivo = arrNomArchivo[arrNomArchivo.length - 1];
    alert(nomArchivo);
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

