(function(){
    var torre1 = [];
    var torre2 = [];
    var torre3 = [];
    var n = $('#numAros').val();
    var cont = 0;

    $('#btnIniciar').on('click', function(){
        iniciar();
        mostrar();
        hanoi(n, torre1, torre2, torre3);
        mostrar();
        $('#lblResultado').text("Total de movimientos: "+cont);
    });
    // alert("Total de movimientos: "+cont);

    function hanoi(n, origen, auxiliar, destino) {
        if (n == 1) {
            moverAro(origen, destino)
        } else {
            hanoi(n - 1, origen, destino, auxiliar);
            moverAro(origen, destino);
            hanoi(n - 1, auxiliar, origen, destino);

        }
    }

    function moverAro(origen, destino) {
        destino.push(origen.pop());
        cont++;
        // console.log(cont);
    }

    function mostrar() {
        console.log(torre1);
        console.log(torre2);
        console.log(torre3);
        console.log();
    }

    function iniciar() {
        for (var i = 0; i < n; i++) {
            torre1.push(n - i);
        }
    }
})()
