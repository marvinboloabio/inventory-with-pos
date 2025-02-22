$(document).ready(function () {

    $("#navbar-container").load("../includes/navbar.php", function (response, status) {
        if (status === "error") {
            console.log("Failed to load navbar.");
        }
    });

    $('#selectReports').on('change', function () {
        if ($(this).val() === 'Sales') {
            $('#salesCont').show();
            $('#inventoryCont').hide();
            $('#salesTransactionCon').hide();
            $('#purchaseOrderCon').hide();
            $('#returnCon').hide();
        } else if ($(this).val() === 'Inventory') {
            $('#inventoryCont').show();
            $('#salesCont').hide();
            $('#salesTransactionCon').hide();
            $('#purchaseOrderCon').hide();
            $('#returnCon').hide();
        } else if ($(this).val() === 'Sales Transactions') {
            $('#salesTransactionCon').show();
            $('#inventoryCont').hide();
            $('#salesCont').hide();
            $('#purchaseOrderCon').hide();
            $('#returnCon').hide();
        } else if ($(this).val() === 'Purchase') {
            $('#salesTransactionCon').hide();
            $('#inventoryCont').hide();
            $('#salesCont').hide();
            $('#returnCon').hide();
            $('#purchaseOrderCon').show();
        } else if ($(this).val() === 'Return') {
            $('#salesTransactionCon').hide();
            $('#inventoryCont').hide();
            $('#salesCont').hide();
            $('#returnCon').show();
            $('#purchaseOrderCon').hide();
        }
    });

    loadSalesData('daily'); // Load default sales report
    loadInventoryData('Remaining');
    // Set default date to today's date (YYYY-MM-DD)
    // Start of today (00:00:00)
    //const dateFrom = $('#dateFromSalesTransaction').val(new Date().toISOString().split('T')[0]);

    // End of today (23:59:59)
    //const dateTo = $('#dateToSalesTransaction').val(new Date(new Date().setHours(23, 59, 59, 999)).toISOString().split('T')[0]);
    //loadSalesTransactionData(dateFrom, dateTo);

    $("#reportType").change(function () {
        let type = $(this).val();
        loadSalesData(type);
    });

    $("#reportTypeInventory").change(function () {
        let type = $(this).val();
        loadInventoryData(type);
    });

    $("#dateFromSalesTransaction,#dateToSalesTransaction").change(function () {
        let dateFrom = $('#dateFromSalesTransaction').val();
        let dateTo = $('#dateToSalesTransaction').val();
        console.log(dateFrom);
        console.log(dateTo);
        loadSalesTransactionData(dateFrom, dateTo);
    });

    $("#dateFromPurchaseOrder,#dateToPurchaseOrder").change(function () {
        let dateFrom = $('#dateFromPurchaseOrder').val();
        let dateTo = $('#dateToPurchaseOrder').val();
        console.log(dateFrom);
        console.log(dateTo);
        loadPurchaseOrderData(dateFrom, dateTo);
    });

    $("#dateFromReturn,#dateToReturn").change(function () {
        let dateFrom = $('#dateFromReturn').val();
        let dateTo = $('#dateToReturn').val();
        console.log(dateFrom);
        console.log(dateTo);
        loadReturnData(dateFrom, dateTo);
    });

    function loadSalesData(type) {
        $.ajax({
            url: "/inventory-system/api/get_sales_report.php",
            type: "GET",
            data: { type: type },
            success: function (response) {
                let data = JSON.parse(response);
                console.log('Sales Data:', data);

                let tableRows = "";
                if (data.length === 0) {
                    tableRows = `<tr><td colspan="2" class="text-center text-danger">No sales data available</td></tr>`;
                } else {
                    data.forEach(row => {
                        tableRows += `<tr>
                    <td>${row.date || getMonthName(row.month) || row.year}</td>
                    <td class="text-end">₱${parseFloat(row.total_sales).toLocaleString()}</td>
                </tr>`;
                    });
                }
                $("#salesReport tbody").html(tableRows);
            }
        });
    }

    function loadInventoryData(type) {
        $.ajax({
            url: "/inventory-system/api/get_inventory_report.php",
            type: "GET",
            data: { type: type },
            success: function (response) {
                console.log('Inventory Data:', response); // Log the response to inspect its structure

                let tableRows = "";
                // Check if the response is an array and has data
                if (Array.isArray(response) && response.length === 0) {
                    tableRows = `<tr><td colspan="2" class="text-center text-danger">No inventory data available</td></tr>`;
                } else {
                    // Iterate over the response (which is an array)
                    response.forEach(row => {
                        tableRows += `<tr>
                <td>${row.id}</td>
                <td>${row.sku}</td>
                <td>${row.name}</td>
                <td>${row.supplier}</td>
                <td>${row.uom}</td>
                <td>${row.price}</td>
                <td>${row.stock_quantity}</td>
                <td>${row.reorder_level}</td>
                <td>${row.status}</td>

            </tr>`;
                    });
                }
                $("#inventoryReport tbody").html(tableRows);
            }
        });
    }

    function loadSalesTransactionData(from, to) {
        console.log("Sending Request:", { from, to }); // Debugging
        $.ajax({
            url: `/inventory-system/api/get_sales_transaction_report.php?from=${from}&to=${to}`,
            type: "GET",  // Stay with GET for query params
            contentType: "application/json", // This is fine
            dataType: "json", // Expect JSON response
            success: function (response) {
                console.log('Sales Transaction Data:', response);
                let tableRows = "";
                if (!response || !Array.isArray(response) || response.length === 0) {
                    tableRows = '<tr><td colspan="9" class="text-center text-danger">No sales transactions found</td></tr>';
                } else {
                    response.forEach(row => {
                        tableRows += `<tr>
                            <td>${row.sales_transaction_id || "N/A"}</td>
                            <td>${row.transaction_date || "N/A"}</td>
                            <td>${row.total_amount || "N/A"}</td>
                            <td>${row.customer_id || "N/A"}</td>
                            <td>${row.product_id || "N/A"}</td>
                            <td>${row.quantity || "N/A"}</td>
                            <td>${row.unit_price || "N/A"}</td>
                            <td>${row.total_price || "N/A"}</td>
                            <td>${row.status || "N/A"}</td>
                        </tr>`;
                    });
                }
                $("#salesTransactionReport tbody").html(tableRows);
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);
                console.log("Response Text:", xhr.responseText); // Debugging: Log full response
            }
        });
    }

    function loadPurchaseOrderData(from, to) {
        console.log("Sending Request:", { from, to }); // Debugging
        $.ajax({
            url: `/inventory-system/api/get_purchase_order_report.php?from=${from}&to=${to}`,
            type: "GET",  // Stay with GET for query params
            contentType: "application/json", // This is fine
            dataType: "json", // Expect JSON response
            success: function (response) {
                console.log('Purchase Order Data:', response);
                let tableRows = "";
                if (!response || !Array.isArray(response) || response.length === 0) {
                    tableRows = '<tr><td colspan="9" class="text-center text-danger">No sales transactions found</td></tr>';
                } else {
                    response.forEach(row => {
                        tableRows += `<tr>
                            <td>${row.po_id || "N/A"}</td>
                            <td>${row.supplier_id || "N/A"}</td>
                            <td>${row.product_id || "N/A"}</td>
                            <td>${row.order_date || "N/A"}</td>
                            <td>${row.quantity || "N/A"}</td>
                            <td>${row.unit_price || "N/A"}</td>
                            <td>${row.total_price || "N/A"}</td>
                            <td>${row.status || "N/A"}</td>
                        </tr>`;
                    });
                }
                $("#purchaseOrderReport tbody").html(tableRows);
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);
                console.log("Response Text:", xhr.responseText); // Debugging: Log full response
            }
        });
    }

    function loadReturnData(from, to) {
        console.log("Sending Request:", { from, to }); // Debugging
        $.ajax({
            url: `/inventory-system/api/get_return_report.php?from=${from}&to=${to}`,
            type: "GET",  // Stay with GET for query params
            contentType: "application/json", // This is fine
            dataType: "json", // Expect JSON response
            success: function (response) {
                console.log('Returned Data:', response);
                let tableRows = "";
                if (!response || !Array.isArray(response) || response.length === 0) {
                    tableRows = '<tr><td colspan="9" class="text-center text-danger">No sales transactions found</td></tr>';
                } else {
                    response.forEach(row => {
                        tableRows += `<tr>
                            <td>${row.return_id || "N/A"}</td>
                             <td>${row.po_id || "N/A"}</td>
                            <td>${row.product_id || "N/A"}</td>
                            <td>${row.quantity || "N/A"}</td>
                            <td>${row.return_date || "N/A"}</td>
                            <td>${row.reason || "N/A"}</td>
                            <td>${row.status || "N/A"}</td>
                        </tr>`;
                    });
                }
                $("#returnReport tbody").html(tableRows);
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);
                console.log("Response Text:", xhr.responseText); // Debugging: Log full response
            }
        });
    }

    function getMonthName(monthNumber) {
        if (!monthNumber) return "";
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    $("#exportPDFInventory").click(function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        // Add company logo (aligned properly)
        const logoPath = "../assets/images/company-high-resolution-logo.png";
        doc.addImage(logoPath, "PNG", 20, 10, 40, 20); // Adjusted logo size & position

        // Determine report type
        let reportType = $("#reportTypeInventory").val();
        let reportTitle = "Inventory Report";

        if (reportType === "Remaining") reportTitle = "Remaining Stocks Report";
        else if (reportType === "Out") reportTitle = "Out of Stock Products Report";

        // Title & Date Styling
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(reportTitle, 105, 18, { align: "center" }); // Center title

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        let currentDate = new Date().toLocaleString();
        doc.text(`Generated on: ${currentDate}`, 105, 26, { align: "center" });

        // Extract Table Data
        let rows = [];
        $("#inventoryReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();
                row.push(cellText);
            });
            rows.push(row);
        });

        // AutoTable Styling (Adjusted column widths)
        if (typeof doc.autoTable === "function") {
            doc.autoTable({
                startY: 40,
                head: [["ID", "SKU", "Name", "Supplier", "UOM", "Price", "Stock", "Reorder Level", "Status"]],
                body: rows,
                theme: "striped",
                styles: {
                    fontSize: 10,
                    cellPadding: 5,
                    halign: "center",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [45, 137, 255],
                    textColor: 255,
                    fontStyle: "bold",
                },
                // Manually set column widths
                columnStyles: {
                    0: { cellWidth: 15 },
                    1: { cellWidth: 20 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 25 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 20 },
                    6: { cellWidth: 20 },
                    7: { cellWidth: 30 },
                    8: { cellWidth: 25 },
                },
                margin: { top: 50, left: 3, right: 0, bottom: 15 }, // Adjusted margins
            });

            // Footer: Page Numbering
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: "right" });
            }

            // Save the PDF with a dynamic filename
            let fileName = `inventory_report_${reportType}_${new Date().toISOString().split("T")[0]}.pdf`;
            doc.save(fileName);
        } else {
            console.error("autoTable plugin is not loaded properly.");
        }
    });

    // Export to CSV
    $("#exportCSVInventory").click(function () {
        let csvContent = "ID,SKU,Name,Supplier,UOM,Price,Stock,Reorder Level,Status\n"; // Header row

        $("#inventoryReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();

                // Escape commas and newline characters by wrapping the cell text in double quotes
                if (cellText.includes(",") || cellText.includes("\n")) {
                    cellText = `"${cellText.replace(/"/g, '""')}"`; // Escape double quotes as well
                }

                row.push(cellText);
            });
            csvContent += row.join(",") + "\n"; // Join each row with commas and add a new line
        });

        // Create a Blob from the CSV content with UTF-8 BOM
        const BOM = "\ufeff";  // UTF-8 BOM
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a hidden link to trigger the download
        const link = document.createElement("a");
        if (navigator.msSaveBlob) { // For IE
            navigator.msSaveBlob(blob, "inventory_report.csv");
        } else {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "inventory_report.csv");
            link.click(); // Trigger the download
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    });

    $("#exportExcelInventory").click(function () {
        let table = document.getElementById("inventoryReport");
        let ws = XLSX.utils.table_to_sheet(table);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");
        XLSX.writeFile(wb, "inventory_report.xlsx");
    });

    $("#exportPDFSalesTransaction").click(function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        // Add company logo (aligned properly)
        const logoPath = "../assets/images/company-high-resolution-logo.png";
        doc.addImage(logoPath, "PNG", 20, 10, 40, 20); // Adjusted logo size & position

        // Determine report type
        let reportType = $("#reportTypeInventory").val();
        let reportTitle = "Sales Transaction Report";
        let dateFrom = $('#dateFromSalesTransaction').val();
        let dateTo = $('#dateToSalesTransaction').val();
        // Title & Date Styling
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(reportTitle, 105, 18, { align: "center" }); // Center title

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        let currentDate = new Date().toLocaleString();
        doc.text(`From: ${dateFrom} - To: ${dateTo}`, 105, 26, { align: "center" });

        // Extract Table Data
        let rows = [];
        $("#salesTransactionReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();
                row.push(cellText);
            });
            rows.push(row);
        });

        // AutoTable Styling (Adjusted column widths)
        if (typeof doc.autoTable === "function") {
            doc.autoTable({
                startY: 40,
                head: [["ID", "Date", "Total Amount", "Customer", "Product", "Qty", "Price", "Total Price", "Status"]],
                body: rows,
                theme: "striped",
                styles: {
                    fontSize: 10,
                    cellPadding: 5,
                    halign: "center",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [45, 137, 255],
                    textColor: 255,
                    fontStyle: "bold",
                },
                // Manually set column widths
                columnStyles: {
                    0: { cellWidth: 15 }, // ID
                    1: { cellWidth: 20 }, // SKU
                    2: { cellWidth: 25 }, // Name
                    3: { cellWidth: 28 }, // Supplier
                    4: { cellWidth: 25 }, // UOM
                    5: { cellWidth: 15 }, // Price
                    6: { cellWidth: 20 }, // UOM
                    7: { cellWidth: 25 }, // Stock
                    8: { cellWidth: 30 }, // Reorder Level
                },
                margin: { top: 50, left: 3, right: 0, bottom: 15 }, // Adjusted margins
            });

            // Footer: Page Numbering
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: "right" });
            }

            // Save the PDF with a dynamic filename
            let fileName = `sales_transaction_report_${reportType}_${new Date().toISOString().split("T")[0]}.pdf`;
            doc.save(fileName);
        } else {
            console.error("autoTable plugin is not loaded properly.");
        }
    });

    $("#exportCSVSalesTransaction").click(function () {
        let csvContent = "ID,Date,Total Amount,Customer,Product,Quantity,Total Price,Unit Price,Status\n"; // Header row

        $("#salesTransactionReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();

                // Escape commas and newline characters by wrapping the cell text in double quotes
                if (cellText.includes(",") || cellText.includes("\n")) {
                    cellText = `"${cellText.replace(/"/g, '""')}"`; // Escape double quotes as well
                }

                row.push(cellText);
            });
            csvContent += row.join(",") + "\n"; // Join each row with commas and add a new line
        });

        // Create a Blob from the CSV content with UTF-8 BOM
        const BOM = "\ufeff";  // UTF-8 BOM
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a hidden link to trigger the download
        const link = document.createElement("a");
        if (navigator.msSaveBlob) { // For IE
            navigator.msSaveBlob(blob, "sales_transaction_report.csv");
        } else {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "sales_transaction_report.csv");
            link.click(); // Trigger the download
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    });

    $("#exportExcelSalesTransaction").click(function () {
        let table = document.getElementById("salesTransactionReport");
        let ws = XLSX.utils.table_to_sheet(table);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");
        XLSX.writeFile(wb, "sales_transaction_report.xlsx");
    });


    $("#exportPDFPurchaseOrder").click(function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        // Add company logo (aligned properly)
        const logoPath = "../assets/images/company-high-resolution-logo.png";
        doc.addImage(logoPath, "PNG", 20, 10, 40, 20); // Adjusted logo size & position

        // Determine report type
        let reportType = $("#reportTypeInventory").val();
        let reportTitle = "Purchase Order Report";
        let dateFrom = $('#dateFromPurchaseOrder').val();
        let dateTo = $('#dateToPurchaseOrder').val();
        // Title & Date Styling
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(reportTitle, 105, 18, { align: "center" }); // Center title

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(`From: ${dateFrom} - To: ${dateTo}`, 105, 26, { align: "center" });

        // Extract Table Data
        let rows = [];
        $("#purchaseOrderReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();
                row.push(cellText);
            });
            rows.push(row);
        });

        // AutoTable Styling (Adjusted column widths)
        if (typeof doc.autoTable === "function") {
            doc.autoTable({
                startY: 40,
                head: [["ID", "Supplier", "Product", "Order Date", "Quantity", "Unit Price", "Total Price", "Status"]],
                body: rows,
                theme: "striped",
                styles: {
                    fontSize: 10,
                    cellPadding: 5,
                    halign: "center",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [45, 137, 255],
                    textColor: 255,
                    fontStyle: "bold",
                },
                // Manually set column widths
                columnStyles: {
                    0: { cellWidth: 15 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 25 },
                    6: { cellWidth: 30 },
                    7: { cellWidth: 30 },
                },
                margin: { top: 50, left: 3, right: 0, bottom: 15 }, // Adjusted margins
            });

            // Footer: Page Numbering
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: "right" });
            }

            // Save the PDF with a dynamic filename
            let fileName = `purchase_order_report_${reportType}_${new Date().toISOString().split("T")[0]}.pdf`;
            doc.save(fileName);
        } else {
            console.error("autoTable plugin is not loaded properly.");
        }
    });

    $("#exportCSVPurchaseOrder").click(function () {
        let csvContent = "ID,Supplier,Product,Order Date,Quantity,Unit Price,Total Price,Status\n"; // Header row

        $("#purchaseOrderReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();

                // Escape commas and newline characters by wrapping the cell text in double quotes
                if (cellText.includes(",") || cellText.includes("\n")) {
                    cellText = `"${cellText.replace(/"/g, '""')}"`; // Escape double quotes as well
                }

                row.push(cellText);
            });
            csvContent += row.join(",") + "\n"; // Join each row with commas and add a new line
        });

        // Create a Blob from the CSV content with UTF-8 BOM
        const BOM = "\ufeff";  // UTF-8 BOM
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a hidden link to trigger the download
        const link = document.createElement("a");
        if (navigator.msSaveBlob) { // For IE
            navigator.msSaveBlob(blob, "purchase_order_report.csv");
        } else {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "purchase_order_report.csv");
            link.click(); // Trigger the download
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    });

    $("#exportExcelPurchaseOrder").click(function () {
        let table = document.getElementById("purchaseOrderReport");
        let ws = XLSX.utils.table_to_sheet(table);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Purchase Order Report");
        XLSX.writeFile(wb, "purchase_order_report.xlsx");
    });


    $("#exportPDFReturn").click(function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        // Add company logo (aligned properly)
        const logoPath = "../assets/images/company-high-resolution-logo.png";
        doc.addImage(logoPath, "PNG", 20, 10, 40, 20); // Adjusted logo size & position

        let reportTitle = "Return To Supplier Report";
        let dateFrom = $('#dateFromReturn').val();
        let dateTo = $('#dateToReturn').val();
        // Title & Date Styling
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(reportTitle, 105, 18, { align: "center" }); // Center title

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(`From: ${dateFrom} - To: ${dateTo}`, 105, 26, { align: "center" });

        // Extract Table Data
        let rows = [];
        $("#returnReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();
                row.push(cellText);
            });
            rows.push(row);
        });

        // AutoTable Styling (Adjusted column widths)
        if (typeof doc.autoTable === "function") {
            doc.autoTable({
                startY: 40,
                head: [["ID", "PO ID", "Product", "Quantity", "Return Date", "Reason", "Status"]],
                body: rows,
                theme: "striped",
                styles: {
                    fontSize: 10,
                    cellPadding: 5,
                    halign: "center",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [45, 137, 255],
                    textColor: 255,
                    fontStyle: "bold",
                },
                // Manually set column widths
                columnStyles: {
                    0: { cellWidth: 15 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 30 },
                    5: { cellWidth: 30 },
                    6: { cellWidth: 30 },
                },
                margin: { top: 50, left: 12, right: 0, bottom: 15 }, // Adjusted margins
            });

            // Footer: Page Numbering
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: "right" });
            }
            let dateFrom = $('#dateFromReturn').val();
            let dateTo = $('#dateToReturn').val();
            // Save the PDF with a dynamic filename
            let fileName = `return_to_supplier_report_from_${dateFrom}_to_${dateTo}_generated_on_${new Date().toISOString().split("T")[0]}.pdf`;
            doc.save(fileName);
        } else {
            console.error("autoTable plugin is not loaded properly.");
        }
    });

    $("#exportCSVReturn").click(function () {
        let csvContent = "ID,PO ID,Product,Quantity,Return Date,Reason,Status\n"; // Header row

        $("#returnReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();

                // Escape commas and newline characters by wrapping the cell text in double quotes
                if (cellText.includes(",") || cellText.includes("\n")) {
                    cellText = `"${cellText.replace(/"/g, '""')}"`; // Escape double quotes as well
                }

                row.push(cellText);
            });
            csvContent += row.join(",") + "\n"; // Join each row with commas and add a new line
        });

        // Create a Blob from the CSV content with UTF-8 BOM
        const BOM = "\ufeff";  // UTF-8 BOM
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a hidden link to trigger the download
        const link = document.createElement("a");
        if (navigator.msSaveBlob) { // For IE
            navigator.msSaveBlob(blob, "return_to_supplier_report.csv");
        } else {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "return_to_supplier_report.csv");
            link.click(); // Trigger the download
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    });

    $("#exportExcelReturn").click(function () {
        let table = document.getElementById("returnReport");
        let ws = XLSX.utils.table_to_sheet(table);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Return To Supplier Report");
        XLSX.writeFile(wb, "return_to_supplier_report.xlsx");
    });

    // Export to PDF
    $("#exportPDF").click(function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        // Add company logo (aligned properly)
        const logoPath = "../assets/images/company-high-resolution-logo.png";
        doc.addImage(logoPath, "PNG", 20, 10, 40, 20); // Adjusted logo size & position

        // Determine report type
        let reportType = $("#reportType").val();
        let reportTitle = "Sales Report";

        if (reportType === "daily") reportTitle = "Daily Sales Report";
        else if (reportType === "monthly") reportTitle = "Monthly Sales Report";
        else if (reportType === "yearly") reportTitle = "Yearly Sales Report";

        // Title & Date Styling
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(reportTitle, 105, 18, { align: "center" }); // Center title

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        let currentDate = new Date().toLocaleString();
        doc.text(`Generated on: ${currentDate}`, 105, 26, { align: "center" });

        // Extract Table Data
        let rows = [];
        $("#salesReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();
                if (index === 1) {
                    cellText = parseFloat(cellText.replace(/[^\d.-]/g, '')).toLocaleString();
                }
                row.push(cellText);
            });
            rows.push(row);
        });

        // AutoTable Styling (Wider table)
        if (typeof doc.autoTable === "function") {
            doc.autoTable({
                startY: 40,
                head: [["Date / Month / Year", "Total Sales"]],
                body: rows,
                theme: "striped",
                styles: {
                    fontSize: 10,
                    cellPadding: 5,
                    halign: "center",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [45, 137, 255],
                    textColor: 255,
                    fontStyle: "bold",
                },
                columnStyles: {
                    0: { cellWidth: 90 }, // Wider columns
                    1: { cellWidth: 90 },
                },
                margin: { top: 50, left: 15, right: 15 }, // Adjusted margins
            });

            // Footer: Page Numbering
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
            }

            // Save the PDF with a dynamic filename
            let fileName = `sales_report_${reportType}_${new Date().toISOString().split("T")[0]}.pdf`;
            doc.save(fileName);
        } else {
            console.error("autoTable plugin is not loaded properly.");
        }
    });

    // Export to Excel
    $("#exportExcel").click(function () {
        let table = document.getElementById("salesReport");
        let ws = XLSX.utils.table_to_sheet(table);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
        XLSX.writeFile(wb, "sales_report.xlsx");
    });

    // Export to CSV
    $("#exportCSV").click(function () {
        let csvContent = "Date/Month/Year,Total Sales\n"; // Header row

        $("#salesReport tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (index) {
                let cellText = $(this).text().trim();
                if (index === 1) { // Total sales column
                    // Format the number as currency or with commas
                    cellText = parseFloat(cellText.replace(/[^\d.-]/g, '')).toLocaleString();
                }
                row.push(cellText);
            });
            csvContent += row.join(",") + "\n"; // Join each row with commas and add a new line
        });

        // Create a hidden link to trigger download
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sales_report.csv");
        link.click(); // Trigger the download
    });
});