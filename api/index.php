<?php

require "database_connect.php";
$q = $db->prepare("INSERT INTO reservations (id_station, id_user, nb_bikes) VALUES (:id_station, :id_user, :nb_bikes) ") ;
$q->bindParam(":id_station", $_POST["idStation"]);
$q->bindParam(":nb_bikes", $_POST["bikeStands"]);
$q->bindParam(":id_user", $_POST["userId"]);

if($q->execute()){
        echo 'AAA';
    }
// fetch user in database with SQL request
//$q = $db->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
//$q->bindParam(":username", $_POST ["username"]);
//$q->bindParam(":password", $_POST ["password"]);
//$q->execute();

//md5()

?>