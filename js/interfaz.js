//Hereda los resultados, e imprime en pantalla

//clase interfaz

class Interfaz{

    constructor(){
        this.init();
    }
    
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(data =>{
                //Crear un select con las opciones
                const arregloMonedas = data.monedas;
                const select = document.getElementById('criptomoneda');

                //Construir SELECT desde la REST API
                arregloMonedas.forEach(moneda => {
                    //añadir el ID y el valor
                    const option= document.createElement('option');
                    option.value = moneda.id;
                    option.appendChild(document.createTextNode(moneda.name));
                    select.appendChild(option);
                })
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        //div para mensaje en html
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //desaparecer alerta despues de 3 segundos
        setTimeout(()=>{
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //Imprimer el resultado de la cotizacion
    mostrarResultado(resultado, moneda){

        //eliminar resultado previo si existe
        const resultadoAnterior = document.querySelector('#resultado > div');
        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        this.muestraSpinner();

        //Construir etiqueta de precio segun la moneda
        const etiquetaMoneda = `price_${moneda}`;
        //Leer el valor del resultado
        const valor = resultado[etiquetaMoneda];
        //Convierte el texto de la moneda a mayuscula
        const monedaUpper = moneda.toUpperCase();
        //Convierte la hora de UNIX a horas y minutos
        const hora = new Date(resultado.last_updated * 1000);
        const horaActualizada = `${hora.getHours()}:${hora.getMinutes()} `;
        
        //construir el template
        let templateHTML = '';
        templateHTML += `
                <div class="card cyan darken-3">
                    <div class="card-content white-text">
                        <span class="card-title">Resultado:</span>
                        <p>El precio de ${resultado.name} a moneda ${monedaUpper} es de: $${valor}</p>
                        <p>Ultima hora: ${resultado.percent_change_1h}</p>
                        <p>Ultimo dia: ${resultado.percent_change_24h}</p>
                        <p>Ultimos 7 dias: ${resultado.percent_change_7d}</p>
                        <p>Ultima actualización: ${horaActualizada} horas<p>
                    </div>
                </div>
        `;
        
        setTimeout(()=>{
            //imprime el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;
            //oculta el spinner y muestra el resultado
            document.querySelector('.spinner img').remove();

        },3000);
    }

    //muestra un spinner cuando se cotiza
    muestraSpinner(){
        const spinnerGIF = document.createElement('img');
        spinnerGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGIF);
    }
}