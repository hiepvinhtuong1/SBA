$(document).ready(function () {

    $("#customer-management").click(function () {
        // send a new request to server by ajax

        $.ajax({
            type: "get",
            url: "http://127.0.0.1:5500/views/customer-detail.html",// rquest mapping = controller
            success: function (responseData) {
                // responseData = customer-detail.html
                alert(responseData);

                $(".my-content").html(responseData);
            },
            error: function (responseError) {
                // responseError = 404
            }
        })

        
    });

});