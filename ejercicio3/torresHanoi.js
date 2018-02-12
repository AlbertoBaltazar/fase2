var origen = null;
var destino = null;
var aroSeleccionado = null;
$(document).ready(function(){
    var contenido;
    var seleccionado = false;
    var selDestino = false;
    var aro1 = crearTorre(true, 1);
    var aro2 = crearTorre(false, 2);
    var aro3 = crearTorre(false, 3);

    $('.torreContent').click(function(event){
        var numAros = numeroAros(this.id);
        if (seleccionado) {
            seleccionar(this.id);
        }else {
            seleccionado = true;
            seleccionar(this.id);
        }
        ctrlOrigenDestino(this, numAros);
    });
});

function ctrlOrigenDestino(torre, numAros){
    if (origen == null) {
        if (numAros > 0) {
            origen = torre;
        }
    }else if (origen != null && destino == null) {
        destino = torre;
        selDestino = true;
        if (origen != destino) {
            var numDestino = numeroAros(destino.id);
            var aroOrigen = obtenerAro(origen);
            var aroDestino = obtenerAro(destino);
            debugger;
            if (numDestino == 0 || (aroOrigen.id < aroDestino.id)) {
                quitarAro(origen);
                dibujarTorre(origen);
                ponerAro(destino);
                dibujarTorre(destino);
            }
        }else {
            destino = null;
            selDestino = false;
        }
    }

    if (origen != null && destino != null) {
        limpiarValores();
    }
}

function limpiarValores() {
        origen = null;
        destino = null;
        aroSeleccionado = null;
        seleccionado = false;
        selDestino = false;
}

function dibujarTorre(torre) {
    var tempId = torre.id;
    var temp = $(torre).children();
    while (($('#'+torre.id).children().length > 0)) {
        $('#'+torre.id+' div').last().remove();
    }
    $.each(temp, function(index, value){
        $('#'+tempId).append(value);
    });
}

function quitarAro(torre) {
    var temp = $(torre).children();
    // var res;
    $.each(temp, function(index, value){
        if (value.className == "aro") {
            aroSeleccionado = value;
            value = vacio();
            return false;
        }
    });
}

function ponerAro(torre) {
    var temp = $(torre).children();
    debugger;
    for (var i = temp.length-1; i>=0; i--) {
        if (temp[i].className == 'vacio') {
            debugger;
            temp[i] = aroSeleccionado;
            break;
        }
    }
}

function obtenerAro(torre) {
    var temp = $(torre).children();
    var res;
    $.each(temp, function(index, value){
        if (value.className == "aro") {
            res = value;
            return false;
        }
    });
    return ((res) ? res : {id:'0'});
}

function numeroAros(id) {
    var num = $('#'+id).children().length;
    return num;
}

function seleccionar(id) {
    $('.torreContent').css('border-top', '');
    $('.torreContent').css('border-left', '');
    $('.torreContent').css('border-right', '');
    $('#'+id).css('border-top','1px red solid');
    $('#'+id).css('border-left','1px red solid');
    $('#'+id).css('border-right','1px red solid');
}

function crearTorre(torreInicial, num){
    var div = $('<div class="torreContent" id="torre'+num+'"></div>');
    if (torreInicial) {
        contenido = llenarAros(num);
    }else {
        contenido = llenarTorre();
    }
    $.each(contenido, function(index, value) {
        div.append(value);
    })
    $('body').append(div);
    return div;
}


function crearAro(tamaño, color, id, val) {
    var div = $('<div class="aro" id='+val+'></div>');
    div.css('width', tamaño);
    div.css('background-color', color);
    $('#torre'+id).append(div);
    return div;
}

function llenarAros(num) {
    var aros = [];
    aros.push(crearAro('16%', 'red', num, 16));
    aros.push(crearAro('32%', 'orange', num, 32));
    aros.push(crearAro('48%', 'yellow', num, 48));
    aros.push(crearAro('64%', 'green', num, 64));
    aros.push(crearAro('80%', 'blue', num, 80));
    return aros;
}
function vacio() {
    var div = $('<div class="vacio"></div>');
    return div;
}

function llenarTorre() {
    var contenido = [];
    $.each(contenido, function(index, value){
        value = vacio();
    });
    return contenido;
}
