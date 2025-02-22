
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../assets/css/nav.css">
    <link rel="stylesheet" href="../assets/css/all.min.css">
</head>
<body>
    <!-- Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="nav-container">
    <a class="navbar-brand" href="../views/navigate.php">
    <img src="../assets/images/company-high-resolution-logo-transparent.png" alt="Company Logo" height="60">
</a>
        <div class="ml-auto d-flex align-items-center">
            <span class="user-name mr-3"><i class="icons fa-regular fa-user-circle mr-2"></i><span id="user_id" style = "display:none"></span><span id="user_name"></span></span>
            <!-- Button with hoverable settings list -->
            <div class="dropdown d-inline-block">
                <button class="btn btn-outline-light mr-2">
                    <div class="icon-buttons">
                        <img src="../assets/images/settings.png" alt="Settings" class="icon-img" /> Settings
                    </div>
                </button>

                <div class="dropdown-menu">
                    <a href="supplier.html" class="dropdown-item">Supplier</a>
                    <a href="warehouse.html" class="dropdown-item">Warehouse</a>
                    <a href="brand.html" class="dropdown-item">Brand</a>
                    <a href="uom.html" class="dropdown-item">UOM</a>
                    <a href="category.html" class="dropdown-item">Category</a>
                </div>
            </div>
            <button class="btn btn-light" onclick="logoutSession()">
                <div class="icon-buttons">
                    <img src="../assets/images/arrow.png" alt="Logout" class="icon-img" /> Logout
                </div>
            </button>
        </div>
    </div>
</nav>
<script src = "../assets/js/nav.js"></script>
</body>
</html>
