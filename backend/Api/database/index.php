<?php
    switch ($method) {
        case 'createTables' :
            DB::insert('events', array(
                'type' => $folder,
                'sessionId' => $jsonPOST->sessionId,
                'timeFire' => $jsonPOST->timeFire,
                'dateFire' => $jsonPOST->dateFire,
                'msg' => $jsonPOST->msg,
                'data' => json_encode($jsonPOST->data)
            ));
            $message = array('message' => 'tables created');
            echo $message;
        break;
        default :
            echo "method not yet implemented";
        break;
    }
    
?>