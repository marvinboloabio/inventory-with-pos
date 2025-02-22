let products = [];
let updatedByValue = 0;
$(document).ready(function () {
    fetchProducts();
    fetchProductsDropdown();
    fetchProductsDropdownReturn();

    $('#searchProducts').on('keyup', function () {
        const searchValue = $(this).val().toLowerCase();
        const filteredProducts = products.filter(product =>
            product.status.toLowerCase().includes(searchValue)
        );
        renderProducts(filteredProducts);
    });

    $("#navbar-container").load("../includes/navbar.php", function (response, status) {
        if (status === "error") {
            console.log("Failed to load navbar.");
        }
    });
    
    $('#poID').on('change', function () {
        const poIDValue = $(this).val();
        console.log('dropdown value',poIDValue);
        fetchPOByID(poIDValue);
    });
});

function fetchPOByID(poID) {
    console.log('parameter value',poID);
    $.ajax({
        url: '/inventory-system/api/purchase.php',
        method: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({
            poID: poID,
        }),
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
            product = suppliersData.find((s) => s.po_id == poID);
            $('#returnProduct').val(product.product_id);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching products:', error);
            console.error('XHR response:', xhr.responseText); // Log the full response text from the server
            console.error('XHR status:', xhr.status);  // Log the status code (e.g., 404, 500)
            console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
        }
    });
}

function fetchPOID() {
    $.ajax({
        url: '/inventory-system/api/purchase.php',
        method: 'GET',
        success: function (data) {
            const suppliers = typeof data === 'string' ? JSON.parse(data) : data;
            const supplierDropdown = $('#poID');
            supplierDropdown.empty();
            suppliers.forEach(supplier => {
                supplierDropdown.append(`<option value="${supplier.po_id}">PO ID:${supplier.po_id} - Product ID:${supplier.product_id} - Order date:${supplier.order_date} - Qty:${supplier.quantity}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching products:', error);
            console.error('XHR response:', xhr.responseText); // Log the full response text from the server
            console.error('XHR status:', xhr.status);  // Log the status code (e.g., 404, 500)
            console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
        }
    });
}

function fetchSessionsInReplaceModal() {
    $.ajax({
        url: "/inventory-system/api/check_session.php",
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function (response) {
            if (response.success) {
                console.log("UserID in field:", response.user_id);
                $("#updatedByID").val(response.user_id);
                updatedByValue = response.user_id;
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
                console.log("UserID in field:", response.user_id);
                $("#returnUserID").val(response.user_id);
            } else {
                alert("Session expired. Redirecting to login.");
                window.location.href = "../views/login.php";
            }
        }
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
                supplierDropdown.append('<option value=""></option>');
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


function renderProducts(products) {
    const productTableBody = $('#productTableBody');
    productTableBody.empty();

    products.forEach((product) => {
        const replaceButton = product.status === "Replaced"
        ? ""
        : ` <button class="btn btn-sm btn-primary" onclick="editReturnStatusToReplaced(${product.return_id})">Replaced</button>`;
        const row = `
            <tr>
                <td>${product.return_id}</td>
                <td>${product.po_id}</td>
                <td>${product.product_id}</td>
                <td>${product.quantity}</td>
                <td>${product.return_date}</td>
                <td>${product.reason}</td>
                <td>${product.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning" style = "display:none" onclick="editReturns(${product.return_id})">Edit</button>
                    ${replaceButton}
                    <button class="btn btn-sm btn-danger" onclick="updateToCancelledStatus(${product.return_id})">Cancel</button>
                </td>
                     
            </tr>
        `;

        const btns =
            productTableBody.append(row);
    });
}

function updateToCancelledStatus(id) {
    fetchSessionsInReplaceModal();
    console.log('user id value',updatedByValue);
    if (confirm("Are you sure you want to change this status to cancelled?")) {
        const return_ID = id;
        const statusCancelled = 'Cancelled';
        $.ajax({
            url: '/inventory-system/api/return.php',
            method: 'PUT',
            data: JSON.stringify({
                returnID: return_ID,
                updatedByValue:updatedByValue,
                statusCancelled: statusCancelled
            }),
            contentType: 'application/json',
            success: function () {
                console.log("Sales updated successfully:", return_ID);
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

function clearForm() {
    $('#returnForm')[0].reset();
    fetchSessionsInReturnModal();
    fetchPOID();
}


function saveReturn() {
    if (confirm("Are you sure you want to create this return to supplier transaction?")) {
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
                fetchProducts();
            },
            error: function (xhr, status, error) {
                console.error('Error fetching products:', error);
                console.error('XHR response:', xhr.responseText); // Log the full response text from the server
                console.error('XHR status:', xhr.status);  // Log the status code (e.g., 404, 500)
                console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
            }
        });
    }
}

function fetchProducts() {
    $.ajax({
        url: '/inventory-system/api/return.php',
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

function UpdateStatusToReplaced() {
    $.ajax({
        url: '/inventory-system/api/return.php',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            replacedReturnID: $('#replacedReturnID').val(),
            updatedByID: $('#updatedByID').val(),
            replacedDate: $('#replacedDate').val(),
            status: $('#status').val()
        }),
        success: function (response) {
            alert('Status updated successfully.');
            console.log('Raw Returns server response:', response);
            fetchProducts();
        },
        error: function (xhr, status, error) {
            console.error('Error fetching products:', error);
            console.error('XHR response:', xhr.responseText); // Log the full response text from the server
            console.error('XHR status:', xhr.status);  // Log the status code (e.g., 404, 500)
            console.error('XHR status text:', xhr.statusText);  // Log the status text (e.g., "Not Found")
        }
    });
}

function editReturnStatusToReplaced(id) {
    fetchSessionsInReplaceModal();
    const product = products.find((p) => p.return_id == id);
    if (!product) {
        console.error('Product not found for ID:', id);
        return;
    }

    console.log('Product object:', product);
    console.log('Product object:', product.return_id);

    // Populate form fields
    $('#replacedReturnID').val(product.return_id);
    $('#status').val('Replaced');
    $('#replacedStatusModal').modal('show');

}



