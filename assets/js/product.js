let products = [];
$(document).ready(function () {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
    fetchBrands();
    fetchUOMs();

    $("#navbar-container").load("../includes/navbar.php", function (response, status) {
        if (status === "error") {
            console.log("Failed to load navbar.");
        }
    });

    $('#searchProducts').on('keyup', function () {
        const searchValue = $(this).val().toLowerCase();
        const filteredProducts = products.filter(product =>
            product.sku.toLowerCase().includes(searchValue) ||
            product.name.toLowerCase().includes(searchValue)
        );
        renderProducts(filteredProducts);
    });

     /* Commented this for reference use *
     $('#sku, #name').on('keyup', function () {
         const skuValue = $('#sku').val();
         const nameValue = $('#name').val();
         const name = products.find(product => product.name == nameValue);
         const sku = products.find(product => product.sku == skuValue);
         if (sku) {
             $("#validateSkuMsg").text("SKU already exist");
             $("#validateProductName").text("");
             $("#displayBtn").hide();
         } else if (name) {
             $("#validateProductName").text("Product already exist");
             $("#validateSkuMsg").text("");
             $("#displayBtn").hide();
         } else if (sku && name) {
             $("#validateProductName").text("Product already exist");
             $("#validateSkuMsg").text("SKU already exist");
             $("#displayBtn").hide();
         } else {
             $("#validateSkuMsg").text("");
             $("#validateProductName").text("");
             $("#displayBtn").show();
         }
     });
     **/

    /*$("#productForm").submit(function (event) {
        let isValid = true;

        const skuValue = $('#sku').val();
        const skuFind = products.find(product => product.sku == skuValue);

        const nameValue = $('#name').val();
        const nameFind = products.find(product => product.name == nameValue);

        // Reset error messages and borders
        $("#validateSkuMsg").text("");
        $("#validateProductName").text("");
        $("#validatePrice").text("");
        $("#validateStock").text("");
        $("#validateReorder").text("");
        $("#sku, #name, #price, #stock, #reorder").css("border", "");

        let sku = $("#sku").val().trim();
        let name = $("#name").val().trim();
        let price = parseFloat($("#price").val());
        let stock = parseInt($("#stock").val()) || 0; // Default to 0 if empty
        let reorder = parseInt($("#reorder").val()) || 0;

        // Validate SKU
        if (sku === "") {
            $("#validateSkuMsg").text("SKU is required.").css("color", "red");
            $("#sku").css("border", "2px solid red");
            isValid = false;
        }
        else if (skuFind) {
            $("#validateSkuMsg").text("SKU already exist");
            $("#sku").css("border", "2px solid red");
            isValid = false;
        }
        else if (name === "") {
            $("#validateProductName").text("Name is required");
            $("#name").css("border", "2px solid red");
            isValid = false;
        }
        else if (nameFind) {
            $("#validateProductName").text("Product already exist");
            $("#name").css("border", "2px solid red");
            isValid = false;
        }
        // Validate Price (Required, Positive Number, 2 Decimal Places)s
        else if (isNaN(price) || price <= 0) {
            $("#validatePrice").text("Price is required and must be a valid number greater than 0.");
            $("#price").css("border", "2px solid red");
            isValid = false;
        }
        // Validate Stock Quantity (Whole Number, At Least 0)
        else if (!Number.isInteger(stock) || stock < 0) {
            $("#validateStock").text("Stock must not be a negative value.");
            $("#stock").css("border", "2px solid red");
            isValid = false;
        }
        // Validate Reorder Level (Whole Number, At Least 0, Not More Than Stock)
        else if (!Number.isInteger(reorder) || reorder < 0) {
            $("#validateReorder").text("Reorder level must not be a negative value.");
            $("#reorder").css("border", "2px solid red");
            isValid = false;
        }
        else if (reorder > stock) {
            $("#validateReorder").text("Reorder level cannot be greater than stock quantity.");
            $("#reorder").css("border", "2px solid red");
            isValid = false;
        }
        // If all fields are valid, call save function
        else {
            saveProduct(); // Call save function
        }
        console.log(!isValid);
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    **/

    /*$("#adjustmentForm").submit(function (event) {
        let isValid = true;

        // Reset error messages and borders
        $("#validateAdjustmentType").text("");
        $("#validateAdjustmentQuantity").text("");
        $("#validateAdjustmentReason").text("");

        let adjusmentType = $("#adjustmentType").val();
        let quantity = $("#quantity").val();

        console.log("value is:",adjusmentType);
        console.log("value is:",quantity);

        // Validate SKU
        if (adjusmentType === 'Select') {
            $("#validateAdjustmentType").text("Please select adjustment type.").css("color", "red");
            isValid = false;
        }
        // Validate Price (Required, Positive Number, 2 Decimal Places)s
        else if (isNaN(quantity) || quantity <= 0) {
            $("#validateAdjustmentQuantity").text("Quantity is required and must be a valid number greater than 0.").css("color", "red");
            $("#quantity").css("border", "2px solid red");
            isValid = false;
        }
        // If all fields are valid, call save function
        else {
            saveAdjustment(); // Call save function
        }
        console.log(!isValid);
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    **/

    Notiflix.Confirm.init({
        position: 'center-top',
        distance: '50px',
        borderRadius: '8px',
        titleColor: '#333',
        messageColor: '#666',
    });
});

