/*
 * Modelo
 */
var Modelo = function () {

  this.ultimoId = 0;
  var preguntasStringeadas = localStorage.getItem("preguntas");
  var preguntasRecuperadas = JSON.parse(preguntasStringeadas);
  this.preguntas = preguntasRecuperadas;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    return this.preguntas.length ? this.ultimoId = this.preguntas[this.preguntas.length - 1].id : 0;
  },

  obtenerPregunta: function (id) {
    return this.preguntas.map(pregunta => pregunta.id).indexOf(id);
  },




  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    this.ultimoId = id
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);



    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    //filtra el arreglo de objetos 
    let pregunta = this.obtenerPregunta(id);
    this.preguntas.splice(pregunta, 1);
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  borrarTodo: function () {

    this.preguntas = [];
    this.guardar()
    this.todoBorrado.notificar();
  },

  editarPregunta: function (id, nuevaEdicion) {

    let pregunta = this.obtenerPregunta(id);
    this.preguntas[pregunta].textoPregunta = nuevaEdicion;

    console.log(this.preguntas)

    this.guardar();
    this.preguntaEditada.notificar();
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    // let respuestas = this.preguntas.find(pregunta => pregunta.textoPregunta === nombrePregunta);
    // let respuesta = respuestas.find(respuesta => respuesta.textoRespuesta == respuestaSeleccionada);
    this.preguntas.forEach(pregunta => {
      if (pregunta.textoPregunta === nombrePregunta) {
        var respuestas = pregunta.cantidadPorRespuesta
        respuestas.forEach(respuesta => {
          if (respuesta.textoRespuesta === respuestaSeleccionada) {
            respuesta.cantidad += 1;
          }});
      }
   
    // 
    this.guardar();
    this.votoAgregado.notificar();
  })
},
  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },

};
















