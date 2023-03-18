<?php
//connecting to database using login credentials 
$servername= "localhost";
$username= "root";
$password = "";
$db_name = "database1";

$conn = new mysqli($servername, $username, $password, $db_name, 3306);

//checking if connection was successful - otherwise show error meesage 
if ($conn->connect_error) {
	die("Connection Failed".$conn->connect_error);
}
//DEBUG statmement - this would show up above the login form page
//echo "Database Connection Sucessful";
?>