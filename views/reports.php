<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports</title>
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
</head>

<body>
    <!-- navbar from navbar.php -->
    <div id="navbar-container"></div>
    <!-- select reports dropdown -->
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <label for="selectReports" class="form-label fw-bold"
                    style="font-size: 1.2rem; color: #333; border-bottom: 3px solid #007bff; padding-bottom: 8px;">Select
                    Report</label>
                <select id="selectReports" class="form-select form-select-lg mb-4 shadow-sm"
                    style="font-size: 1.1rem; padding: 12px; border-radius: 8px; transition: border-color 0.3s;">
                    <option disabled selected>- Select Report -</option>
                    <option value="Sales">Sales Reports</option>
                    <option value="Sales Transactions">Sales Transactions Report</option>
                    <option value="Inventory">Inventory Reports</option>
                    <option value="Purchase">Purchase Order Reports</option>
                    <option value="Return">Return To Supplier Reports</option>
                </select>
            </div>
        </div>
    </div>

    <div class="container mt-5" id="salesCont" style="display:none">
        <h2 class="mb-4">Sales Report</h2>
        <div class="mb-3">
            <label for="reportType" class="form-label">Select Report Type:</label>
            <select id="reportType" class="form-select w-25">
                <option value="daily">Daily Sales</option>
                <option value="monthly">Monthly Sales</option>
                <option value="yearly">Yearly Sales</option>
            </select>
        </div>

        <div class="mb-3">
            <button id="exportPDF" class="btn btn-danger me-2">Export to PDF</button>
            <button id="exportExcel" class="btn btn-success me-2">Export to Excel</button>
            <button id="exportCSV" class="btn btn-primary">Export to CSV</button>
        </div>

        <table id="salesReport" class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Date/Month/Year</th>
                    <th>Total Sales</th>
                </tr>
            </thead>
            <tbody id="salesTbody">
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>

    <div class="container mt-5" id="inventoryCont" style="display:none">
        <h2 class="mb-4">Inventory Reports</h2>
        <div class="mb-3">
            <label for="reportTypeInventory" class="form-label">Select Report Type:</label>
            <select id="reportTypeInventory" class="form-select w-25">
                <option value="Remaining">Remaining Stocks</option>
                <option value="Out">Out of Stock Products</option>
            </select>
        </div>

        <div class="mb-3">
            <button id="exportPDFInventory" class="btn btn-danger me-2">Export to PDF</button>
            <button id="exportExcelInventory" class="btn btn-success me-2">Export to Excel</button>
            <button id="exportCSVInventory" class="btn btn-primary">Export to CSV</button>
        </div>

        <table id="inventoryReport" class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th style="display:none">User ID</th>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Supplier</th>
                    <th>UOM</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Reorder Level</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>

    <div class="container mt-5" id="salesTransactionCon" style="display:none">
        <h2 class="mb-4">Sales Transaction Reports</h2>
        <div class="mb-3">
            <label for="dateFromSalesTransaction" class="form-label">Date From:</label>
            <input type="date" id="dateFromSalesTransaction">
            <label for="dateToSalesTransaction" class="form-label">Date To:</label>
            <input type="date" id="dateToSalesTransaction">
        </div>

        <div class="mb-3">
            <button id="exportPDFSalesTransaction" class="btn btn-danger me-2">Export to PDF</button>
            <button id="exportExcelSalesTransaction" class="btn btn-success me-2">Export to Excel</button>
            <button id="exportCSVSalesTransaction" class="btn btn-primary">Export to CSV</button>
        </div>

        <table id="salesTransactionReport" class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Transaction Date</th>
                    <th>Total Amount</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>

    <div class="container mt-5" id="purchaseOrderCon" style="display:none">
        <h2 class="mb-4">Purchase Order Report</h2>
        <div class="mb-3">
            <label for="dateFromPurchaseOrder" class="form-label">Date From:</label>
            <input type="date" id="dateFromPurchaseOrder">
            <label for="dateToPurchaseOrder" class="form-label">Date To:</label>
            <input type="date" id="dateToPurchaseOrder">
        </div>

        <div class="mb-3">
            <button id="exportPDFPurchaseOrder" class="btn btn-danger me-2">Export to PDF</button>
            <button id="exportExcelPurchaseOrder" class="btn btn-success me-2">Export to Excel</button>
            <button id="exportCSVPurchaseOrder" class="btn btn-primary">Export to CSV</button>
        </div>

        <table id="purchaseOrderReport" class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Supplier</th>
                    <th>Product</th>
                    <th>Order Date</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>

    <div class="container mt-5" id="returnCon" style="display:none">
        <h2 class="mb-4">Return To Supplier Reports</h2>
        <div class="mb-3">
            <label for="dateFromReturn" class="form-label">Date From:</label>
            <input type="date" id="dateFromReturn">
            <label for="dateToReturn" class="form-label">Date To:</label>
            <input type="date" id="dateToReturn">
        </div>

        <div class="mb-3">
            <button id="exportPDFReturn" class="btn btn-danger me-2">Export to PDF</button>
            <button id="exportExcelReturn" class="btn btn-success me-2">Export to Excel</button>
            <button id="exportCSVReturn" class="btn btn-primary">Export to CSV</button>
        </div>

        <table id="returnReport" class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>PO ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Return Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>

    <script src="../assets/js/jquery-3.7.1.min.js"></script>
    <script src = "../assets/js/report.js"></script>
    <script src="../libs/xlsx.full.min.js"></script>
    <script src="../libs/jspdf.umd.min.js"></script>
    <script src="../libs/jspdf.plugin.autotable.min.js"></script>

</body>
</html>