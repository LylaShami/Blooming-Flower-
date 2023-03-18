<?php

    include("connection.php");

    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "INSERT INTO login (username, password) VALUES ('$username' , '$password')";

        //make sure that the request was successfully put into the database 
        if ($conn->query($sql) === TRUE) {
            //DEBUG statement 
            echo "New Account Created Successfully";
            //redirect to login page 
            header("Location:index.php");
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

    $conn->close();

?>