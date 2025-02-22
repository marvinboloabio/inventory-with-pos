let products = [];
$(document).ready(function () {
    fetchProducts();
    fetchSuppliers();
    fetchProductsDropdown();
    fetchProductsDropdownReturn();

    $("#navbar-container").load("../includes/navbar.php", function (response, status) {
        if (status === "error") {
            console.log("Failed to load navbar.");
        }
    });

    $('#searchProducts').on('keyup', function () {
        const searchValue = $(this).val().toLowerCase();
        const filteredProducts = products.filter(product =>
            product.status.toLowerCase().includes(searchValue)
        );
        renderProducts(filteredProducts);
    });

    $('#unitPrice , #qty ').on('input', calculate);

});

$('status').hide();
function calculate() {
    const value1 = parseFloat($('#unitPrice').val()) || 0;
    const value2 = parseFloat($('#qty').val()) || 0;
    const difference = value1 * value2;
    $('#totalPrice').val(difference);

}

function fetchSessionsHere() {
    $.ajax({
        url: "/inventory-system/api/check_session.php",
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function (response) {
            if (response.success) {
                console.log("UserID in field:", response.user_id);
                $("#userID").val(response.user_id);
            } else {
                alert("Session expired. Redirecting to login.");
                window.location.href = "../views/login.php";
            }
        }
    });
}

function fetchSessionsInReturnModal() {
    $.ajax({
        url: "/inventory-system/api/check_session.php",
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function (response) {
            if (response.success) {
                console.log("Return UserID in field:", response.user_id);
                $("#returnUserID").val(response.user_id);
            } else {
                alert("Session expired. Redirecting to login.");
                window.location.href = "../views/login.php";
            }
        }
    });
}

function updateToCancelledStatus(id) {
    if (confirm("Are you sure you want to change this purchase status to cancelled?")) {
        const purchase_ID = id;
        const statusCancelled = 'Cancelled';
        $.ajax({
            url: '/inventory-system/api/purchase.php',
            method: 'PUT',
            data: JSON.stringify({
                purchaseID: purchase_ID,
                statusReceived: statusCancelled
            }),
            contentType: 'application/json',
            success: function () {
                console.log("Sales updated successfully:", purchase_ID);
                alert('Purchase status updated successfully.');
                fetchProducts();
            },
            error: function (xhr, status, error) {
                console.error('Error updating supplier:', error);
                console.error('XHR response:', xhr.responseText); // Log the full response text from the server
                console.error('XHR response:', xhr.status); // Log the full response text from the server
                console.error('XHR status:', status);  // Log the status code (e.g., 404, 500)
                console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
            }
        });
    }

}

function updateToReceivedStatus(id) {
    if (confirm("Are you sure you want to change this purchase status to received?")) {
        const purchase_ID = id;
        const statusReceived = 'Received';
        $.ajax({
            url: '/inventory-system/api/purchase.php',
            method: 'PUT',
            data: JSON.stringify({
                purchaseID: purchase_ID,
                statusReceived: statusReceived
            }),
            contentType: 'application/json',
            success: function () {
                console.log("Sales updated successfully:", purchase_ID);
                alert('Purchase status updated successfully.');
                fetchProducts();
            },
            error: function (xhr, status, error) {
                console.error('Error updating supplier:', error);
                console.error('XHR response:', xhr.responseText); // Log the full response text from the server
                console.error('XHR response:', xhr.status); // Log the full response text from the server
                console.error('XHR status:', status);  // Log the status code (e.g., 404, 500)
                console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
            }
        });
    }
}

function fetchSuppliers() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/inventory-system/api/supplier.php',
            method: 'GET',
            success: function (data) {
                const suppliers = typeof data === 'string' ? JSON.parse(data) : data;
                const supplierDropdown = $('#supplier');
                supplierDropdown.empty();
                supplierDropdown.append('<option value="">Select Supplier</option>');
                suppliers.forEach(supplier => {
                    supplierDropdown.append(`<option value="${supplier.id}">${supplier.name}</option>`);
                });
                resolve(); // Resolve the Promise once data is populated
            },
            error: function (xhr, status, error) {
                console.error('Error fetching suppliers:', error);
                reject(error); // Reject the Promise in case of an error
            }
        });
    });
}

function fetchProductsDropdown() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/inventory-system/api/products.php',
            method: 'GET',
            success: function (data) {
                const suppliers = typeof data === 'string' ? JSON.parse(data) : data;
                const supplierDropdown = $('#product');
                supplierDropdown.empty();
                supplierDropdown.append('<option value="">Select Product</option>');
                suppliers.forEach(supplier => {
                    supplierDropdown.append(`<option value="${supplier.id}">${supplier.name}</option>`);
                });
                resolve(); // Resolve the Promise once data is populated
            },
            error: function (xhr, status, error) {
                console.error('Error fetching suppliers:', error);
                reject(error); // Reject the Promise in case of an error
            }
        });
    });
}

function fetchProductsDropdownReturn() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/inventory-system/api/products.php',
            method: 'GET',
            success: function (data) {
                const suppliers = typeof data === 'string' ? JSON.parse(data) : data;
                const supplierDropdown = $('#returnProduct');
                supplierDropdown.empty();
                supplierDropdown.append('<option value="">Select Product</option>');
                suppliers.forEach(supplier => {
                    supplierDropdown.append(`<option value="${supplier.id}">${supplier.name}</option>`);
                });
                resolve(); // Resolve the Promise once data is populated
            },
            error: function (xhr, status, error) {
                console.error('Error fetching suppliers:', error);
                reject(error); // Reject the Promise in case of an error
            }
        });
    });
}

