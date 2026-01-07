var customers = [];

$(document).ready(function () {
    //work
    console.log("Ready...")

    $("#add-new-phone").click(function(){
        var countPhone = $(".phone").length;

        $("#phone").after(`
            <input type="text" class="form-control phone" id="phone${countPhone}" name="phone" placeholder="(+84)999-9999">
        `);
    });

    $(".btn-active-save").click(function(){

         // Send objects to server
         // AJAX
         console.log(JSON.stringify(customers));

         $.post({
            url : "", // /FAMS3/saveTrainee
            dataType : 'JSON',
            contentType : 'application/json',
            data : JSON.stringify(customers),
            success : function(responseData) {
                $("#message").html(responseData.message);
                
                alert(responseData.data);
            },
            error : function(responseData) {

            }
        })

    });
    
    $(".btn-active-create").click(function () {
        console.log("Creating...");

        var firstName = $("#firstName").val();
        var counter = 0;

        if (firstName.length == 0) {
            $("#firstName").addClass("form-control-error");

            $(".form-group").first().append("<label class='error-message' id = 'msg1'>First Name is required!!</label>");
            counter++;
        } else {
            $("#firstName").removeClass("form-control-error");
            $("#msg1").remove();
        }

        if (counter == 0) {
            var index = $("tbody tr").length;

            // create a new object
            var customer = new Object();
            customer.firstName = firstName;
            customer.lastName = $("#lastName").val();
            customer.email = $("#email").val();
            customer.phone = $("#phone").val();
            customer.creditLimit = $("#creditLimit").val();
            customer.website = $("#website").val();
            customer.address = $("#address").val();

            // push to array
            customers.push(customer);

            console.log(JSON.stringify(customer));

            // append to table
            $("tbody").append(`
                <tr class = "">
                    <th scope="row">${++index}</th>
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.creditLimit}</td>
                    <td>${customer.website}</td>
                    <td>${customer.address}</td>
                </tr>
            `);
        }
    });

    $("#customer-form-active").validate(function () {
        console.log("Validating...")

        return false;
    });
});