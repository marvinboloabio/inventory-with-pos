<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category Management</title>
    <link rel="stylesheet" href="../assets/css/supplier.css">
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
</head>
<body>
<div class="container mt-5">
    <h2 class="mb-4">Category Management</h2>
    <div class="d-flex justify-content-between mb-4">
        <input type="text" id="searchSupplier" class="form-control search-bar" placeholder="Search Categories">
        <button class="btn btn-primary" data-toggle="modal" data-target="#supplierModal" onclick="clearSupplierForm()">Add Categories</button>
    </div>

    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
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
                <h5 class="modal-title" id="supplierModalLabel">Add New Category</h5>
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
                        <label for="supplierContact">Description</label>
                        <input type="tel" id="supplierContact" class="form-control" required>
                    </div>
                    <div class="form-group">
                            <label for="status">Status</label>
                            <select id="status" class="form-control">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
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
<script src="../assets/js/categories.js"></script>
  
</script>
</body>
</html>
