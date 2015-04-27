<?php
    switch ($method) {
        case 'sessionStart' : 
            DB::insert('sessions', array(
                'sessionId' => $jsonPOST->sessionId,
                'user' => $jsonPOST->user,
                'os' => $jsonPOST->os,
                'platform' => $jsonPOST->platform,
                'model' => $jsonPOST->model,
                'startTime' => $jsonPOST->startTime,
                'startDate' => $jsonPOST->startDate
            ));
            echo $jsonPOST->method . ' ' . $jsonPOST->sessionId;
        break;
        case 'sessionStop' :
            DB::update('sessions', array(
               'stopTime' => $jsonPOST->stopTime,
               'stopDate' => $jsonPOST->stopDate
            ), "sessionId=%i", $jsonPOST->sessionId);
            echo $jsonPOST->method . ' ' . $jsonPOST->sessionId;
        break;
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