// Initialize Notiflix Confirm with custom positioning
function updateToCancelledStatus(id) {
    Notiflix.Confirm.show(
        'Confirm Cancellation',
        'Are you sure you want to cancel this product?',
        'Yes', 'No',
        function okCb() {  // If "Yes" is clicked
            $.ajax({
                url: '/inventory-system/api/products.php',
                method: 'PUT',
                data: JSON.stringify({ productID: id }),
                contentType: 'application/json',
                success: function () {
                    console.log("Sales updated successfully:", id);
                    Notiflix.Notify.success('Poduct has been cancelled successfully!');
                    fetchProducts();
                },
                error: function (xhr, status, error) {
                    console.error('Error updating supplier:', error);
                    console.error('XHR response:', xhr.responseText);
                    console.error('XHR status:', status);
                    console.error('XHR status text:', xhr.statusText);
                }
            });
        },
        function cancelCb() {  // If "No" is clicked
            Notiflix.Notify.info('Product cancellation was not completed.');
        }
    );
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

function fetchSessionsInAdjustmentModal() {
    $.ajax({
        url: "/inventory-system/api/check_session.php",
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function (response) {
            if (response.success) {
                console.log("UserID in field:", response.user_id);
                $("#adjustmentUserID").val(response.user_id);
            } else {
                alert("Session expired. Redirecting to login.");
                window.location.href = "../views/login.php";
            }
        }
    });
}

function clearAdjustmentModal(){
    $('#adjustmentForm')[0].reset();
    $("#validateAdjustmentType").text("");
    $("#validateAdjustmentQuantity").text("");
    $("#validateAdjustmentReason").text("");
}

function openAdjustmentModal(id) {
    clearAdjustmentModal();
    fetchSessionsInAdjustmentModal();
    const product = products.find((p) => p.id == id);
    if (!product) {
        console.error('Product not found for ID:', id);
        return;
    }

    console.log('Product object:', product);
    // Fetch the current date for adjustment_date, created_at, and updated_at fields
    const currentDateTime = new Date().toISOString().slice(0, 16);
    // Populate modal fields
    $('#adjustProductId').val(product.id);
    $('#adjustmentType').val('');
    $('#quantity').val('');
    $('#reason').val('');
    $('#adjustmentDate').val(new Date().toISOString().split('T')[0]); // Default to today's date
    // Show the modal
    $('#adjustmentModal').modal('show');
}

function saveAdjustment() {
     // Reset error messages and borders
     $("#validateAdjustmentType").text("");
     $("#validateAdjustmentQuantity").text("");
     $("#validateAdjustmentReason").text("");

     let adjusmentType = $("#adjustmentType").val();
     let quantity = $("#quantity").val();

     console.log("value is:",adjusmentType);
     console.log("value is:",quantity);

     // Validate SKU
     if (adjusmentType === '') {
         $("#validateAdjustmentType").text("Please select adjustment type.").css("color", "red");
     }
     // Validate Price (Required, Positive Number, 2 Decimal Places)s
     else if (isNaN(quantity) || quantity <= 0) {
         $("#validateAdjustmentQuantity").text("Quantity is required and must be a valid number greater than 0.").css("color", "red");
     }
     // If all fields are valid, call save function
     else {
        Notiflix.Confirm.show(
            'Confirm Adjustment', 
            'Are you sure you want to save this adjustment?', 
            'Yes', 'No',
            function okCb() {  // If "Yes" is clicked
                $.ajax({
                    url: '/inventory-system/api/adjustment.php',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        productId: $('#adjustProductId').val(),
                        user_id: $('#adjustmentUserID').val(),
                        adjustmentType: $('#adjustmentType').val(),
                        quantity: $('#quantity').val(),
                        reason: $('#reason').val()
                    }),
                    success: function (response) {
                        console.log('Response:', response);
                        $('#adjustmentModal').modal('hide');
                        Notiflix.Notify.success('Adjustment saved successfully!');
                        fetchProducts();
                    },
                    error: function (xhr, status, error) {
                        console.error('Error updating supplier:', error);
                        console.error('XHR response:', xhr.responseText);
                        console.error('XHR status:', status);
                        console.error('XHR status text:', xhr.statusText);
                    }
                });
            },
            function cancelCb() {  // If "No" is clicked
                Notiflix.Notify.info('Adjustment was not saved.');
            }
        );
     }
}

