<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warehouse Management</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/supplier.css">
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
</head>
<body>
<div class="container mt-5">
    <h2 class="text-center mb-4">Warehouse Management</h2>
    
    <!-- Search and Add Button Row -->
    <div class="row mb-4">
        <div class="col-12 col-md-8 mb-2 mb-md-0">
            <input type="text" id="searchSupplier" class="form-control search-bar" placeholder="Search Brand">
        </div>
        <div class="col-12 col-md-4 text-md-right">
            <button class="btn btn-primary w-100 w-md-auto" data-toggle="modal" data-target="#supplierModal" onclick="clearSupplierForm()">Add Warehouse</button>
        </div>
    </div>

    <!-- Responsive Table -->
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="supplierTableBody">
                <!-- Supplier data will be dynamically added -->
            </tbody>
        </table>
    </div>
</div>

<!-- Modal for Add/Edit Supplier -->
<div class="modal fade" id="supplierModal" tabindex="-1" aria-labelledby="supplierModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="supplierModalLabel">Add New Warehouse</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="supplierForm">
                    <input type="hidden" id="supplierId">
                    <div class="form-group">
                        <label for="supplierName">Name</label>
                        <input type="text" id="supplierName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="warehouseLocation">Location</label>
                        <input type="text" id="warehouseLocation" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="supplierContact">Description</label>
                        <input type="text" id="supplierContact" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="saveSupplier()">Save</button>
            </div>
        </div>
    </div>
</div>

<script src="../assets/js/jquery-3.7.1.min.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/warehouse.js"></script>
</body>
</html>
