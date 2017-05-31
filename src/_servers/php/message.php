<?php
require_once("config.php");
require __DIR__ . '/vendor/autoload.php';

class MyLogger {
  public function log( $msg ) {
    print_r( $msg . "\n" );
  }
}

// TODO: Check for valid POST data

$pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID, array('cluster' => CLUSTER));

// uncomment to enable pusher logging!
//$pusher->set_logger( new MyLogger() );

$pusher->trigger($_POST["channel"], "message", $_POST["message"], $_POST["socketId"], true);

header("Status: 200");
?>
