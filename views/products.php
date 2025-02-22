<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/products.css">
</head>

<body>
<div id="navbar-container"></div>
    <div class="container mt-5">
        <h2 class="mb-4">Product Management</h2>
        <div class="d-flex justify-content-between mb-4">
            <input type="text" id="searchProducts" class="form-control search-bar" placeholder="Search Products">
            <button class="btn btn-primary" data-toggle="modal" data-target="#productModal" onclick="clearForm()">Add
                New Products</button>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th style = "display:none">User ID</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Brand</th>
                        <th>UOM</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Reorder Level</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="productTableBody">
                    <!-- Product data will be dynamically added -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">Add Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="productForm">
                        <input type="hidden" id="productId">
                        <div class="form-group">
                            <label for="sku">SKU</label>
                            <input type="text" id="sku" class="form-control">
                        </div>
                        <p id="validateSkuMsg" class="validationMessages"></p>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" class="form-control">
                        </div>
                        <p id="validateProductName" class="validationMessages"></p>
                        <div class="form-group">
                            <label for="userID">User ID</label>
                            <input type="text" id="userID" class="form-control" readonly>
                        </div>
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select id="category" class="form-control">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="supplier">Supplier</label>
                            <select id="supplier" class="form-control">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="brand">Brand</label>
                            <select id="brand" class="form-control">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="uom">UOM</label>
                            <select id="uom" class="form-control">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input type="number" id="price" class="form-control" step="0.01">
                        </div>
                        <p id="validatePrice" class="validationMessages"></p>
                        <div class="form-group">
                            <label for="stock">Stock Quantity</label>
                            <input type="number" id="stock" class="form-control">
                        </div>
                        <p id="validateStock" class="validationMessages"></p>
                        <div class="form-group">
                            <label for="reorder">Reorder Level</label>
                            <input type="number" id="reorder" class="form-control">
                        </div>
                        <p id="validateReorder" class="validationMessages"></p>
                        <button type="button" id="displayBtn" onclick="saveProduct()" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="adjustmentModal" tabindex="-1" aria-labelledby="adjustmentModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="adjustmentModalLabel">Adjustment</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="adjustmentForm">
                        <div class="form-group">
                            <label for="adjustProductId" class="form-label">Product ID</label>
                            <input type="text" class="form-control" id="adjustProductId" readonly>
                        </div>
                        <div class="form-group">
                            <label for="adjustmentUserID" class="form-label">User ID</label>
                            <input type="text" id="adjustmentUserID" class="form-control" readonly>
                        </div>
                        <div class="form-group">
                            <label for="adjustmentType" class="form-label">Adjustment Type</label>
                            <select class="form-control" id="adjustmentType">
                                <option value="">Select Type</option>
                                <option value="Increase">Increase</option>
                                <option value="Decrease">Decrease</option>
                            </select>
                        </div>
                        <p id="validateAdjustmentType" class="validationMessages"></p>
                        <div class="form-group">
                            <label for="quantity" class="form-label">Quantity</label>
                            <input type="number" class="form-control" id="quantity">
                        </div>
                        <p id="validateAdjustmentQuantity" class="validationMessages"></p>
                        <div class="form-group">
                            <label for="reason" class="form-label">Reason</label>
                            <textarea class="form-control" id="reason" rows="3"></textarea>
                        </div>
                        <p id="validateAdjusmentReason" class="validationMessages"></p>
                    <button type="button" id ="adjustmentBtn" onclick="saveAdjustment()" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/jquery-3.7.1.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/product.js"></script>
    <script src="../libs/notiflix-aio-3.2.8.min.js"></script>
    
</body>

</html>