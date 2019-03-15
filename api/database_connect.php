<?php
header('Access-Control-Allow-Origin: *');
// Connect to database
try {
    $db = new PDO('mysql:host=localhost;dbname=velocity', 'root', '');
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}