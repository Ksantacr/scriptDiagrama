//Objeto figura

class Figura{
	constructor(colorFondo, posicionX, posicionY, hijos, padre){

	this.colorFondo= colorFondo;
	this.posicionX = posicionX;
	this.posicionY = posicionY;
	this.hijos = hijos;
	this.padre = padre;
	}

}

class Cuadrado extends Figura {
    constructor(colorFondo, posicionX, posicionY, hijos, padre) {
        super(colorFondo, posicionX, posicionY, hijos, padre);
    }
}

class Triangulo extends Figura {
    constructor(colorFondo, posicionX, posicionY, hijos, padre) {
        super(colorFondo, posicionX, posicionY, hijos, padre);
    }
}

class Circulo extends Figura {
    constructor(colorFondo, posicionX, posicionY, hijos, padre) {
        super(colorFondo, posicionX, posicionY, hijos, padre);
    }
}

class Rombo extends Figura {
    constructor(colorFondo, posicionX, posicionY, hijos, padre) {
        super(colorFondo, posicionX, posicionY, hijos, padre);
    }
}

//Arreglo para almacenar los objetos creados
var figuras= [];

$( "#save" ).click(function(event) {
	$("#save").attr( "download", $("#titulo").val() +".json" );
    this.href = 'data:plain/text,' + JSON.stringify(figuras);
});

//Funcion exportar
$("#exportar").click(function(e){
	//e.preventDefault();
	//console.log("Click");
	//console.log(JSON.stringify(figuras));

	//this.href = 'data:plain/text,' + JSON.stringify(figuras);
	
});

//Editar los valores de una figura
var mostrarOpciones = function(){

};
//Hacer la figura arrastrable
$(".figura").draggable({
    helper: "clone",
    cursor: 'move'
});
//Duplicar figuras en el diagrama
$("#diagrama").droppable({
    drop: function (event, ui) {
        var $canvas = $(this);
        if (!ui.draggable.hasClass('canvas-element')) {
            var $canvasElement = ui.draggable.clone();
            $canvasElement.addClass('canvas-element');
            $canvasElement.draggable({
                containment: '#diagrama'
            });
            $canvas.append($canvasElement);
            $canvasElement.css({
                left: (ui.position.left),
                top: (ui.position.top),
                position: 'absolute'
            });
            $canvasElement.click(mostrarOpciones);
            if($canvasElement.hasClass("cuadrado")){
            	//Crear objecto cuadrado
            	var tmpCuadrado = new Cuadrado("#FF4081",ui.position.left,ui.position.top,0,0);
            	figuras.push(tmpCuadrado);
            	console.log(tmpCuadrado);
            }else if($canvasElement.hasClass("circulo")){
				//Crear objeto circulo
				var tmpCirculo = new Circulo("#FF4081",ui.position.left,ui.position.top,0,0);
				figuras.push(tmpCirculo);
            	console.log(tmpCirculo);
            }else if($canvasElement.hasClass("triangulo")){
            	//Crear objeto triangulo
            	var tmpTriangulo = new Triangulo("#FF4081",ui.position.left,ui.position.top,0,0);
            	figuras.push(tmpTriangulo);
            	console.log(tmpTriangulo);
            }else if($canvasElement.hasClass("rombo")){
            	//Crear objeto Rombo
            	var tmpRombo = new Rombo("#FF4081",ui.position.left,ui.position.top,0,0);
            	figuras.push(tmpRombo);
            	console.log(tmpRombo);
            }

         	
        }
    }
});