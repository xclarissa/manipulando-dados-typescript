export default function stringToDate(texto) {
    var _a = texto.split(' '), data = _a[0], tempo = _a[1];
    var _b = data.split('/').map(Number), dia = _b[0], mes = _b[1], ano = _b[2];
    var _c = tempo.split(":").map(Number), hora = _c[0], minuto = _c[1];
    ;
    console.log(ano, mes, dia, hora, minuto);
    return new Date(ano, mes - 1, dia, hora, minuto);
}
