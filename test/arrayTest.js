var assert = chai.assert;
describe('Array figuras', function(){

  it('Debe estar vacio', function(){
    var figuras = []; 
    assert.equal(figuras.length, 0);
  });
});

describe('Prueba de objetos', function(){
it('Deben cumplir con todos los parámetros', function(){

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
   var figura = new Figura("cuadrado", "red", 0,0,0,0,1);
   assert.notEqual(figura, null);

})
});
