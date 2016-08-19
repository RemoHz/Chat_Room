$(function () {

    // Register Check
    $.ajax({
        type: "GET",
        url: "doAction.php",
        data: "action=checkRegisterState",
        success: function (data) {
            if (data != "true") {
                // Redirect to login page
                window.location.href = "http://remo.site/chat/index.html";
            }
        }
    });

    // Get Chat Message
    $.ajax({
        type: "GET",
        url: "doAction.php",
        data: "action=getMsg",
        success: function (data) {
            $("#chat-dialog-con ul").html(data);
        }
    });

    // Get Users
    $.ajax({
        type: "GET",
        url: "doAction.php",
        data: "action=getUsers",
        success: function (data) {
            if (data != "null") {
                $("#chat-user-con ul").html(data);
            }
        }
    });

    // Add Expressions
    for (var i = 1; i <= 10; i++) {
        $("#chat-input-expr").html($("#chat-input-expr").html() + "<img src='Images/" + i + ".gif' id='" + i + "' />");
    }

    // Add Expression to message
    $("#chat-input-expr img").click(function () {
        $("#txtInput").val($("#txtInput").val() + "<:" + $(this).attr("ID") + ":>");
    });

    // Send Message
    $("#btnSend").click(function () {
        var sendMsg = $("#txtInput");

        if (sendMsg.val() != "") {
            SendMessage(sendMsg.val());
        }
        else {
            alert("Message should not empty!");
            sendMsg.focus();
            return false;
        }
    });

    // Refresh Message
    setInterval(getMsg, 5000);

    // Refresh Users
    setInterval(getUsers, 5000);

    // Exit
    $(window).unload(function () {
        $.ajax({
            type: "GET",
            url: "doAction.php",
            data: "action=exit",
            success: function (data) { }
        })
    });

    // Reset
    $("#btnReset").click(function () {
    	$.ajax({
            type:"GET",
            url:"doAction.php",
            data:"action=reset",
            success: function (data) {
            	console.log(data);
            	getMsg();
            	getUsers();
            }
    	})
     });
});

// Send Message
function SendMessage(msg) {
//    $("#chat-msg").ajaxStart(function () {
//        $(this).show().html("Sending...");
//    });
//    $("#chat-msg").ajaxStop(function () {
//        $(this).html("Request finished。").hide();
//    });

    var date = new Date();

    $.ajax({
        type: "GET",
        url: "doAction.php",
        data: "action=sendMsg&con=" + msg + "&d=" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        success: function (data) {
        	console.log(data);
            if (data == "success") {
                getMsg();
                $("#txtInput").val("");
            }
            else {
                alert("Send fail!");
                return false;
            }
        }
    });
}

// Get Message
function getMsg() {
    $.ajax({
        type:"GET",
        url:"doAction.php",
        data:"action=getMsg",
        success: function (data) {
        	console.log(data);
            $("#chat-dialog-con ul").html(data);
        }
    });
}

// Get Users
function getUsers() {
    $.ajax({
        type: "GET",
        url: "doAction.php",
        data: "action=getUsers",
        success: function (data) {
            if (data != "null") {
            	console.log(data);
                $("#chat-user-con ul").html(data);
            }
        }
    });
}
