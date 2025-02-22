
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventory Management - Navigation</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/navigate.css">
</head>

<body>
    <!-- Navigation Bar -->
    <div id = "navbar-container">

    </div>

    <!-- Page Content -->
    <div class="container mt-5">
        <div class="row">
            <!-- Dashboard Card -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="icon">
                            <!-- Dashboard image -->
                            <img src="../assets/images/search-engine.png" alt="Dashboard" />
                        </div>
                        <h5 class="card-title">Dashboard</h5>
                        <p class="card-text">Overview of warehouse operations.</p>
                        <a href="dashboard.php" class="btn btn-primary">Go to Dashboard</a>
                    </div>
                </div>
            </div>

            <!-- Inventory Card -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="icon">
                            <!-- Inventory image -->
                            <img src="../assets/images/inventory.png" alt="Inventory" />
                        </div>
                        <h5 class="card-title">Inventory</h5>
                        <p class="card-text">Track and manage inventory.</p>
                        <a href="products.php" class="btn btn-primary">Manage Inventory</a>
                    </div>
                </div>
            </div>

            <!-- Sales Transactions Card -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="icon">
                            <!-- Sales transactions image -->
                            <img src="../assets/images/increase.png" alt="Sales Transactions" />
                        </div>
                        <h5 class="card-title">Sales Transactions</h5>
                        <p class="card-text">Manage sales transactions and orders.</p>
                        <a href="sales.php" class="btn btn-primary">View Sales Transactions</a>
                    </div>
                </div>
            </div>

            <!-- Purchase Orders Card -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="icon">
                            <!-- Purchase orders image -->
                            <img src="../assets/images/shopping.png" alt="Purchase Orders" />
                        </div>
                        <h5 class="card-title">Purchase Orders</h5>
                        <p class="card-text">Manage purchase orders from suppliers.</p>
                        <a href="purchase_order.php" class="btn btn-primary">View Purchase Orders</a>
                    </div>
                </div>
            </div>

            <!-- Return to Suppliers Card -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="icon">
                            <!-- Return to suppliers image -->
                            <img src="../assets/images/supplier (1).png" alt="Return to Suppliers" />
                        </div>
                        <h5 class="card-title">Return to Suppliers</h5>
                        <p class="card-text">Manage returned products to suppliers.</p>
                        <a href="purchase_returns.php" class="btn btn-primary">Manage Returns</a>
                    </div>
                </div>
            </div>

            <!-- Return to Suppliers Card -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="icon">
                            <!-- Return to suppliers image -->
                            <img src="../assets/images/seo-report.png" alt="Return to Suppliers" />
                        </div>
                        <h5 class="card-title">Reports</h5>
                        <p class="card-text">Manage reports.</p>
                        <a href="reports.php" class="btn btn-primary">Manage Returns</a>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script src="../assets/js/jquery-3.7.1.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/navigate.js"></script>
</body>

</html>