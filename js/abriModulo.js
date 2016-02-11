jQuery(document).ready(function($) {
  abrirModulo();
});
function abrirModulo()
{
  $("head").abrirModulo_cargarArchivos("../admin/head");
  
}
$.fn.abrirModulo_cargarArchivos = function (modulo, callback)
{
  if (callback === undefined)
    {callback = function(){};}
  var obj = this;

  var nomArchivo = modulo + ".html";

  $.get(nomArchivo, function(data) 
    {
      $(obj).html(data);
      callback();
    });
  return 1;
}

