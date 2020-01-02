/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function (id) {
    this.modelo.borrarPregunta(id);
  },

  borrarTodo: function (pregunta) {
    this.modelo.borrarTodo(pregunta);
  },

  editarPregunta: function (nuevaEdicion, id) {
    this.modelo.editarPregunta(nuevaEdicion, id);
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
  }
};
