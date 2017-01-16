var modulos = 
{
	"admin/home.html" : {titulo : "Inicio", nick : "ad_Home"},
	"clientes/cl_home.html" : {titulo : "Clientes", nick : "cl_Home"},
	"clientes/cl_Crear.html" : {titulo : "Clientes", nick : "cl_Crear"},
	"clientes/informacionEstructural.html" : {titulo : "Información Estructural del Cliente", nick : "cl_InformacionEstructural"},
	"clientes/timeline.html" : {titulo : "Acciones con el Cliente", nick : "cl_timeline"},
	"oportunidades/op_crear.html" : {titulo : "Oportunidad de Negocios", nick : "op_crear"},
	"oportunidades/op_home.html" : {titulo : "Oportunidades de Negocios", nick : "op_Home"},
	"oportunidades/op_resumen.html" : {titulo : "Oportunidades de Negocios", nick : "op_resumen"},
	"propuestas/pro_crear.html" : {titulo : "Propuesta", nick : "pro_crear"},
	"contratos/co_crear.html" : {titulo : "Contratos", nick : "co_crear"},
	"infoAdministrativa/archivos.html" : {titulo : "Información Administrativa", nick : "infoAdministrativa"}
};
var arrPlugins =
{
	ad_Home : ["charjs"],
	cl_Home : ["datatable"],
	cl_Crear : ["select2"],
	cl_InformacionEstructural : ["jointjs"],
	cl_timeline : ["select2"],
	op_crear : ["select2", "datepicker"],
	op_Home : ["datatable"],
	op_resumen : ["charjs"],
	pro_crear : ["select2", "datepicker"],
	co_crear : ["select2", "datepicker"],
	infoAdministrativa : ["datepicker"]
};
var archivosCSS = 
{
	"jointjs" : "<link rel='stylesheet' href='../assets/vendor/jointjs/joint.css'>",
	"charjs" : "<link rel='stylesheet' href='../assets/examples/css/charts/chartjs.css'>",
	"datatable" : "<link rel='stylesheet' href='../assets/vendor/datatables-bootstrap/dataTables.bootstrap.css'><link rel='stylesheet' href='../assets/vendor/datatables-fixedheader/dataTables.fixedHeader.css'><link rel='stylesheet' href='../assets/vendor/datatables-responsive/dataTables.responsive.css'>",
	"select2" : "<link rel='stylesheet' href='../assets/vendor/select2/select2.css'>",
	"select3" : "<link rel='stylesheet' href='../assets/vendor/multi-select/multi-select.css'>",
	"datepicker" : "<link rel='stylesheet' href='../assets/vendor/bootstrap-datepicker/bootstrap-datepicker.css'>",
	"switchery" : "<link rel='stylesheet' href='../assets/vendor/switchery/switchery.css'>"
};
var archivosJS = 
{
	"jointjs" : ['../assets/vendor/jointjs/lodash.min.js', '../assets/vendor/jointjs/backbone-min.js', '../assets/vendor/jointjs/joint.js'],
	"charjs" : ['../assets/vendor/chart-js/Chart.js'],
	"datatable" : ['../assets/vendor/datatables/jquery.dataTables.js', '../assets/vendor/datatables-bootstrap/dataTables.bootstrap.js', '../assets/vendor/datatables-tabletools/dataTables.tableTools.js', '../assets/js/components/datatables.js'],
	"select2" : ['../assets/vendor/select2/select2.min.js'],
	"datepicker" : ['../assets/vendor/bootstrap-datepicker/bootstrap-datepicker.js'],
	"switchery" : ["../assets/vendor/switchery/switchery.min.js"]
};





