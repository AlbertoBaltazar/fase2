<?php

    require_once('conexion.php');
    error_reporting(E_ALL);
    ini_set("display_errors","on");

    class Ejemplo
    {
        private $res = array();
        private $error = array("msg" => "ninguno");
        private function imprimir(){
            return "{\"res\":" . json_encode($this->res) .",\"error\":".json_encode($this->error)."}";
        }
        public function ejemploPostgres()
        {
            try {
                $db = new Database("postgresSQL", "10.44.63.201", "sysinmuebles", "3za6qgdxi97obn5yptpxwjgskgyldsq1", "inmuebles", null);
                $pdo = $db->initPDO();
                $query = $pdo->prepare("SELECT * FROM cat_ct_municipios");
                $query->execute();
                $this->res = $query->fetchAll(PDO::FETCH_ASSOC);
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
            }
            return $this->imprimir();
        }

        public function ejemploSQL()
        {
            try {
                $db = new Database("SQLServer", "10.44.172.194", "sysredrabbit", "b003dae85f0930a8b211155ed8c20b1f", "construnet_des", "1433");
                $pdo = $db->initPDO();
                $query = $pdo->prepare("SELECT * FROM MenuOpciones_MR");
                $query->execute();
                $this->res = $query->fetchAll(PDO::FETCH_ASSOC);
            } catch (\Exception $e) {
                $this->error = $e->getMessage();
            }
            return $this->imprimir();
        }

    }

    $ejemplo = new Ejemplo();
    switch ($_REQUEST['opc']) {
        case 'ejemploPostgres':
            $resultado = $ejemplo->ejemploPostgres();
            echo $resultado;
            break;
        case 'ejemploSQL':
            $resultado = $ejemplo->ejemploSQL();
            echo $resultado;
            break;
        default:
            echo "Esta opcion no existe.";
            break;
    }
