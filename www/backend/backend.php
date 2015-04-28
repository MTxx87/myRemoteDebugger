<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST'); 
    require_once '_lib/meekrodb.2.3.class.php';

    $myDatabase = 'my_matteotoninidev';
    $myPassword = 'doctecesbe53';
    $myUser = 'matteotoninidev';
    
    require_once 'parameters.php';

    $jsonPOST = json_decode(file_get_contents("php://input"));
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $pieces = explode("/", $jsonPOST->method);
        $folder = $pieces[0];
        $method = $pieces[1];
        switch ($folder) {
            case 'trace':
                require_once $folder . '/index.php';
                break;
            case 'info' :
                require_once $folder . '/index.php';
                break;
            case 'warn':
                require_once $folder . '/index.php';
                break;
            case 'debug':
                require_once $folder . '/index.php';
                break;
            case 'error':
                require_once $folder . '/index.php';
                break;
            case 'exception':
                require_once $folder . '/index.php';
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