function fetchProducts() {
    $.ajax({
        url: '/inventory-system/api/purchase.php',
        method: 'GET',
        success: function (data) {
            console.log('Raw server response:', data);
            let suppliersData = data;
            if (typeof data === 'string') {
                try {
                    suppliersData = JSON.parse(data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    return;
                }
            }
            products = suppliersData;  // Store the fetched suppliers in the global array
            renderProducts(suppliersData);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching products:', error);
            console.error('XHR response:', xhr.responseText); // Log the full response text from the server
            console.error('XHR status:', xhr.status);  // Log the status code (e.g., 404, 500)
            console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
        }
    });
}

function renderProducts(products) {
    const productTableBody = $('#productTableBody');
    productTableBody.empty();

    products.forEach((product) => {
        const receiveBtn = product.status === "Pending"
            ? `<button class="btn btn-sm btn-success" onclick="updateToReceivedStatus(${product.po_id})">Received</button>`
            : "";
        const returnButton = product.status === "Received"
            ? `<button class="btn btn-sm btn-warning" onclick="returnProduct(${product.po_id})">Return</button>`
            : "";
        const row = `
            <tr>
                <td>${product.po_id}</td>
                <td>${product.supplier_id}</td>
                <td>${product.product_id}</td>
                <td>${product.order_date}</td>
                <td>${product.quantity}</td>
                <td>${product.unit_price}</td>
                <td>${product.total_price}</td>
                <td>${product.status}</td>
                <td>
                   ${receiveBtn}
                   ${returnButton}
                    <button class="btn btn-sm btn-warning" style ="display:none" onclick="editProduct(${product.po_id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="updateToCancelledStatus(${product.po_id})">Cancel</button>
                </td>
            </tr>
        `;

        productTableBody.append(row);
    });
}

function clearForm() {
    $('#statusDiv').hide();
    $('#purchaseId').val('');
    $('#productForm')[0].reset();
    fetchSessionsHere();
}

function createSupplier(supplierData) {
    if (confirm("Are you sure you want to create this purchase order?")) {
        $.ajax({
            url: '/inventory-system/api/purchase.php',
            method: 'POST',
            data: JSON.stringify(supplierData),
            contentType: 'application/json',
            success: function (response) {
                console.log("Purchase created successfully:", response);
                $('#productModal').modal('hide');
                alert('Purchase order updated successfully.');
                fetchProducts();
            },
            error: function (xhr, status, error) {
                console.error('Error creating supplier:', error);
                console.error('Error saving product:', xhr.responseText); // Log full response
                console.error('Status:', status);
                console.error('Error:', error);
            }
        });
    }
}

function updateSupplier(supplierData) {
    $.ajax({
        url: '/inventory-system/api/purchase.php',
        method: 'PUT',
        data: JSON.stringify(supplierData),
        contentType: 'application/json',
        success: function () {
            console.log("Sales updated successfully:", supplierData);
            $('#productModal').modal('hide');
            alert('Purchase updated successfully.');
            fetchProducts();
        },
        error: function (xhr, status, error) {
            console.error('Error updating supplier:', error);
            console.error('Error saving product:', xhr.responseText); // Log full response
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}

function saveProduct() {

    const supplierData = {
        userID: $('#userID').val(),
        supplier: $('#supplier').val(),
        product: $('#product').val(),
        orderDate: $('#orderDate').val(),
        qty: $('#qty').val(),
        unitPrice: $('#unitPrice').val(),
        totalPrice: $('#totalPrice').val(),
        status: $('#status').val()
    };

    if (!supplierData.userID || !supplierData.supplier || !supplierData.product || !supplierData.orderDate || !supplierData.qty || !supplierData.unitPrice || !supplierData.totalPrice || !supplierData.status) {
        alert('Please fill all fields');
        return;
    }

    const id = $('#purchaseId').val();
    if (id) {
        supplierData.poID = id;
        updateSupplier(supplierData);
    } else {
        createSupplier(supplierData);
    }
    console.log("Sales object", supplierData);
}

function saveReturn() {
    $.ajax({
        url: '/inventory-system/api/return.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            returnUserID: $('#returnUserID').val(),
            poID: $('#poID').val(),
            returnProduct: $('#returnProduct').val(),
            returnQty: $('#returnQty').val(),
            returnDate: $('#returnDate').val(),
            reason: $('#reason').val()
        }),
        success: function (response) {
            alert('Return saved successfully.');
            console.log('Raw Returns server response:', response);
        },
        error: function (xhr, status, error) {
            console.error('Error saving product:', xhr.responseText); // Log full response
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}

async function editProduct(id) {
    const product = products.find((p) => p.po_id == id);
    if (!product) {
        console.error('Product not found for ID:', id);
        return;
    }

    console.log('Product object:', product);

    // Populate form fields
    $('#purchaseId').val(product.po_id);
    $('#supplier').val(product.supplier_id);
    $('#product').val(product.product_id);
    $('#orderDate').val(product.order_date);
    $('#qty').val(product.quantity);
    $('#unitPrice').val(product.unit_price);
    $('#totalPrice').val(product.total_price);
    $('#status').val(product.status);

    if (product.status === "Received") {
        $('#cancelOpt').show();
        $('#receiveOpt').hide();

    } else {
        $('#cancelOpt').hide();
        $('#receiveOpt').show();
    }

    $('#statusDiv').show();
    $('#productModal').modal('show');

}

function returnProduct(id) {
    fetchSessionsInReturnModal();
    const product = products.find((p) => p.po_id == id);
    if (!product) {
        console.error('Product not found for ID:', id);
        return;
    }

    console.log('Product object:', product);

    // Populate form fields
    $('#poID').val(product.po_id);
    $('#returnProduct').val(product.product_id);
    $('#returnModal').modal('show');

}



