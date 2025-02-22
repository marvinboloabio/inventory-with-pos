$(document).ready(function () {
    $("#navbar-container").load("../includes/navbar.php", function(response, status) {
        if (status === "error") {
            console.log("Failed to load navbar.");
        }
    });
});

function logoutSession() {
    $.ajax({
        url: '/inventory-system/api/logout.php', // Adjust the path if needed
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                alert(response.message);
                window.location.href = "../views/login.php"; // Redirect to login page
            }
        },
        error: function () {
            alert("Logout failed. Please try again.");
        }
    });
}
