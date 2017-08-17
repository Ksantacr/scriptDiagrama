// Arreglos de los diagramas
var _diagramasArr = [];
// Posicion del diagrama actual
var diagramaActual = 0;
// Contador de figuras clickeadas
var figurasSeleccionadas = 0;
// Figuras a unir por una linea
var figura1, figura2;
// Conocer el id siguiente
var id = 0;
// Lista de colores
var coloresPorDefecto = ["#FF4081", "#F44336", "#4CAF50", "#33FF88"];
//Posicion para las clases de la punta
var posPunta = 0;
// Figuras para la punta
var figurasPunta = ["puntaCirculo", "puntaTriangulo", "puntaRombo"];
// Eliminar los datos del arreglo de los diagramas
var vaciarDatos = function(){
    diagramas = [];
}
// Dibuja las figuras en el diagrama
var cargarFiguras = function(){
    // Selecciona el elemento con el id diagrama
    var lienzo = $("#diagrama");
    // Itera por cada figura del diagrama actual
    _diagramasArr[diagramaActual].figuras.forEach(function(figura){
        // Inicio creacion figura
        let elemento = $("<div></div>");
        elemento.addClass("canvas-element "+figura.tipo+" item base ui-draggable");
        elemento.attr("id", figura.id);
        elemento.css({
            left: figura.posX,
            top: figura.posY,
            background: figura.colorFondo,
            position: "absolute"
        });
        // Fin creacion figura
        // Se crea el input
        let input = $('<input type="text">');
        input.val(figura.responsable);
        input.css({
            width: 60                
        });
        // Fin creacion input
        input.change(actualizarResponsable); //Se lanza al actualizar txt
        elemento.append(input); //Se agrega el input a la figura
        elemento.dblclick(mostrarOpciones); // Se lanza al dar 2clic
        elemento.click(cambiarColor); // Cambio de color
        lienzo.append(elemento);
    });
}

// Leer y cargar los datos del JSON
var leerJson = function(){
    $.getJSON("data.json", function(json) {
        //console.log(json); // Mostrar json en consola al cargar

        // Iterar por cada diagrama del json
         if (localStorage.getItem("diagramas"))  {
            var listaDiagramas = localStorage.getItem('diagramas');
            // JSON Parse
            var diagramas_JSON = JSON.parse(listaDiagramas);

            // Iterar por cada diagrama 
            diagramas_JSON.forEach(function(diagrama) {
                //console.log(diagrama)
                _diagramasArr.push(diagrama)
            });
            console.log("Diagramas existe")
         }else{
             json.diagramas.forEach(function(diagrama) {
                //console.log(element)  // Mostrar cada diagrama del json
                _diagramasArr.push(diagrama);
            });
            var listaDiagramas = JSON.stringify(_diagramasArr);
            localStorage.setItem('diagramas', listaDiagramas);
            //console.log("Guardado en localStorage");
            console.log("Diagramas no existe")
        }
        listarDiagramas();
        $("#titulo").val(_diagramasArr[diagramaActual].titulo);
        cargarFiguras()
        dibujarLineas()
        id = calcularId();
        drag();
    });
}
var listarDiagramas = function(){
    let cont=0;
    _diagramasArr.forEach(function(diagrama){ 
        $('#flujos').append(new Option(diagrama.titulo, ""+cont));
        cont++;
    });
}
var guardarLocalStorage = function(){
    localStorage.removeItem('diagramas');    
    var listaDiagramas = JSON.stringify(_diagramasArr);
    localStorage.setItem('diagramas', listaDiagramas);
}
var cargarLocalStorage = function(){
    $("#diagrama").empty();
    // Obtener JSOn del localStorage
    var listaDiagramas = localStorage.getItem('diagramas');
    // JSON Parse
    var diagramas_JSON = JSON.parse(listaDiagramas);
    // Iterar por cada diagrama 
    diagramas_JSON.forEach(function(diagrama) {
        _diagramasArr.push(diagrama)
    }, this);
}
// Dibujar las lineas entre las figuras
var dibujarLineas = function(){
    //Recorre cada figura del diagrama actual
    _diagramasArr[diagramaActual].figuras.forEach(function(figura){
        //Recorre todos los hijos de una figura
       figura.hijos.forEach(function(hijo){
           //Conecta 2 elementos con diferentes id
            $("#"+figura.id).connections(
                {to: '#'+hijo   , 'class': 'demo'}
            );
        });
    });

}
// Dibuja la linea entre figuras
var unir = function(a, b){
    $('#'+a).connections(
          {to: '#'+b, 'class': 'demo'}
    );
    $(".demo").click(cambiarFiguraLinea);
}

