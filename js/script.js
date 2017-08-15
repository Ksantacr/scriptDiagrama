//Objeto figura

//localStorage.clear();

class Figura{
	constructor(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id){

    this.tipo = tipo;
	this.colorFondo= colorFondo;
	this.posicionX = posicionX;
	this.posicionY = posicionY;
	this.hijos = hijos;
    this.padre = padre;
    this.texto = texto;
    this.id = id;
	}
}

class Cuadrado extends Figura {
    constructor(tipo,colorFondo, posicionX, posicionY, hijos, padre, texto, id) {
        super(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id);
    }
}

class Triangulo extends Figura {
    constructor(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id) {
        super(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id);
    }
}

class Circulo extends Figura {
    constructor(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id) {
        super(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id);
    }
}

class Rombo extends Figura {
    constructor(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id) {
        super(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id);
    }
}

class Otra extends Figura {
    constructor(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id) {
        super(tipo, colorFondo, posicionX, posicionY, hijos, padre, texto, id);
    }
}

//Arreglo para almacenar los objetos creados
var figuras= [];
var generarId = 0;
var elementosSeleccionados = 0 ;

//Editar input
var inputCambiado = function(e){
    console.log(figuras[$(this).parent().attr('id')]);
    figuras[$(this).parent().attr('id')].texto = $(this).val();
}

// Guardar en localStorage
$( "#save" ).click(function(event) {

	//$("#save").attr( "download", $("#titulo").val() +".json" );
    //this.href = 'data:plain/text,' + JSON.stringify(figuras);

    var listaFiguras = JSON.stringify(figuras);
    localStorage.setItem('figuras', listaFiguras);
    console.log("Guardado");

});

//Funcion cargar
$("#load").click(function(e){

    //Cargar los datos del localStorage
    var localFiguras = localStorage.getItem('figuras');

    //Vaciar lienzo
    $("#diagrama").empty();

    //transformar a un array
    var elementos = JSON.parse(localFiguras);
    
    //Iterar por cada figura
    for(var x in elementos){

        switch(elementos[x].tipo){
            case 'cuadrado':
            var tmp = new Cuadrado(elementos[x].tipo, elementos[x].colorFondo, elementos[x].posicionX,
                elementos[x].posicionY, elementos[x].tipo.hijos, elementos[x].padre,
            elementos[x].texto, elementos[x].id);
            figuras.push(tmp)
            break;
            case 'triangulo':
            var tmp = new Triangulo(elementos[x].tipo, elementos[x].colorFondo, elementos[x].posicionX,
                elementos[x].posicionY, elementos[x].tipo.hijos, elementos[x].padre,
            elementos[x].texto, elementos[x].id);
            figuras.push(tmp); break;
            case 'circulo': var tmp = new Circulo(elementos[x].tipo, elementos[x].colorFondo, elementos[x].posicionX,
                elementos[x].posicionY, elementos[x].tipo.hijos, elementos[x].padre,
            elementos[x].texto, elementos[x].id);
            figuras.push(tmp);
            break;
            case 'rombo': var tmp = new Rombo(elementos[x].tipo, elementos[x].colorFondo, elementos[x].posicionX,
                elementos[x].posicionY, elementos[x].tipo.hijos, elementos[x].padre,
            elementos[x].texto, elementos[x].id);
            figuras.push(tmp);
            break;
        }

        var elemento = $("<div></div>");
        elemento.attr('id', elementos[x].tipo);
        var elementoInput = $("<input></input>");
        elementoInput.val(elementos[x].texto);
        elemento.append(elementoInput);
        elemento.addClass("figura "+elementos[x].tipo);
        elementoInput.css({
            width: 65
        });
        elemento.css({
            left: (elementos[x].posicionX),
            top: (elementos[x].posicionY),
            position: 'absolute'
        });
        elemento.addClass('canvas-element');
        elemento.draggable({
            containment: '#diagrama'
        });        
        $("#diagrama").append(elemento);
    }
    
});

