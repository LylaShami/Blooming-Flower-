<?php
    include("connection.php");
?>

<!-- This is the form to login to an existing account-->

<!DOCTYPE html>
<html lang = "en">

<head> 
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content = "IE = edge">
    <meta name ="viewport" content = "width = device-width, initial-scale = 1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
    <div id = "form">
    <h1> Blooming Flower Login </h1>
    <form name = "form" action = "process_login.php" method = "POST">
            <label> Username: </label>
            <input type = "text" id = "user" name = "user"> </br></br>
            <label> Password: </label>
            <input type = "password" id = "pass" name = "pass"> </br></br>
            <input type = "submit" id = "btn" value = "Login" name = "submit"/> 

    </form>      

<!-- This is the form to go to the sign-up page-->

    <form name ="form" action = "signup.php" method = "POST">

    <label> Don't have an account? </label>
    <input type = "submit" id = "btn" value = "Signup" name = "submit"/> 

    </form>
</body>

<html>