let suppliers = []; // Declare a global suppliers array to hold the data

$(document).ready(function () {
    fetchSuppliers();

    $('#searchSupplier').on('keyup', function () {
        const searchValue = $(this).val().toLowerCase();
        const filteredSuppliers = suppliers.filter(supplier =>
            supplier.uom_name.toLowerCase().includes(searchValue) ||
            supplier.description.toLowerCase().includes(searchValue)
        );
        renderSuppliers(filteredSuppliers);
    });
});

function clearSupplierForm() {
    $('#supplierId').val('');
    $('#supplierName').val('');
    $('#supplierContact').val('');
}

function fetchSuppliers() {
    $.ajax({
        url: '/inventory-system/api/uom.php',
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
            suppliers = suppliersData;  // Store the fetched suppliers in the global array
            renderSuppliers(suppliersData);
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
                 <td>${supplier.uom_id}</td>
                 <td>${supplier.uom_name}</td>
                 <td>${supplier.description}</td>
                  <td>${supplier.status}</td>
                 <td>
                     <button class="btn btn-primary btn-sm" onclick="editSupplier(${supplier.uom_id})">Edit</button>
                 </td>
             </tr>
         `;
        supplierTableBody.append(row);
    });
}

function saveSupplier() {
    const supplierData = {
        name: $('#supplierName').val(),
        description: $('#supplierContact').val(),

    };

    if (!supplierData.name || !supplierData.description) {
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
        url: '/inventory-system/api/uom.php',
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
        url: '/inventory-system/api/uom.php',
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
    const supplier = suppliers.find(supplier => supplier.uom_id == id);
    $('#supplierId').val(supplier.uom_id);
    $('#supplierName').val(supplier.uom_name);
    $('#supplierContact').val(supplier.description);
    $('#supplierModalLabel').text('Edit Supplier');
    $('#supplierModal').modal('show');
}