function fetchCategories() {
    return new Promise((resolve, reject) => {
        const status = "Active";
        $.ajax({
            url: '/inventory-system/api/category.php?method=GET&status=' + status + '',
            method: 'GET',
            success: function (data) {
                const categories = typeof data === 'string' ? JSON.parse(data) : data;
                const categoryDropdown = $('#category');
                categoryDropdown.empty();
                categories.forEach(category => {
                    categoryDropdown.append(`<option value="${category.category_id}">${category.category_name}</option>`);
                });
                resolve();
            },
            error: function (xhr, status, error) {
                console.error('Error fetching categories:', error);
                console.error('Response Text:', xhr.responseText);
                reject(error);
            }
        });
    });
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

function fetchBrands() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/inventory-system/api/brand.php',
            method: 'GET',
            success: function (data) {
                const brands = typeof data === 'string' ? JSON.parse(data) : data;
                const brandDropdown = $('#brand');
                brandDropdown.empty();
                brands.forEach(brand => {
                    brandDropdown.append(`<option value="${brand.brand_id}">${brand.brand_name}</option>`);
                });
                resolve(); // Resolve the Promise once data is populated
            },
            error: function (xhr, status, error) {
                console.error('Error fetching brands:', error);
                reject(error); // Reject the Promise in case of an error
            }
        });
    });
}

function fetchUOMs() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/inventory-system/api/uom.php',
            method: 'GET',
            success: function (data) {
                const uoms = typeof data === 'string' ? JSON.parse(data) : data;
                const uomDropdown = $('#uom');
                uomDropdown.empty();
                uoms.forEach(uom => {
                    uomDropdown.append(`<option value="${uom.uom_id}">${uom.uom_name}</option>`);
                });
                resolve(); // Resolve the Promise once data is populated
            },
            error: function (xhr, status, error) {
                console.error('Error fetching UOMs:', error);
                reject(error); // Reject the Promise in case of an error
            }
        });
    });
}

function fetchProducts() {
    $.ajax({
        url: '/inventory-system/api/products.php',
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
            renderProducts(products);
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
        const returnButton = product.status === "Active"
            ? `<button class="btn btn-sm btn-danger" onclick="updateToCancelledStatus(${product.id})">Cancel</button>`
            : "";
        const row = `
            <tr>
                <td>${product.id}</td>
                <td style ="display:none">${product.user_id}</td>
                <td>${product.sku}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.supplier}</td>
                <td>${product.brand}</td>
                <td>${product.uom}</td>
                <td>${product.price}</td>
                <td>${product.stock_quantity}</td>
                <td>${product.reorder_level}</td>
                <td>${product.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning" style = "display:none" onclick="editProduct(${product.id})">Edit</button>
                     <button class="btn btn-sm btn-primary" onclick="openAdjustmentModal(${product.id})">Adjustment</button>
                     ${returnButton}
                </td>
            </tr>
        `;
        productTableBody.append(row);
    });
}

function clearForm() {
    $('#productId').val('');
    $('#productForm')[0].reset();
    fetchSessionsHere();
}

