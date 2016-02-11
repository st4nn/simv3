jQuery(document).ready(function($) {
  abrirModulo();
});
function abrirModulo()
{
  $("fixedHead").abrirModulo_cargarArchivos("../admin/head.html");
  $("body > footer").abrirModulo_cargarArchivos("../admin/footer.html");
  $("body > header").abrirModulo_cargarArchivos("../admin/header.html");
  $("body > sidebar").abrirModulo_cargarArchivos("../admin/sidebar.html");
  
}
$.fn.abrirModulo_cargarArchivos = function (modulo, callback)
{
  if (callback === undefined)
    {callback = function(){};}
  var obj = this;

  $.get(modulo, function(data) 
    {
      $(obj).html(data);
      callback();
    });
  return 1;
}