// Funcion cambiar color
var cambiarColor = function(){
    //console.log(_diagramasArr[diagramaActual])
    //console.log("Anterior"+_diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo);

    switch(_diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo){

        case coloresPorDefecto[0]:
            _diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo = coloresPorDefecto[1];
            
            break;
        case coloresPorDefecto[1]:
        _diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo = coloresPorDefecto[2];
        
            break;
        case coloresPorDefecto[2]:
        _diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo = coloresPorDefecto[3]
        
            break;
        case coloresPorDefecto[3]:
        _diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo = coloresPorDefecto[0]
            break;
    }
    // Pone el nuevo color de fondo al elemento
    $(this).css({
        "background": ''+_diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo
    })
    //console.log($(this));
    //console.log("Color nuevo: "+_diagramasArr[diagramaActual].figuras[$(this).attr("id")].colorFondo);
}
// Esta atento a la seleccion de 2 figuras
var mostrarOpciones = function(){

    if(figura1==null){
        figura1= $(this);
        figura2 = null;
        console.log(figura1);
    }else{
        figura2 = $(this);
        console.log(figura2);
    }
    if(figura1!= null && figura2!= null){
        // Entra aqui al seleccionar 2 figuras
        unir(figura1.attr('id'), figura2.attr('id'));
        // Guarda el elemento hijo
        _diagramasArr[diagramaActual].figuras[figura1.attr('id')].hijos.push(figura2.attr('id'));
        // Se resetean las figura
        figura1 = null;
        figura2 = null;
    }
}

// ?
//var guardarDatos = function() {
//    var listaDiagramas = JSON.stringify(_diagramasArr);
//   localStorage.setItem('diagramas', listaDiagramas);
//}

// Funcion para actualizar el responsable
var actualizarResponsable = function(){
    _diagramasArr[diagramaActual].figuras[$(this).parent().attr("id")].responsable = $(this).val();
}

// Retorna el ultimo id usado
var calcularId = function(){
    return _diagramasArr[diagramaActual].figuras.length - 1;
}
// Retorno el id incrementado en 1
var incrementarId = function(){
    id++;
    return id;
}
// Pone una clase al punto
var siguienteClase = function(){
    posPunta++;

    if(posPunta==3){
        $(this).removeClass(figurasPunta[posPunta-1])
        posPunta = 0;
    }else{
        $(this).removeClass(figurasPunta[posPunta-1])
    }
    //$(this).removeClass(figurasPunta[posPunta-1])
    $(this).addClass(figurasPunta[posPunta]);
    //console.log($(this));
}

