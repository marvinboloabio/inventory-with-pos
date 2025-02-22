let suppliers = []; // Declare a global suppliers array to hold the data

$(document).ready(function () {
    fetchSuppliers();

    $('#searchSupplier').on('keyup', function () {
        
        const searchValue = $(this).val().toLowerCase();
        const filteredSuppliers = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(searchValue) ||
            supplier.contact.toLowerCase().includes(searchValue) ||
            supplier.email.toLowerCase().includes(searchValue) ||
            supplier.address.toLowerCase().includes(searchValue)
        );
        renderSuppliers(filteredSuppliers);
    });
});

function clearSupplierForm() {
    $('#supplierId').val('');
    $('#supplierName').val('');
    $('#supplierContact').val('');
    $('#supplierEmail').val('');
    $('#supplierAddress').val('');
    $('#supplierModalLabel').text('Add New Supplier');
}

function fetchSuppliers() {
    $.ajax({
        url: '/inventory-system/api/supplier.php',
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
            console.log(Array.isArray(suppliers));
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
                 <td>${supplier.id}</td>
                 <td>${supplier.name}</td>
                 <td>${supplier.contact}</td>
                 <td>${supplier.email}</td>
                 <td>${supplier.address}</td>
                 <td>
                     <button class="btn btn-primary btn-sm" onclick="editSupplier(${supplier.id})">Edit</button>
                 </td>
             </tr>
         `;
        supplierTableBody.append(row);
    });
}

function saveSupplier() {

    const supplierData = {
        name: $('#supplierName').val(),
        contact: $('#supplierContact').val(),
        email: $('#supplierEmail').val(),
        address: $('#supplierAddress').val(),

    };
      
    if (!supplierData.name || !supplierData.contact || !supplierData.email || !supplierData.address) {
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
        url: '/inventory-system/api/supplier.php',
        method: 'POST',
        data: JSON.stringify(supplierData),
        contentType: 'application/json',
        success: function (response) {
            console.log("Supplier created successfully:", response.data);
            $('#supplierModal').modal('hide');
            fetchSuppliers();
        },
        error: function (xhr, status, error) {
            console.error('Error creating supplier:', error);
        }
    });
}

function updateSupplier(supplierData) {
    $.ajax({
        url: '/inventory-system/api/supplier.php',
        method: 'PUT',
        data: JSON.stringify(supplierData),
        contentType: 'application/json',
        success: function () {
            $('#supplierModal').modal('hide');
            fetchSuppliers();
        },
        error: function (xhr, status, error) {
            console.error('Error updating supplier:', error);
        }
    });
}

function editSupplier(id) {
    const supplier = suppliers.find(supplier => supplier.id == id);
    $('#supplierId').val(supplier.id);
    $('#supplierName').val(supplier.name);
    $('#supplierContact').val(supplier.contact);
    $('#supplierEmail').val(supplier.email);
    $('#supplierAddress').val(supplier.address);
    $('#supplierModalLabel').text('Edit Supplier');
    $('#supplierModal').modal('show');
}