<?php 
    include("connection.php");

    //making sure that there is data submitted for the login 
    //then retrieving that data and storing it in a variable 
    if(isset($_POST['submit'])) {
        $username = $_POST['user'];
        $password = $_POST['pass'];    

        //Login Logic: if user is present in the database, then login 

        //fetching results 
        $sql = "select * from login where username = '$username' and password = '$password'";
        //storing results from fetch 
        $result = mysqli_query($conn, $sql);
        //storing the results as an array 
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
        //traversing the database and seeing if there is matching login credentials  
        $count = mysqli_num_rows($result);

            if($count == 1) {
                header("Location:welcome.php"); //TODO, redirect to Ana's Homepage
            } else {
                //script alert from Dave Howlingworth: https://www.youtube.com/watch?v=5L9UhOnuos0&t=2279s
                echo '<script>
                window.location.href = "index.php";
                alert("Login failed. Invalid username or password")
                </script>';
            }
    }

?>