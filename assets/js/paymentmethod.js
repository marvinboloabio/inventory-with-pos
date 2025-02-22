let suppliers = []; // Declare a global suppliers array to hold the data

$(document).ready(function () {
    fetchSuppliers();

    $('#searchSupplier').on('keyup', function () {
        const searchValue = $(this).val().toLowerCase();
        const filteredSuppliers = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(searchValue)
        );
        renderSuppliers(filteredSuppliers);
    });
});

function clearSupplierForm() {
    $('#supplierId').val('');
    $('#supplierName').val('');
}

function fetchSuppliers() {
    $.ajax({
        url: '/inventory-system/api/paymentmethod.php',
        method: 'GET',
        success: function (data) {
            let suppliersData = data;
            if (typeof data === 'string') {
                try {
                    suppliersData = JSON.parse(data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    return;
                }
            }
            suppliers = suppliersData;
              // Store the fetched suppliers in the global array
            renderSuppliers(suppliersData);
            console.log("Payment Methods data:", suppliers);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching suppliers:', error);
        }
    });
}

function renderSuppliers(suppliers) {
    const supplierTableBody = $('#supplierTableBody');
    supplierTableBody.empty(); // Clear the table body

    suppliers.forEach((supplier) => {
        const row = `
             <tr>
                 <td>${supplier.payment_method_id}</td>
                 <td>${supplier.name}</td>
                  <td>${supplier.status}</td>
                 <td>
                     <button class="btn btn-primary btn-sm" onclick="editSupplier(${supplier.payment_method_id})">Edit</button>
                 </td>
             </tr>
         `;
        supplierTableBody.append(row);
    });
}

function saveSupplier() {
    const supplierData = {
        name: $('#supplierName').val(),
    };

    if (!supplierData.name) {
        alert('Please fill all fields');
        return;
    }

    const id = $('#supplierId').val();
    if (id) {
        supplierData.id = id;
        updateSupplier(supplierData);
    } else {
        createSupplier(supplierData);
    }
}

function createSupplier(supplierData) {
    $.ajax({
        url: '/inventory-system/api/paymentmethod.php',
        method: 'POST',
        data: JSON.stringify(supplierData),
        contentType: 'application/json',
        success: function (response) {
            console.log("Supplier created successfully:", response.data);
            $('#supplierModal').modal('hide');

            fetchSuppliers();
            alert("Brand created successfully:");
        },
        error: function (xhr, status, error) {
            console.error('Error creating supplier:', error);
        }
    });
}

function updateSupplier(supplierData) {
    $.ajax({
        url: '/inventory-system/api/paymentmethod.php',
        method: 'PUT',
        data: JSON.stringify(supplierData),
        contentType: 'application/json',
        success: function () {
            $('#supplierModal').modal('hide');
            fetchSuppliers();
            alert("Brand updated successfully:");
        },
        error: function (xhr, status, error) {
            console.error('Error updating supplier:', error);
        }
    });
}

function editSupplier(id) {
    const supplier = suppliers.find(supplier => supplier.payment_method_id == id);
    $('#supplierId').val(supplier.payment_method_id);
    $('#supplierName').val(supplier.name);
    $('#supplierModalLabel').text('Edit Supplier');
    $('#supplierModal').modal('show');
}