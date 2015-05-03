<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST'); 
    require_once '_lib/meekrodb.2.3.class.php';
    
    $jsonPOST = json_decode(file_get_contents("php://input"));
    
    DB::$dbName =  $jsonPOST->userSettings->database;
    DB::$user = $jsonPOST->userSettings->user;
    DB::$password = $jsonPOST->userSettings->password;
    

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        switch ($jsonPOST->method) {
            case 'interface/getSessions':
                $array = DB::query("SELECT * FROM sessions WHERE id > %i ORDER BY id ASC", $jsonPOST->id);
                $response = json_encode($array);
                echo $response;
                break;
            case 'interface/getSingleSession':
                $array = DB::query("SELECT * FROM events WHERE sessionId = %i ORDER BY id ASC", $jsonPOST->id);
                $response = json_encode($array);
                echo $response;
                break;
            case 'interface/deleteData' :
                $response = DB::query("
                    TRUNCATE `events`
                ");
                if ($response == 1) {
                    $response = DB::query("
                        TRUNCATE `sessions`
                    ");
                }
                if ($response == 1) {
                    $message = array('message' => 'data successful deleted');
                } else {
                    $message = $response;
                }
                echo json_encode($message);
                break;
            case 'interface/createTables' :
                $response = DB::query("
                    CREATE TABLE IF NOT EXISTS `events` (
                      `id` int(11) NOT NULL AUTO_INCREMENT,
                      `sessionId` bigint(20) NOT NULL,
                      `type` tinytext NOT NULL,
                      `dateFire` date NOT NULL,
                      `timeFire` time NOT NULL,
                      `msg` text,
                      `data` longtext,
                      PRIMARY KEY (`id`)
                    ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;
                ");
                if ($response == true) {
                    $response = DB::query("
                        CREATE TABLE IF NOT EXISTS `sessions` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `app` tinytext,
                          `version` tinytext,
                          `sessionId` bigint(11) NOT NULL,
                          `user` tinytext NOT NULL,
                          `startDate` date NOT NULL,
                          `startTime` time NOT NULL,
                          `stopDate` date NOT NULL,
                          `stopTime` time NOT NULL,
                          `os` tinytext NOT NULL,
                          `platform` tinytext NOT NULL,
                          `model` tinytext NOT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `id` (`id`),
                          KEY `id_2` (`id`)
                        ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;
                    ");
                }
                if ($response == true) {
                    $message = array('message' => 'tables created');
                } else {
                    $message = $response;
                }
                echo json_encode($message);
                break;
            default :
                header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500); 
                echo "method doesn't exist";
                break;
        }
    } else {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500); 
        echo "please provide POST request";
    }
?>