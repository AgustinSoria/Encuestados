/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.todoBorrado.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.votoAgregado.suscribir(function () {
    contexto.reconstruirLista();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var nuevoItem = $('<li>', {
      'class': 'list-group-item',
      'id': pregunta.id,
      'text': pregunta.textoPregunta
    });


    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (respuesta) {
      return " " + respuesta.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;

  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];


      $('[name="option[]"]').each(function () {
        var respuesta = $(this).val();


        if (respuesta !== "") {
          var cantVotos = 0;
          var nuevaRespuesta = { 'textoRespuesta': respuesta, 'cantidad': cantVotos };
          respuestas.push(nuevaRespuesta);

        }

      })

      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    //asociar el resto de los botones a eventos

    e.botonBorrarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (id) {
        contexto.controlador.borrarPregunta(id);
      }
    });

    //Boton para borrar todo
    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodo(pregunta);
    })

    //Editar Pregunta
    e.botonEditarPregunta.click(function(){
    
      var id = parseInt($('.list-group-item.active').attr('id'));
      
      if (id) {
        var nuevaEdicion = prompt("Por favor, modifique su pregunta por una nueva.")
        contexto.controlador.editarPregunta(id, nuevaEdicion);
      };
    })
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
