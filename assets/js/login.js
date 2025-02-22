$(document).ready(function () {
    $("#navbar-container").load("../includes/navbar.php", function (response, status) {
        if (status === "error") {
            console.log("Failed to load navbar.");
        }
    });
});

function login() {
    let userData = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    $.ajax({
        url: "/inventory-system/api/login.php",
        type: "POST",
        data: JSON.stringify(userData), // Ensure it's JSON
        contentType: "application/json", // Set correct content type
        dataType: "json", // Expect JSON response
        success: function (response) {
            if (response.success) {
                alert("Login successful!");
                window.location.href = "navigate.php";
            } else {
                alert(response.message);
            }
        },
        error: function (xhr) {
            console.error("Error:", xhr.responseText);
        }
    });
}

