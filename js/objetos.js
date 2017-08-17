class Diagrama{
    constructor(figuras, titulo, version){
        this.figuras = figuras;
        this.titulo = titulo;
        this.version = version;
    }
}

class Figura{
	constructor(id, tipo,  colorFondo, posX, posY, responsable, hijos){

    this.id = id;
    this.tipo = tipo;
	this.colorFondo= colorFondo;
	this.posX = posX;
	this.posY = posY;
    this.responsable =responsable;
    this.hijos = hijos;

	}
}
