<?php

    class Database
    {
        private $tipoDB;
        private $server;
        private $user;
        private $password;
        private $port;
        private $nombreDB;
        function __construct($tipo = "postgresSQL", $ser, $usr, $pw, $nom, $prt)
        {
            if ($tipo == "postgresSQL" || $tipo == "SQLServer") {
                $this->tipoDB = $tipo;
            }else {
                echo "Este tipo de base de datos no esta disponible, se asignara tipo base de datos PostgresSQL.";
                $this->tipoDB = "postgresSQL";
            }
            $this->server = $ser;
            $this->user = $usr;
            $this->password = $pw;
            $this->nombreDB = $nom;
            $this->port = $prt;
        }

        public function initPDO()
        {
            switch ($this->tipoDB) {
                case 'postgresSQL':

                    try {
                        $PDO = new PDO("pgsql:dbname=$this->nombreDB;host=$this->server;user=$this->user;password=$this->password");
                        $PDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        return $PDO;
                    } catch (Exception $e) {
                        return $e->getMessage();
                    }
                    break;
                case 'SQLServer':
                    try {
                        $PDO = new PDO("sqlsrv:Server=".$this->server.",".$this->port.";Database=".$this->nombreDB, $this->user, $this->password);
                        $PDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        return $PDO;
                    } catch (Exception $e) {
                        return $e->getMessage();
                    }
                    break;
            }
        }
    }
