<?php

  private $user = 'root';
  private $password = '';
  private $server = 'localhost';
  private $database = 'usuarios';

  public function __construct()
  {
    try {
      $db = new PDO('mysql:host=17.0.0.1;dbname=fase2', $this->user, $this->password);
    } catch (PDOException $e) {
      echo "Error a conectar a Base de Datos";
      $e->getMessage();
    }

  }
