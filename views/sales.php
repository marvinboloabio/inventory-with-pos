<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Management</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/products.css">
</head>

<body>
<div id="navbar-container"></div>
    <div class="container mt-5">
        <h2 class="mb-4">Sales Management</h2>
        <div class="d-flex justify-content-between mb-4">
            <input type="text" id="searchProducts" class="form-control search-bar" placeholder="Search Products">
            <button class="btn btn-primary" data-toggle="modal" data-target="#productModal" onclick="clearForm()">Add
                New Sales</button>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Transaction Date</th>
                        <th>Total Amount</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Current Stack</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="productTableBody">
                    <!-- Supplier data will be dynamically added -->
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
                    <h5 class="modal-title" id="productModalLabel">Add Sales</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="productForm">
                        <input type="hidden" id="salesID" readonly>
                        <div class="form-group">
                            <label for="userID" class="form-label">User ID</label>
                            <input type="text" id="userID" class="form-control" readonly>
                        </div>
                        <div class="form-group">
                            <label for="transactionDate">Transaction Date</label>
                            <input type="date" id="transactionDate" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="totalAmount">Total Amount</label>
                            <input type="number" id="totalAmount" class="form-control" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="customer">Customer</label>
                            <input type="text" id ="customer" class = "form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="product">Product</label>
                            <select id="product" class="form-control">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="productQuantity">Current Stack</label>
                            <input type="number" id="productQuantity" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="qty">Quantity</label>
                            <input type="number" id="qty" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="unitPrice">Unit Price</label>
                            <input type="number" id="unitPrice" class="form-control" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="totalPrice">Total Price</label>
                            <input type="number" id="totalPrice" class="form-control" step="0.01" required>
                        </div>
                          <!-- Add/Edit Product Modal 
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select id="status" class="form-control">
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        -->
                        <button type="button" class="btn btn-primary" onclick="saveProduct()">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

   <!-- Add/Edit Product Modal 
    <div class="modal fade" id="returnModal" tabindex="-1" role="dialog" aria-labelledby="returnModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="returnModalLabel">Return Purchase</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="returnForm">
                        <div class="form-group">
                            <label for="poID" class="form-label">PO ID</label>
                            <input type="text" class="form-control" id="poID" readonly>
                        </div>
                        <div class="form-group">
                            <label for="returnProduct">Product</label>
                            <select id="returnProduct" class="form-control" disabled>
                                <option value="">Loading...</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="returnQty">Quantity</label>
                            <input type="number" id="returnQty" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="returnDate">Return Date</label>
                            <input type="date" id="returnDate" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label for="reason" class="form-label">Reason</label>
                            <textarea class="form-control" id="reason" rows="3"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="saveReturn()">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    -->
    <script src="../assets/js/jquery-3.7.1.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/sales.js"></script>
</body>

</html>