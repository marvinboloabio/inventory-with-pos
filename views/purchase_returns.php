<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Management</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/products.css">
</head>

<body>
<div id="navbar-container"></div>
    <div class="container mt-5">
        <h2 class="mb-4">Purchase Returns</h2>
        <div class="d-flex justify-content-between mb-4">
            <input type="text" id="searchProducts" class="form-control search-bar" placeholder="Search Products">
            <button class="btn btn-primary" data-toggle="modal" data-target="#returnModal" onclick="clearForm()">Add
                Purchase Returns</button>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Return ID</th>
                        <th>Purchase Order ID</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Return Date</th>
                        <th>Reason</th>
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
                            <label for="returnUserID" class="form-label">User ID</label>
                            <input type="text" class="form-control" id="returnUserID" readonly>
                        </div>
                        <div class="form-group">
                            <label for="poID">PO ID</label>
                            <select id="poID" class="form-control">
                                <option value="">Loading...</option>
                            </select>
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

                        <div class="form-group">
                            <label for="reason" class="form-label">Reason</label>
                            <textarea class="form-control" id="reason" rows="3"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="saveReturn()">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

     <!-- Add/Edit Product Modal -->
     <div class="modal fade" id="replacedStatusModal" tabindex="-1" role="dialog" aria-labelledby="replacedStatusModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="replacedStatusModalLabel">Update status</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="replacedStatusForm">
                        <div class="form-group">
                            <label for="replacedReturnID" class="form-label">Return ID</label>
                            <input type="text" class="form-control" id="replacedReturnID" readonly>
                        </div>
                        <div class="form-group">
                            <label for="updatedByID" class="form-label">Updated By</label>
                            <input type="text" class="form-control" id="updatedByID" readonly>
                        </div>
                        <div class="form-group">
                            <label for="replacedDate">Replaced Date</label>
                            <input type="date" id="replacedDate" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label f3or="status" class="form-label">Status</label>
                            <input class="form-control" id="status" readonly>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="UpdateStatusToReplaced()">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/jquery-3.7.1.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/return.js"></script>
</body>

</html>