<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Inventory Management</title>
    <!-- Bootstrap 4 CDN for styles -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <!-- Optional custom styles -->
    <link rel="stylesheet" href="../assets/css/login.css"> 
    <link rel="stylesheet" href="../assets/css/nav.css">
</head>
<body>
<div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-4">
            <div class="card shadow-lg">
                <div class="card-header text-center">
                    <h3>Login</h3>
                </div>
                <div class="card-body">
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" required placeholder="Enter your username">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" required placeholder="Enter your password">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="login()">Login</button>
                    </form>
                    <div class="mt-3 text-center">
                        <a href="#">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- jQuery and Bootstrap 4 JS CDN -->
<script src="../assets/js/jquery-3.7.1.min.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/login.js"></script>
</body>
</html>

