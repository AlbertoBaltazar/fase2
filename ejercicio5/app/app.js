(function(){
    angular
        .module('app',['validaciones'])
        .controller('usuariosController', function(factUsuario, $filter){
            var usu = this;
            var editar = false;
            usu.datos = {};
            usu.datos.fecNacimiento =new Date();
            usu.usuarios = {};
            factUsuario.obtenerUsuarios(function(res){
                usu.usuarios = res;
            })

            usu.guardar = function(){
                var fecha = usu.datos.fecNacimiento.getFullYear()+"-"+formatearFecha(usu.datos.fecNacimiento.getMonth()+1) +"-"+ formatearFecha(usu.datos.fecNacimiento.getDate());
                var datos = {
                    clave: usu.datos.clave,
                    nombre: usu.datos.nombre,
                    apellido: usu.datos.apellido,
                    fec_nacimiento: fecha,
                    estatus:((usu.datos.estatus) ? 1 : 0)
                }
                if (!editar) {
                    factUsuario.agregarUsuario(datos,function(res){
                        if (res) {
                            usu.cerrarModal();
                            document.getElementById("btnCancelar").click();
                            alert("Datos guardados correctamente.");
                            factUsuario.obtenerUsuarios(function(res){
                                usu.usuarios = res;
                            })
                        }else {
                            alert("Ha ocurrido un error al guardar usuario.");
                            return;
                        }
                    });
                }else {
                    datos.id_usuario = usu.datos.id_usuario;
                    factUsuario.editarUsuario(datos, function(res){
                        if (res) {
                            usu.cerrarModal();
                            document.getElementById("btnCancelar").click();
                            alert("Datos guardados correctamente.");
                            editar = false;
                            factUsuario.obtenerUsuarios(function(res){
                                usu.usuarios = res;
                            })
                        }else {
                            alert("Ha ocurrido un error al editar usuario.");
                            return;
                        }
                    })
                }
            }

            usu.editarUsuarioModal = function(datos){
                editar = true;
                document.getElementById("btnAgregar").click();
                usu.datos.clave = datos.clave;
                usu.datos.nombre = datos.nombre;
                usu.datos.apellido = datos.apellido;
                usu.datos.fecNacimiento = new Date(datos.fec_nacimiento);
                usu.datos.estatus = ((datos.estatus == 1) ? true : false);
                usu.datos.id_usuario = datos.id_usuario;
            }

            usu.eliminarUsuario = function(datos){
                var c = confirm("¿Esta seguro que desea eliminar usuario "+datos.nombre+"?");
                if (c) {
                    factUsuario.eliminarUsuario(datos, function(res) {
                        if (res) {
                            alert("Usuario eliminado correctamente.");
                            factUsuario.obtenerUsuarios(function(res){
                                usu.usuarios = res;
                            });
                        }else {
                            alert("Ha ocurrido un error al eliminar usuario.");
                            return;
                        }
                    });
                }else {
                    return;
                }
            }

            usu.cerrarModal = function(){
                usu.datos.clave = null;
                usu.datos.nombre = null;
                usu.datos.apellido = null;
                usu.datos.fecNacimiento = null;
                usu.datos.estatus = null;
            }

            function formatearFecha(val){
                if (val<10) {
                    val='0'+val;
                }
                return val;
            }

        })

        // Servicios
        .factory('factUsuario', function($http){
            var usuarios = {}
            var url = "api/usuarios.controller.php?";

            usuarios.obtenerUsuarios = function(callback){
                var resultado;
                $http.get(url+'opcion=obtenerUsuarios').then(function(res){
                    resultado = res.data.res;
                    callback(resultado);
                }, function(err){
                    callback(err);
                });
            }

            usuarios.agregarUsuario = function(datos, callback){
                var resultado;
                $http.post(url+'opcion=agregarUsuario', datos).then(function(res){
                    if (res.data.error.msg == "ninguno") {
                        callback(true);
                    }
                }, function(err){
                    callback(err);
                });
            }

            usuarios.editarUsuario = function(datos, callback){
                var resultado;
                var param = $.param(datos);
                $http.put(url + 'opcion=editarUsuario&'+param).then(function(res){
                    if (res.data.error.msg == "ninguno") {
                        callback(true);
                    }
                }, function(err){
                    callback(err);
                });
            }

            usuarios.eliminarUsuario = function(datos, callback){
                var resultado;
                var param = $.param({id_usuario:datos.id_usuario});
                $http.delete(url+'opcion=eliminarUsuario&'+param).then(function(res){
                    if (res.data.error.msg == "ninguno") {
                        callback(true);
                    }
                }, function(err){
                    callback(err);
                });
            }

            return usuarios;
        })

})()
