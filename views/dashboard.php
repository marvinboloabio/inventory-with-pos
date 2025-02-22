<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventory Dashboard</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/dashboard.css">
</head>

<body>
    <div class="content w-100">
        <nav class="navbar navbar-light shadow-sm mb-4">
            <span class="navbar-brand">Inventory Dashboard</span>
            <div>
                <button class="btn btn-outline-dark">Notifications</button>
                <button class="btn btn-primary">Profile</button>
            </div>
        </nav>

        <div class="row">
            <div class="col-md-4">
                <div class="card bg-success text-white">
                    <div class="card-header">Total Sales</div>
                    <div class="card-body">
                        <h4>$10,500</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-info text-white">
                    <div class="card-header">Total Products</div>
                    <div class="card-body">
                        <h4>420</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-danger text-white">
                    <div class="card-header">Low Stock Alert</div>
                    <div class="card-body">
                        <h4>15 Products</h4>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-primary text-white">
                    <div class="card-header">New Orders</div>
                    <div class="card-body">
                        <h4>50</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-dark text-white">
                    <div class="card-header">Top Selling Products</div>
                    <div class="card-body">
                        <h4>Laptop, Phone, Headset</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-light text-light">
                    <div class="card-header">Returns & Refunds</div>
                    <div class="card-body">
                        <h4>4</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <h5>Recent Transactions</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Laptop</td>
                        <td>2</td>
                        <td>$1200</td>
                        <td>2025-01-29</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Phone</td>
                        <td>5</td>
                        <td>$4000</td>
                        <td>2025-01-28</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>