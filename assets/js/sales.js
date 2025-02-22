let products = [];
$(document).ready(function () {
    fetchProducts();
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

    $('#product').on('change', function () {
        const productID = $(this).val();
        console.log("product id:",productID);
        fetchProductsByID(productID);
    });

    $('#unitPrice , #qty ').on('input', calculate);

});

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

function fetchProductsDropdown() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/inventory-system/api/products.php',
            method: 'GET',
            success: function (data) {
                const suppliers = typeof data === 'string' ? JSON.parse(data) : data;
                const supplierDropdown = $('#product');
                supplierDropdown.empty();
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

function fetchProductsByID(id) {
    if (!id) {
        console.error('Invalid id provided');
        return;
    }

    $.ajax({
        url: '/inventory-system/api/products.php?salesProductID=' + id, // Send ID as query parameter
        method: 'GET', // Use GET method
        dataType: 'json', // Ensure response is parsed as JSON
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
            $('#productQuantity').val(suppliersData.stock_quantity);
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
            console.error('XHR response:', xhr.responseText); // Log full response
            alert('An error occurred while fetching product details. Check the console for more details.');
        }
    });
}

function fetchProducts() {
    $.ajax({
        url: '/inventory-system/api/sales.php',
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

function updateToCancelledStatus(id) {
    if (confirm("Are you sure you want to cancel this sale transaction?")) {
        const sales_ID = id;
        $.ajax({
            url: '/inventory-system/api/sales.php',
            method: 'PUT',
            data: JSON.stringify({ salesID: sales_ID }),
            contentType: 'application/json',
            success: function () {
                console.log("Sales updated successfully:", salesID);
                alert('Sales Cancelled successfully.');
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

function renderProducts(products) {
    const productTableBody = $('#productTableBody');
    productTableBody.empty();

    products.forEach((product) => {
        console.log(Array.isArray(products));
        const returnButton = product.status === "Completed"
            ? `<button class="btn btn-sm btn-danger" onclick="updateToCancelledStatus(${product.sales_transaction_id})">Cancel</button>`
            : "";
        const row = `
            <tr>
                <td>${product.sales_transaction_id}</td>
                <td>${product.transaction_date}</td>
                <td>${product.total_amount}</td>
                <td>${product.customer_id}</td>
                <td>${product.productName}</td>
                <td>${product.productQuantity}</td>
                <td>${product.quantity}</td>
                <td>${product.unit_price}</td>
                <td>${product.total_price}</td>
                <td>${product.status}</td>
                <td>
                    ${returnButton}
                </td>
            </tr>
        `;
        productTableBody.append(row);
    });
}

function clearForm() {
    $('#productModalLabel').text('Add Sales');
    $('#salesID').val('');
    $('#productForm')[0].reset();
    fetchSessionsHere();
    $('#transactionDate').val(new Date().toISOString().split('T')[0]); // Default to today's date
}

function createSupplier(supplierData) {
    if (confirm("Are you sure want to create this sales transaction?")) {
        $.ajax({
            url: '/inventory-system/api/sales.php',
            method: 'POST',
            data: JSON.stringify(supplierData),
            contentType: 'application/json',
            success: function (response) {
                console.log("Sales created successfully:", response);
                $('#productModal').modal('hide');
                alert('Sales transaction created successfully.');
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
        url: '/inventory-system/api/sales.php',
        method: 'PUT',
        data: JSON.stringify(supplierData),
        contentType: 'application/json',
        success: function () {
            console.log("Sales updated successfully:", supplierData);
            alert('Sales updated successfully.');
            $('#productModal').modal('hide');
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
        transactionDate: $('#transactionDate').val(),
        totalAmount: $('#totalAmount').val(),
        customer: $('#customer').val(),
        product: $('#product').val(),
        qty: $('#qty').val(),
        unitPrice: $('#unitPrice').val(),
        totalPrice: $('#totalPrice').val()//,
        //status: $('#status').val()
    };

    if (!supplierData.userID || !supplierData.transactionDate || !supplierData.totalAmount || !supplierData.customer || !supplierData.qty || !supplierData.unitPrice) {
        alert('Please fill all fields');
        return;
    }

    const id = $('#salesID').val();
    if (id) {
        supplierData.sales_transaction_id = id;
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
    const product = products.find((p) => p.sales_transaction_id == id);
    if (!product) {
        console.error('Product not found for ID:', sales_transaction_id);
        return;
    }

    console.log('Product object:', product);

    // Populate form fields
    $('#salesID').val(product.sales_transaction_id);
    $('#transactionDate').val(product.transaction_date);
    $('#totalAmount').val(product.total_amount);
    $('#customer').val(product.customer_id);
    $('#product').val(product.product_id);
    $('#qty').val(product.quantity);
    $('#unitPrice').val(product.unit_price);
    $('#totalPrice').val(product.total_price);
    $('#status').val(product.status);
    $('#productModalLabel').text('Edit Sales');
    $('#productModal').modal('show');
}

function returnProduct(id) {
    const product = products.find((p) => p.sales_transaction_id == id);
    if (!product) {    
        console.error('Product not found for ID:', id);
        return;
    }

    console.log('Product object:', product);

    // Populate form fields
    $('#poID').val(product.sales_transaction_id);
    $('#returnProduct').val(product.product_id);
    $('#returnModal').modal('show');

}



