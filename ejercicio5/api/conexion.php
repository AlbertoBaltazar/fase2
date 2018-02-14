<?php

    class Database
    {
        private $server = "localhost";
        private $port = "8080";
        private $user = "root";
        private $pass = "";
        private $dbFase2 = "fase2";
        private $nombreDB;

        function __construct($nombre = "fase2")
        {
            $this->nombreDB = $nombre;
        }

        public function initPDO()
        {
            try {
                $pdo = new PDO("mysql:host=".$this->server.";dbname=".$this->dbFase2.";", $this->user, $this->pass);
                $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                return $pdo;
            } catch (\Exception $e) {
                return $e->getMessage();
            }

        }
    }