// Retorna un color dependiendo de la clase que esta usando
var colorFondo = function(clase){

    switch(clase){
        case 'cuadrado': return coloresPorDefecto[0];
        case 'circulo' : return coloresPorDefecto[1];
        case 'rombo' : return coloresPorDefecto[2];
        case 'rectangulo' : return coloresPorDefecto[3];
    }
}
// Funcion para elementos arrastrables
var drag = function(){
     $(".item" ).draggable({
        cursor: 'move',
        containment: '#diagrama',
        start: function() {
            // Se lanza solo 1 vez al tomar el elemento
            console.log("start")
        },
        drag: function() {
            // Se lanza mientras los arrastra
            //console.log("drag")
            //console.log($(this)[0].style.left)
            $("#punto").css({
                background: "blue",

                top: $(this)[0].style.top,
                left: $(this)[0].style.left

            });
            
        },
        stop: function() {
            // Cuando lo suelta
            $("#punto").css({
                top: $(this)[0].style.top,
                left: $(this)[0].style.left
            });
            $("#punto").click(siguienteClase);
            //Actualizar posicion de un elemento            
              _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posX = $(this).position().left + 12;
              _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posY = $(this).position().top + 12;
             //console.log( _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posX ) ;
             //console.log( _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posY ) ;
        }
    });
    $(".figura").draggable({
        helper: "clone",
        cursor: 'move'
    });
    $(".demo").click(cambiarFiguraLinea);
}
var linea;
var cambiarFiguraLinea = function(){
    //console.log($(this)[0]);
    //linea = $(this);
    var elemento = $("<div id='punto'></div>");
    elemento.css({
        //top: linea[0].style.top - linea[0].style.height,
        //left:linea[0].style.left - linea[0].style.width,
        //position: "absolute",
        //float: "right",
    })
    elemento.addClass("puntaRombo");
    //linea.append(elemento)
    $("#diagrama").append(elemento);
}
$(document).ready(function() {
    leerJson();
    //$("#punta").click(function(){
    //    console.log("click a la linea")
    //})
    //Actualizar la linea
    $.repeat().add('connection').each($).connections('update').wait(0);
    //Diagrama droppable
    $("#diagrama").droppable({
    drop: function (event, ui) {
        
        var canvas = $(this);

        if (!ui.draggable.hasClass('canvas-element')) {
            var canvasElement = ui.draggable.clone();
            canvasElement.addClass('canvas-element item base');
            //console.log("Soltaste "+ui)    
            let figuraTmp = new Figura(incrementarId(), canvasElement.prop("classList")[1],
                colorFondo(canvasElement.prop("classList")[1]), ui.position.left-100,
                ui.position.top-10,"", []);
            //_diagramasArr.push(figuraTmp) ;
            _diagramasArr[diagramaActual].figuras.push(figuraTmp);
            console.log(figuraTmp);
            canvasElement.draggable({
                containment: '#diagrama',
                stop: function() {
            //Actualizar posicion de un elemento
             //console.log($(this).position().top)
             console.log(figuraTmp.id)
             //console.log(_diagramasArr[diagramaActual].figuras[figuraTmp.id]);
              _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posX = figuraTmp.posX;
              _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posY = figuraTmp.posY;
             console.log( _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posX ) ;
             console.log( _diagramasArr[diagramaActual].figuras[$(this).attr("id")].posY ) ;
        }
            });
            canvasElement.attr('id', figuraTmp.id);
            //console.log(figuraTmp)
            let input = $('<input type="text">');
            input.css({
                width: 60
            });
            input.change(actualizarResponsable); //Kevin
            canvasElement.append(input);
            canvas.append(canvasElement);
            canvasElement.css({
                left: figuraTmp.posX,
                top: figuraTmp.posY,
                position: 'absolute',
                background: figuraTmp.colorFondo
            });
            canvasElement.dblclick(mostrarOpciones);
            canvasElement.click(cambiarColor);
        	
        }
    }
});

    $("#cargar").click(function(){
        _diagramasArr = [];
        cargarLocalStorage();
        cargarFiguras()
        dibujarLineas()
        drag()
        console.log(_diagramasArr);
        //diagramasArr.forEach(function(d){
        //    console.log(d)
        //});
    });
    $("#guardar").click(function(){
        guardarLocalStorage();
    });
    $("#exportar").click(function(e){

        //e.preventDefault();
        //console.log("Click");
        //console.log(JSON.stringify(figuras));
        //this.href = 'data:plain/text,' + JSON.stringify(figuras);
        $("#exportar").attr( "download", $("#titulo").val() +".json" );
        this.href = 'data:plain/text,' + JSON.stringify(_diagramasArr);
    });
    $("#flujos").change(function(){
        diagramaActual = $(this)[0].selectedIndex;
        _diagramasArr = [];
        cargarLocalStorage();
        id= calcularId();
        cargarFiguras()
        dibujarLineas()
        drag()
        
        $("#titulo").val(_diagramasArr[diagramaActual].titulo);
        
    })
});