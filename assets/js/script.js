// VALIDACIÓN
const validacion = (valor) => {
    if (!isNaN(valor) && valor != null && valor != "") { return Number(valor); }
    return 0;
}
// CANTIDAD DE INTENTOS 
let juegos = validacion(prompt('Cuantas veces desea jugar'));
let intentosHtml = juegos > 0 ? $('#intentos').html(juegos) : $('#intentos').html('0');
// SELECCION DE TARJETA
$('.card').click(function () {
    let id = $(this).attr("id");
    $('#jugar').attr('value', id);
    $('.card').css("background", "none")
    $(this).css("background", "green");
})
// JUGANDO GANASTE, EMPATE O PERDISTE
let contadorGanadas = 0;
let contadorPerdidas = 0;
$('#jugar').click(function () {
    let usuario = $(this).val();
    if (usuario == '') {
        alert('Por favor seleccione una tarjeta');
    } else {
        let jugadaMaquina = Math.floor(Math.random() * 3);
        let estado;
        let intentos = --juegos;
        intentosHtml = juegos > 0 ? $('#intentos').html(intentos) : $('#intentos').html('0');
        if (intentos >= 0) {
            comparacionJuego(usuario, jugadaMaquina);
            if (intentos == 0) {
                juegos = 0;
                resultadoPartida(contadorGanadas, contadorPerdidas);
            } else {
                alert('Por favor seleccione una tarjeta nuevamente');
            }
        } else {
            juegos = 0;
            resultadoPartida(contadorGanadas, contadorPerdidas);
        }
    }
})
// FUNCION COMPARANDO RESULTADO DE USUARIO Y LA MAQUINA
const comparacionJuego = (usuario, jugadaMaquina) => {
    switch (usuario) {
        case '0':
            const piedra = {
                0: 'EMPATE',
                1: 'PERDISTE',
                2: 'GANASTE'
            }
            estado = piedra[jugadaMaquina];
            contadorGanadas = (estado === 'GANASTE') ? ++contadorGanadas : contadorGanadas;
            contadorPerdidas = (estado === 'PERDISTE') ? ++contadorPerdidas : contadorPerdidas;
            break;
        case '1':
            const papel = {
                0: 'GANASTE',
                1: 'EMPATE',
                2: 'PERDISTE'
            }
            estado = papel[jugadaMaquina];
            contadorGanadas = (estado === 'GANASTE') ? ++contadorGanadas : contadorGanadas;
            contadorPerdidas = (estado === 'PERDISTE') ? ++contadorPerdidas : contadorPerdidas;
            break;
        case '2':
            const tijeras = {
                0: 'PERDISTE',
                1: 'GANASTE',
                2: 'EMPATE'
            }
            estado = tijeras[jugadaMaquina];
            contadorGanadas = (estado === 'GANASTE') ? ++contadorGanadas : contadorGanadas;
            contadorPerdidas = (estado === 'PERDISTE') ? ++contadorPerdidas : contadorPerdidas;
            break;
    }
    return alert(estado);
}
// FUNCION RESULTADOS DE LA PARTIDA //
const resultadoPartida = (ganaste, perdiste) => {
    let resultado;
    if (ganaste > perdiste) {
        resultado = 'GANADO FELICIDADES COMPATRIOTA';
    } else if (ganaste < perdiste) {
        resultado = 'PERDIDO NUNCA JUEGES LA LOTERIA';
    } else {
        resultado = 'EMPATADO SIGUE INTENTANDOLO';
    }
    return alert(`Se han acabado sus intentos. La partida la has ${resultado} si quieres seguir jugando recarge el navegador`);
}