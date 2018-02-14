<?php

    error_reporting(E_ALL);
    ini_set("display_errors","on");
    require_once("usuarios.class.php");
    $usuarios = new Usuarios();
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    switch ($_REQUEST['opcion']) {
        case 'obtenerUsuarios':
            $resultado = $usuarios->obtenerUsuarios();
            echo $resultado;
            break;
        case 'agregarUsuario':
            $datos = array(
                "clave" => $request->clave,
                "nombre" => $request->nombre,
                "apellido" => $request->apellido,
                "fec_nacimiento"=> $request->fec_nacimiento,
                "estatus" => $request->estatus
            );
            $resultado = $usuarios->agregarUsuario($datos);
            echo $resultado;
            break;
        case 'editarUsuario':
            $datos = array(
                "id_usuario" => $_REQUEST['id_usuario'],
                "clave" => $_REQUEST['clave'],
                "nombre" => $_REQUEST['nombre'],
                "apellido" => $_REQUEST['apellido'],
                "fec_nacimiento"=> $_REQUEST['fec_nacimiento'],
                "estatus" => $_REQUEST['estatus']
            );
            $resultado = $usuarios->editarUsuario($datos);
            echo $resultado;
            break;
        case 'eliminarUsuario':
            $datos = array("id_usuario"=>$_REQUEST['id_usuario']);
            $resultado = $usuarios->eliminarUsuario($datos);
            echo $resultado;
            break;
        default:
            echo "La opcion ".$request->opcion." no existe.";
            break;
    }
