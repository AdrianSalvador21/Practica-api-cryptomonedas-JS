//Consultas hacia la api

//clase cotizador
class Cotizador{

        //Obtiene todo el json con las cryptomonedas
    async obtenerMonedasAPI(){
       //fetch a la api
       const urlObtenerMonedas = await fetch("https://api.coinmarketcap.com/v1/ticker/");

       // respuesta en json de las monedas
       const monedas = await urlObtenerMonedas.json();

       return {
           monedas
       }
    }

    //

    async obtenerValores(moneda,criptomoneda){
        //Convierte los selects en la URL
        const urlConvertir = await fetch(`https://api.coinmarketcap.com/v1/ticker/${criptomoneda}/?convert=${moneda}`);

        const resultado = await urlConvertir.json();

        return{
            resultado
        }
    }


}