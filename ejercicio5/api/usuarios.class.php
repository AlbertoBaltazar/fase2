<?php

    require_once('conexion.php');
    class Usuarios extends Database
    {
        private $res = array();
        private $error = array("msg"=>"ninguno");

        public function obtenerUsuarios()
        {
            try {
                $db = $this->initPDO();
                $query = $db->prepare("SELECT * FROM usuarios");
                $query -> execute();
                $this->res = $query->fetchAll(PDO::FETCH_ASSOC);
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
            }
            return $this->imprimir();
        }

        public function agregarUsuario($args)
        {
            try {
                $db = $this->initPDO();
                $query = $db->prepare("INSERT INTO usuarios(clave, nombre, apellido, fec_nacimiento, estatus) VALUES(?,?,?,?,?)");
                $query->bindParam(1,$args['clave']);
                $query->bindParam(2,$args['nombre']);
                $query->bindParam(3,$args['apellido']);
                $query->bindParam(4,$args['fec_nacimiento']);
                $query->bindParam(5,$args['estatus'], PDO::PARAM_INT);
                $query->execute();
                $this->res = $query;
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
            }
            return $this->imprimir();
        }

        public function editarUsuario($args)
        {
            try {
                $db = $this->initPDO();
                $query = $db->prepare("UPDATE usuarios SET clave = ?, nombre = ?, apellido = ?, fec_nacimiento = ?, estatus = ? WHERE id_usuario = ?");
                $query->bindParam(1,$args['clave']);
                $query->bindParam(2,$args['nombre']);
                $query->bindParam(3,$args['apellido']);
                $query->bindParam(4,$args['fec_nacimiento']);
                $query->bindParam(5,$args['estatus'], PDO::PARAM_INT);
                $query->bindParam(6,$args['id_usuario'], PDO::PARAM_INT);
                $query->execute();
                $this->res = $query;
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
            }
            return $this->imprimir();
        }

        public function eliminarUsuario($args)
        {
            try {
                $db = $this->initPDO();
                $query = $db->prepare("DELETE FROM usuarios where id_usuario = ?");
                $query->bindParam(1,$args['id_usuario'],PDO::PARAM_INT);
                $query->execute();
                $this->res = $query;
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
            }
            return $this->imprimir();
        }

        private function imprimir(){
            return "{\"res\":" . json_encode($this->res) .",\"error\":".json_encode($this->error)."}";
        }

        function __construct()
        {
            parent::__construct();
        }


    }
