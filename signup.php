<!DOCTYPE html>
<html>
<head>
    
    <title>Signup</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">

</head>
<body>

 <!-- Form to Create a New Account-->
    
    <h1>Signup</h1>
    
    <form action="process_signup.php" method="POST" id="signup" novalidate>
        <div>
            <label for="username">Name</label>
            <input type="text" id="username" name="username"> 
        </div>
        

        <div>
            <label for="password">Password</label>
            <input type="password" id="pass" name="password"> 
        </div>
        
        <button>Sign up</button>
    </form>
    
</body>
</html>
