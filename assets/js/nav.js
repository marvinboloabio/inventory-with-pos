$(document).ready(function () {
    fetchSessionsData();
});

function fetchSessionsData() {
    $.ajax({
        url: "/inventory-system/api/check_session.php",
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function (response) {
            if (response.success) {
                console.log("User ID:", response.user_id);
                $("#user_id").text(response.user_id);
                $("#user_name").text(response.user_name);
            } else {
                alert("Session expired. Redirecting to login.");
                window.location.href = "../views/login.php";
            }
        }
    });
}

function logoutSession() {
    if (confirm("Are you sure you want to logout?")) {
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
}