//Funcion exportar
$("#exportar").click(function(e){
	//e.preventDefault();
	//console.log("Click");
	//console.log(JSON.stringify(figuras));
    //this.href = 'data:plain/text,' + JSON.stringify(figuras);
    $("#exportar").attr( "download", $("#titulo").val() +".json" );
    this.href = 'data:plain/text,' + JSON.stringify(figuras);
    

});

//Editar los valores de una figura
var actual, nuevo;
var mostrarOpciones = function(){
   //console.log($(this).hasClass("rombo"))

   elementosSeleccionados+=1;

   //if(nuevo != null && )

   if(elementosSeleccionados == 1){
        actual = $(this);
   }
    if(elementosSeleccionados==2){
        console.log("seleccionaste 2");
        nuevo = $(this);
        

        var cuadrado = $("<div></div>");
        var ancho = Math.abs(nuevo[0].offsetLeft-actual[0].offsetLeft);
        var alto =  Math.abs(nuevo[0].offsetTop -actual[0].offsetTop);
        cuadrado.addClass("linea");
        cuadrado.css({
            left: actual[0].offsetLeft+35,
            top: actual[0].offsetTop+35,
            width: ancho,
            height: alto
            //background: 'red',
            //transform: "rotate(-45deg)"
            //position: 'absolute'
        });

        

        //console.log(nuevo[0].style.left);
        //console.log(actual[0].style.left);
        //cuadrado.addClass("figura");
        $("#diagrama").append(cuadrado);

        elementosSeleccionados = 0;
        nuevo = null;
        actual= null;
    }

};
//Hacer la figura arrastrable
$(".figura").draggable({
    helper: "clone",
    cursor: 'move'
});

$("#add").click(function(){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('id','line2');
    newLine.setAttribute('x1','0');
    newLine.setAttribute('y1','0');
    newLine.setAttribute('x2','300');
    newLine.setAttribute('y2','300');
    newLine.setAttribute('stroke', 'black');
    newLine.setAttribute('stroke-width', '3');
    newLine.setAttribute('fill', 'red');
    $("#diagrama").append(newLine);
});
//Duplicar figuras en el diagrama
$("#diagrama").droppable({
    drop: function (event, ui) {
        
        var canvas = $(this);

        if (!ui.draggable.hasClass('canvas-element')) {
            var canvasElement = ui.draggable.clone();
            canvasElement.addClass('canvas-element');

            canvasElement.attr('id', generarId);

            canvasElement.draggable({
                containment: '#diagrama'
            });

            var inputTmp = $("<input placeholder='texto'></input>");
            inputTmp.css({
                width: 65
            });

            inputTmp.change(inputCambiado);
            canvasElement.append(inputTmp);
            canvas.append(canvasElement);
            canvasElement.css({
                left: (ui.position.left),
                top: (ui.position.top),
                position: 'absolute'
            });
            canvasElement.click(mostrarOpciones);

            if(canvasElement.hasClass("cuadrado")){
            	//Crear objecto cuadrado
            	var tmpCuadrado = new Cuadrado("cuadrado", "#FF4081",ui.position.left,ui.position.top,0,0, "", generarId);
            	figuras.push(tmpCuadrado);
            	console.log(tmpCuadrado);
            }else if(canvasElement.hasClass("circulo")){
				//Crear objeto circulo
				var tmpCirculo = new Circulo("circulo", "#FF4081",ui.position.left,ui.position.top,0,0,"",  generarId);
				figuras.push(tmpCirculo);
            	console.log(tmpCirculo);
            }else if(canvasElement.hasClass("triangulo")){
            	//Crear objeto triangulo
            	var tmpTriangulo = new Triangulo("triangulo", "#FF4081",ui.position.left,ui.position.top,0,0,"", generarId);
            	figuras.push(tmpTriangulo);
            	console.log(tmpTriangulo);
            }else if(canvasElement.hasClass("rombo")){
            	//Crear objeto Rombo
            	var tmpRombo = new Rombo("rombo","#FF4081",ui.position.left,ui.position.top,0,0, "", generarId);
            	figuras.push(tmpRombo);
            	console.log(tmpRombo);
            }
            generarId++;
         	
        }
    }
});
