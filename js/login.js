$(function () {

    // Name Check
    $("#btnLogin").click(function () {

        var name = $("#txtName");

        if (name.val().replace(" ", "") != "") {
            registerName(name.val());
        }
        else {
            alert("Name should not empty");
            name.focus();
            return false;
        }
    });

    // Reset
    $("#btnCancel").click(function () {
        $("#txtName").val("");
    });
});

// Register function
function registerName(name) {
//    $("#login-msg").ajaxStart(function () {
//        $(this).show().html("Sending Message...");
//    });
//    $("#login-msg").ajaxStop(function () {
//        $(this).html("Request Finished").hide();
//    });
    $.ajax({
        type: "GET",
        url: "doAction.php",
        data: "action=register&name=" + name,
        success: function (data) {
        	console.log(data);
            if (data == "success") {
                window.location.href = "home.html";
            }
            else {
                alert("Server Error!");
                return false;
            }
        }
    });
}
