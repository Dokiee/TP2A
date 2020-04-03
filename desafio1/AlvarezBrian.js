// Se asume que la duracion de los videos es en minutos y segundos y se pide todo en segundos
const str = require('./data.js');
//Se separan por renglones y luego se filtra por aquellos que contengan Flexbox para tener solo esos valores  
let auxAr = str.split("\n")
               .filter(p => p.includes('Flexbox'));
var regexSec = new RegExp('\"(.*)\"'); //Se utiliza para encontrar todo lo que se halle dentro de los caracteres " "
//Se arma el map (0 : [ '5', '17' ])
let mapper = auxAr.map(function(i){
    return i.match(regexSec)[1]
            .split(":");
});
//Obtenemos los minutos por separado y se multiplican por 60 segundos
var minutos = mapper.map(x => parseInt(x) * 60).reduce((a,b) => a+b);    
console.log(minutos);
//Obtenemos los segundos
var segundos = mapper.reduce(function(acum, vActual){
    return parseInt(acum) + parseInt(vActual[1]);
},0);
console.log(segundos);
//Salida por pantalla
console.log(`El total de segundos calculados para Flexbox Video es  ${minutos + segundos}`);  