// /**
//  *
//  */

// $(document).ready(function () {
//   //$("#btn-del-p").click(function(event) {
//   $(document).on("click", "#btn-del-p", function (event) {
//     event.preventDefault();

//     var confirm = window.confirm("Do you want to remove this item?");

//     if (confirm) {
//       document.location = $(this).attr("href");
//     }
//   });

//   $(".form-check-input").change(function () {
//     var id = $(this).attr("id");
//     var warehouse = "warehouse" + id;

//     alert(warehouse);

//     $("#" + warehouse).prop("disabled", false);
//   });

//   // Read more: https://api.jquery.com/jQuery.ajax/
//   $("#form-p").submit(function (event) {
//     event.preventDefault();

//     var form = document.getElementById("form-p");
//     var submitter = document.querySelector("button[value=save]");

//     var formData = new FormData(form, submitter);

//     var categoryId = $("#category").children(":selected").val();

//     for (const [key, value] of formData) {
//       console.log(`${key}: ${value}\n`);
//     }

//     var categoryObject = {};
//     categoryObject.categoryId = categoryId;
//     categoryObject.categoryName = formData.get("category");

//     console.log(JSON.stringify(categoryObject));

//     formData.delete("category");

//     var productObject = {};
//     formData.forEach((value, key) => (productObject[key] = value));

//     if (categoryId != "") {
//       productObject.category = categoryObject;
//     }

//     // convert to JSON
//     console.log(JSON.stringify(productObject));

//     // send JSON string to server
//     console.log($("#form-p").attr("action"));
//     $.post({
//       url: $("#form-p").attr("action"),
//       /*dataType: 'JSON',*/
//       contentType: "application/json",
//       data: JSON.stringify(productObject),

//       success: function (data, textStatus, xhr) {
//         alert(textStatus);
//         $(`<div id ="message">${textStatus}</div>`).insertBefore("#form-p");
//       },
//       error: function (data, textStatus, xhr) {
//         $(`<div id ="message">${textStatus}</div>`).insertBefore("#form-p");
//         alert(textStatus);
//       },
//       processData: false,
//     });
//   });
// });
