var Usuario = null;
var Permisos = null;

$(document).ready(function() {
	functiones();
});
function functiones()
{
  Usuario = JSON.parse(localStorage.getItem('wsp_simv3'));

  if (Usuario == null || Usuario === undefined)
  {
    cerrarSesion();
  }
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
  } else if (Titulo == "Ok")
  {
    alertify.success(Mensaje);
  } else if (Titulo == "Hey")
  {
    alertify.success(Mensaje);
  } else
  {
    alertify.message(Mensaje);
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
    $.post('../server/php/scripts/cargarRestricciones.php', {Perfil: Usuario.idPerfil}, function(data, textStatus, xhr) 
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

function abrirURL(url)
{
  var win = window.open(url, "_blank", "directories=no, location=no, menubar=no, resizable=yes, scrollbars=yes, statusbar=no, tittlebar=no");
  win.focus();
}

$.fn.iniciarSelectRemoto = function(script, delay, minimo)
{
  if (script != "" && script != undefined && script != null)
  {
    delay = delay || 300;
    minimo = minimo || 3;

    $(this).select2({
        ajax: {
          url: "../server/php/scripts/select2/" + script + ".php",
          dataType: 'json',
          delay: delay,
          data: function (params) {
            return {
              q: params.term, // search term
              page: params.page
            };
          },
          processResults: function (data, params) {
            return {
              results: data.items
            };
          },
          cache: true
        },
        escapeMarkup: function (markup) { return markup; }, 
        minimumInputLength: minimo,
      templateResult: function(dato) { return dato.name;  },
      templateSelection : function(dato)  { return dato.name;   }
    });
  }
}

//*
//============Plugins de la Aplicación ============================
//*

function modalCrearCliente(callbackOk, callbackError, callbackUpdate)
{
  if (callbackOk === undefined)   {    callbackOk = function(){};  }
  if (callbackError === undefined)   {    callbackError = function(){};  }
  if (callbackUpdate === undefined)   {    callbackUpdate = function(){};  }

  if ($("#cntCrearCliente").length == 0)
  {
    var tds = "";
    tds += '<div class="modal fade" id="cntCrearCliente" aria-hidden="false" aria-labelledby="cntCrearCliente_Label" role="dialog" tabindex="-1">';
        tds += '<div class="modal-dialog">';
          tds += '<form id="frmModalCrearCliente" class="modal-content">';
            tds += '<div class="modal-header">';
              tds += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                tds += '<span aria-hidden="true">×</span>';
              tds += '</button>';
              tds += '<h4 class="modal-title" id="cntCrearCliente_Label">Crear Cliente</h4>';
            tds += '</div>';
            tds += '<div class="modal-body">';
              tds += '<div class="row">';
                tds += '<div class="col-sm-12 form-group">';
                  tds += '<label for="txtCrearCliente_Nombre" class="form-label">Nombre</label>';
                  tds += '<input id="txtCrearCliente_Nombre" type="text" class="form-control" placeholder="Nombre" required>';
                tds += '</div>';
                tds += '<div class="col-sm-12 form-group">';
                  tds += '<label for="txtCrearCliente_Nit" class="form-label">Nit</label>';
                  tds += '<input id="txtCrearCliente_Nit" type="text" class="form-control" placeholder="Nit" required>';
                tds += '</div>';
                tds += '<div class="col-sm-12 pull-right">';
                  tds += '<button class="btn btn-success btn-outline" type="submit">Crear</button>';
                  tds += '<button class="btn btn-danger btn-outline margin-left-20" data-dismiss="modal" type="button">Cancelar</button>';
                tds += '</div>';
              tds += '</div>';
            tds += '</div>';
          tds += '</form>';
        tds += '</div>';
      tds += '</div>';
    
    $("body").append(tds);

    $("#frmModalCrearCliente").on("submit", function(evento)
    {
      evento.preventDefault();
      if ($("#txtCrearCliente_Nombre").val() == "")
      {
        Mensaje("Error", "No es posible crear una empresa sin Nombre");
      } else
      {
        if ($("#txtCrearCliente_Nit").val() == "")
        {
          Mensaje("Error", "No es posible crear una empresa sin Identificación");
        } else
        {
          $.post('../server/php/scripts/modals/crearCliente.php', 
          {
            Nombre : $("#txtCrearCliente_Nombre").val(),
            Nit : $("#txtCrearCliente_Nit").val(),
            Usuario : Usuario.id
          }, function(data, textStatus, xhr) 
          {
            if (data['Error'] != "")
            {
              Mensaje("Error", data['Error']);
              callbackError();
            } else
            {
              $("#cntCrearCliente").modal("hide");
              if (data['id'] >= 0)
              {
                callbackOk();
                Mensaje("Ok", "El cliente ha sido ingresado");
              } else
              {
                callbackUpdate();                
              }
            }
          }, "json").fail(function()
          {
            Mensaje("Error", "No hay conexión con el servidor");
          });
        }
      }
    });
  }

  $("#txtCrearCliente_Nombre").val("");
  $("#txtCrearCliente_Nit").val("");
  $("#cntCrearCliente").modal("show");
}

function modalCrearArea(callbackOk, callbackError, callbackUpdate)
{
  if (callbackOk === undefined)   {    callbackOk = function(){};  }
  if (callbackError === undefined)   {    callbackError = function(){};  }
  if (callbackUpdate === undefined)   {    callbackUpdate = function(){};  }

  if ($("#cntCrearArea").length == 0)
  {
    var tds = "";
    tds += '<div class="modal fade" id="cntCrearArea" aria-hidden="false" aria-labelledby="cntCrearArea_Label" role="dialog" tabindex="-1">';
        tds += '<div class="modal-dialog">';
          tds += '<form id="frmModalCrearArea" class="modal-content">';
            tds += '<div class="modal-header">';
              tds += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                tds += '<span aria-hidden="true">×</span>';
              tds += '</button>';
              tds += '<h4 class="modal-title" id="cntCrearCliente_Label">Crear Area</h4>';
            tds += '</div>';
            tds += '<div class="modal-body">';
              tds += '<div class="row">';
                tds += '<div class="col-sm-12 form-group">';
                  tds += '<label for="txtCrearArea_Nombre" class="form-label">Nombre</label>';
                  tds += '<input id="txtCrearArea_Nombre" type="text" class="form-control" placeholder="Nombre" required>';
                tds += '</div>';
                tds += '<div class="col-sm-12 pull-right">';
                  tds += '<button class="btn btn-success btn-outline" type="submit">Crear</button>';
                  tds += '<button class="btn btn-danger btn-outline margin-left-20" data-dismiss="modal" type="button">Cancelar</button>';
                tds += '</div>';
              tds += '</div>';
            tds += '</div>';
          tds += '</form>';
        tds += '</div>';
      tds += '</div>';
    
    $("body").append(tds);

    $("#frmModalCrearArea").on("submit", function(evento)
    {
      evento.preventDefault();
      if ($("#txtCrearArea_Nombre").val() == "")
      {
        Mensaje("Error", "No es posible crear un Area sin Nombre");
      } else
      {
        $.post('../server/php/scripts/modals/crearArea.php', 
        {
          Nombre : $("#txtCrearArea_Nombre").val(),
          Usuario : Usuario.id
        }, function(data, textStatus, xhr) 
        {
          if (data['Error'] != "")
          {
            Mensaje("Error", data['Error']);
            callbackError();
          } else
          {
            $("#cntCrearArea").modal("hide");
            if (data['id'] >= 0)
            {
              callbackOk();
              Mensaje("Ok", "El Area ha sido ingresada");
            } else
            {
              callbackUpdate();                
            }
          }
        }, "json").fail(function()
        {
          Mensaje("Error", "No hay conexión con el servidor");
        });        
      }
    });
  }

  $("#txtCrearArea_Nombre").val("");
  $("#cntCrearArea").modal("show");
}

function modalCrearCiudad(callbackOk, callbackError, callbackUpdate)
{
  if (callbackOk === undefined)   {    callbackOk = function(){};  }
  if (callbackError === undefined)   {    callbackError = function(){};  }
  if (callbackUpdate === undefined)   {    callbackUpdate = function(){};  }

  if ($("#cntCrearArea").length == 0)
  {
    var tds = "";
    tds += '<div class="modal fade" id="cntCrearCiudad" aria-hidden="false" aria-labelledby="cntCrearCiudad_Label" role="dialog" tabindex="-1">';
        tds += '<div class="modal-dialog">';
          tds += '<form id="frmModalCrearCiudad" class="modal-content">';
            tds += '<div class="modal-header">';
              tds += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                tds += '<span aria-hidden="true">×</span>';
              tds += '</button>';
              tds += '<h4 class="modal-title" id="cntCrearCiudad_Label">Crear Ciudad</h4>';
            tds += '</div>';
            tds += '<div class="modal-body">';
              tds += '<div class="row">';
                tds += '<div class="col-sm-12 form-group">';
                  tds += '<label for="txtModal_CrearCiudad_Pais" class="control-label">Pais</label>';
                  tds += '<div class="input-group input-group-file">';
                    tds += '<select id="txtModal_CrearCiudad_Pais" class="form-control" required>  ';
                      tds += '<option value=""></option>';
                    tds += '</select>';
                    tds += '<span class="input-group-btn">';
                      tds += '<span class="btn btn-primary">';
                          tds += '<i class="icon wb-plus-circle" aria-hidden="true"></i>';
                        tds += '</span>';
                    tds += '</span>';
                  tds += '</div>';
                tds += '</div>';
                tds += '<div class="col-sm-12 form-group">';
                  tds += '<label for="txtModal_CrearCiudad_Departamento" class="control-label">Departamento</label>';
                  tds += '<div class="input-group input-group-file">';
                    tds += '<select id="txtModal_CrearCiudad_Departamento" class="form-control" required>';
                      tds += '<option value=""></option>';
                    tds += '</select>';
                    tds += '<span class="input-group-btn">';
                      tds += '<span class="btn btn-primary">';
                          tds += '<i class="icon wb-plus-circle" aria-hidden="true"></i>';
                        tds += '</span>';
                    tds += '</span>';
                  tds += '</div>';
                tds += '</div>';
                tds += '<div class="col-sm-12 form-group">';
                  tds += '<label for="txtModal_CrearCiudad_Ciudad" class="control-label">Ciudad</label>';
                  tds += '<input type="text" id="txtModal_CrearCiudad_Ciudad" class="form-control" required>';
                tds += '</div>';
                tds += '<div class="col-sm-12 pull-right">';
                  tds += '<button class="btn btn-success btn-outline" type="submit">Crear</button>';
                  tds += '<button class="btn btn-danger btn-outline margin-left-20" data-dismiss="modal" type="button">Cancelar</button>';
                tds += '</div>';
              tds += '</div>';
            tds += '</div>';
          tds += '</form>';
        tds += '</div>';
      tds += '</div>';
    
    $("body").append(tds);

    $("#frmModalCrearCiudad").on("submit", function(evento)
    {
      evento.preventDefault();
      if ($("#txtCrearArea_Nombre").val() == "")
      {
        Mensaje("Error", "No es posible crear un Area sin Nombre");
      } else
      {
        $.post('../server/php/scripts/modals/crearArea.php', 
        {
          Nombre : $("#txtCrearCliente_Nombre").val(),
          Usuario : Usuario.id
        }, function(data, textStatus, xhr) 
        {
          if (data['Error'] != "")
          {
            Mensaje("Error", data['Error']);
            callbackError();
          } else
          {
            $("#cntCrearCiudad").modal("hide");
            if (data['id'] >= 0)
            {
              callbackOk();
              Mensaje("Ok", "El Area ha sido ingresada");
            } else
            {
              callbackUpdate();                
            }
          }
        }, "json").fail(function()
        {
          Mensaje("Error", "No hay conexión con el servidor");
        });        
      }
    });
  }

  $("#txtCrearArea_Nombre").val("");
  $("#cntCrearCiudad").modal("show");
}

function modalCompartirProceso(proceso, idProceso, callbackOk, callbackError, callbackUpdate)
{
  if (callbackOk === undefined)   {    callbackOk = function(){};  }
  if (callbackError === undefined)   {    callbackError = function(){};  }
  if (callbackUpdate === undefined)   {    callbackUpdate = function(){};  }

  if ($("#cntCompartirProceso").length == 0)
  {
    var tds = "";
    tds += '<div class="modal fade" id="cntCompartirProceso" aria-hidden="false" aria-labelledby="cntCompartirProceso_Label" role="dialog" tabindex="-1">';
        tds += '<div class="modal-dialog">';
          tds += '<div class="modal-content">';
            tds += '<div class="modal-header">';
              tds += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                tds += '<span aria-hidden="true">×</span>';
              tds += '</button>';
              tds += '<h4 class="modal-title" id="cntCompartiProceso_Label">Compartir ' + proceso + '</h4>';
            tds += '</div>';
            tds += '<div class="modal-body">';
              tds += '<div class="row">';
                tds += '<form id="frmModal_CompartirProceso_AgregarCorreo">';
                  tds += '<div class="col-md-12 form-group">';
                    tds += '<label for="txtModal_CompartiProceso_Correo" class="control-label">Dirección a Agregar</label>';
                    tds += '<div class="input-group input-group-file">';
                        tds += '<input type="email" id="txtModal_CompartiProceso_Correo" class="form-control" required>';
                        tds += '<span id="btnModal_CompartiProceso_Correo" class="input-group-btn">';
                          tds += '<span class="btn btn-success">';
                              tds += '<i class="icon fa-user-plus" aria-hidden="true"></i>';
                              tds += ' Agregar';
                            tds += '</span>';
                        tds += '</span>';
                    tds += '</div>';
                  tds += '</div>';
                tds += '</form>';
              tds += '</div>';
              tds += '<div class="row">';
                tds += '<ul id="cntModal_CompartirProceso_Correos" class="list-group list-group-full">'
                tds += '</ul>'
              tds += '</div>';
              tds += '<div class="row">';
                tds += '<div class="col-sm-12 pull-right">';
                  tds += '<button class="btn btn-success btn-outline" data-dismiss="modal" type="button">Enviar</button>';
                  tds += '<button class="btn btn-danger btn-outline margin-left-20" data-dismiss="modal" type="button">Cancelar</button>';
                tds += '</div>';
              tds += '</div>';
            tds += '</div>';
          tds += '</div>';
        tds += '</div>';
      tds += '</div>';
    
    $("body").append(tds);

    $("#btnModal_CompartiProceso_Correo").on("click", function(evento)
    {
      evento.preventDefault();
      $("#frmModal_CompartirProceso_AgregarCorreo").trigger('submit');
    });

    $(document).delegate('.btnModal_CompartiProceso_QuitarCorreo', 'click', function(event) 
    {
      $(this).parent("div").parent("div").parent("li").remove();
    });

    $("#frmModal_CompartirProceso_AgregarCorreo").on("submit", function(evento)
    {
      evento.preventDefault();
      var valor = $("#txtModal_CompartiProceso_Correo").val();
      if (valor == "")
      {
        Mensaje("Error", "No es posible Agregar un Remitente vacío");
      } else
      {
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( expr.test(valor) )
        {
          var objRepetidos = $(".media-heading:contains('" + valor + "')");
          if ($(objRepetidos).length > 0)
          {
            Mensaje("Error", "El correo ya está en la lista de remitentes")
          } else
          {
            var tds = "" ;
            tds += '<li class="list-group-item">';
              tds += '<div class="media">';
                tds += '<div class="media-left text-center">';
                    tds += '<i class="icon wb-user margin-left-10 font-size-20"></i>';
                tds += '</div>';
                tds += '<div class="media-body">';
                  tds += '<h4 class="media-heading">' + valor + '</h4>';
                tds += '</div>';
                tds += '<div class="media-right">';
                  tds += '<a class="btnModal_CompartiProceso_QuitarCorreo" href="javascript:void(0)">';
                    tds += '<i class="icon wb-close">';
                  tds += '</a>';
                tds += '</div>';
              tds += '</div>';
            tds += '</li>';

            $("#cntModal_CompartirProceso_Correos").append(tds);
            $("#txtModal_CompartiProceso_Correo").val("");
          }
        } else {
          Mensaje("Error", "Debe ingresar una dirección de correo válida"); 
        }
      }
    });

    $("#frmModalCrearArea").on("submit", function(evento)
    {
      evento.preventDefault();
      if ($("#txtCrearArea_Nombre").val() == "")
      {
        Mensaje("Error", "No es posible crear un Area sin Nombre");
      } else
      {
        $.post('../server/php/scripts/modals/crearArea.php', 
        {
          Nombre : $("#txtCrearCliente_Nombre").val(),
          Usuario : Usuario.id
        }, function(data, textStatus, xhr) 
        {
          if (data['Error'] != "")
          {
            Mensaje("Error", data['Error']);
            callbackError();
          } else
          {
            $("#cntCompartirProceso").modal("hide");
            if (data['id'] >= 0)
            {
              callbackOk();
              Mensaje("Ok", "El Area ha sido ingresada");
            } else
            {
              callbackUpdate();                
            }
          }
        }, "json").fail(function()
        {
          Mensaje("Error", "No hay conexión con el servidor");
        });        
      }
    });
  } else
  {
    $("#cntCompartiProceso_Label").text("Compartir " + proceso);
    $("#cntModal_CompartirProceso_Correos li").remove();
  }

  $("#txtCrearArea_Nombre").val("");
  $("#cntCompartirProceso").modal("show");
}