function saveProduct() {
    const skuValue = $('#sku').val().trim();
    const nameValue = $('#name').val().trim();
    const skuFind = products.find(product => product.sku == skuValue);
    const nameFind = products.find(product => product.name == nameValue);

    // Reset error messages and borders
    $("#validateSkuMsg").text("");
    $("#validateProductName").text("");
    $("#validatePrice").text("");
    $("#validateStock").text("");
    $("#validateReorder").text("");
    $("#sku, #name, #price, #stock, #reorder").css("border", "");

    let price = parseFloat($("#price").val());
    let stock = parseInt($("#stock").val()) || 0; // Default to 0 if empty
    let reorder = parseInt($("#reorder").val()) || 0;

    // Validate SKU
    if (skuValue === "") {
        $("#validateSkuMsg").text("SKU is required.").css("color", "red");
    }
    else if (skuFind) {
        $("#validateSkuMsg").text("SKU already exists.");
    }
    // Validate Name
    else if (nameValue === "") {
        $("#validateProductName").text("Name is required.");
    }
    else if (nameFind) {
        $("#validateProductName").text("Product already exists.");
    }
    // Validate Price
    else if (isNaN(price) || price <= 0) {
        $("#validatePrice").text("Price is required and must be a valid number greater than 0.");
    }
    // Validate Stock Quantity
    else if (!Number.isInteger(stock) || stock < 0) {
        $("#validateStock").text("Stock must not be a negative value.");
    }
    // Validate Reorder Level
    else if (!Number.isInteger(reorder) || reorder < 0) {
        $("#validateReorder").text("Reorder level must not be a negative value.");
    }
    else if (reorder > stock) {
        $("#validateReorder").text("Reorder level cannot be greater than stock quantity.");
    }
    else {
        // If all fields are valid, call save function
        Notiflix.Confirm.show(
            'Confirm Adjustment',
            'Are you sure you want to save this adjustment?',
            'Yes', 'No',
            function okCb() {
                const productData = {
                    sku: skuValue,
                    name: nameValue,
                    user_id: $('#userID').val(),
                    category_id: $('#category').val(),
                    supplier_id: $('#supplier').val(),
                    brand_id: $('#brand').val(),
                    uom_id: $('#uom').val(),
                    price: price,
                    stock_quantity: stock,
                    reorder_level: reorder
                };
                
                $.ajax({
                    url: '/inventory-system/api/products.php',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(productData),
                    success: function(response) {
                        if (response.message === 'Product created successfully.') {
                            $('#productModal').modal('hide');
                            Notiflix.Notify.success(response.message);
                            fetchProducts();  // Refresh the product list
                        } else {
                            Notiflix.Notify.failure(response.message || 'Failed to save the product.');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Error saving product:', xhr.responseText);
                        console.error('Status:', status);
                        console.error('Error:', error);
                        Notiflix.Notify.failure('An error occurred while saving the product.');
                    }
                });
            },
            function cancelCb() {
                Notiflix.Notify.info('Product was not saved.');
            }
        );
    }
}

/* Commented this for reference use *
async function editProduct(id) {
    const product = products.find((p) => p.id == id);
    if (!product) {
        console.error('Product not found for ID:', id);
        return;
    }

    console.log('Product object:', product);

    // Populate form fields
    $('#productId').val(product.id);
    $('#sku').val(product.sku);
    $('#name').val(product.name);
    $('#price').val(product.price);
    $('#stock').val(product.stock_quantity);
    $('#reorder').val(product.reorder_level);

    try {
        // Fetch and populate dropdowns
        await fetchCategories();

        // Map category name to its ID
        const categoryId = $('#category option').filter((_, option) =>
            $(option).text() === product.category
        ).val();
        console.log('Mapped Category ID:', categoryId); // Debugging
        $('#category').val(categoryId || ''); // Fallback to empty if not found

        await fetchSuppliers();

        // Map supplier name to its ID
        const supplierId = $('#supplier option').filter((_, option) =>
            $(option).text() === product.supplier
        ).val();
        console.log('Mapped Supplier ID:', supplierId); // Debugging
        $('#supplier').val(supplierId || ''); // Fallback to empty if not found

        await fetchBrands();

        // Map brand name to its ID
        const brandId = $('#brand option').filter((_, option) =>
            $(option).text() === product.brand
        ).val();
        console.log('Mapped Brand ID:', brandId); // Debugging
        $('#brand').val(brandId || ''); // Fallback to empty if not found

        await fetchUOMs();

        // Map UOM name to its ID
        const uomId = $('#uom option').filter((_, option) =>
            $(option).text() === product.uom
        ).val();
        console.log('Mapped UOM ID:', uomId); // Debugging
        $('#uom').val(uomId || ''); // Fallback to empty if not found

        // Show the modal after all operations are complete
        $('#productModal').modal('show');
    } catch (error) {
        console.error('Error fetching dropdown options:', error);
        alert('An error occurred while preparing the form. Please try again.');
    }
}
**/

/* Commented this for reference use *
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    $.ajax({
        url: `/inventory-system/api/products.php?id=${id}`,
        method: 'DELETE',
        success: function () {
            fetchProducts();
            alert('Product deleted successfully');
        },
        error: function (xhr, status, error) {
            console.error('Error deleting product:', error);
        }
    });
}
**/



