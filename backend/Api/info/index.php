<?php
    switch ($method) {
        case 'newItem' :
            DB::insert('events', array(
                'type' => $folder,
                'sessionId' => $jsonPOST->sessionId,
                'timeFire' => $jsonPOST->timeFire,
                'dateFire' => $jsonPOST->dateFire,
                'msg' => $jsonPOST->msg
            ));
            echo $jsonPOST->method . ' ' . $jsonPOST->sessionId;
        break;
        default :
            echo "method not yet implemented";
        break;
    }
    
?>