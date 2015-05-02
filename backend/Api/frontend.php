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