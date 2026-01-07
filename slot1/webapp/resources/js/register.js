console.log("Loading...");
// alert("Loading...");

// Declare a new object
var user = new Object();
user.userName = "admin";

console.log(user);



function validate(){
    // Get all data that user be entered.

    var userNameEl = document.forms[0].elements[0];
    var userNameVal = userNameEl.value;

    var passwordEl = document.getElementById("password");
    var passwordVal = passwordEl.value;

    var passwordEl2 = document.getElementById("repassword");
    var passwordVal2 = passwordEl2.value;

    var firstNameEl = document.getElementById("firstName");
    var firstNameVal = firstNameEl.value;

    var lastNameEl = document.getElementById("lastName");
    var lastNameVal =lastNameEl.value;

    var countryEl = document.getElementById("country");
    var countryVal = countryEl.textContent;

    var genderMaleEl = document.getElementsByName("gender")[0];
    var genderMaleVal = genderMaleEl.value;

    var genderFemaleEl = document.getElementsByName("gender")[1];
    var genderFemaleVal = genderFemaleEl.value;

    document.images[0].src= "http://127.0.0.1:5500/resources/images/user2.jpg";


    var commonPattern = /[A-Za-z0-9_]{5}/; // [A-Za-z0-9]

    var countError = 0;

    if(!commonPattern.test(userNameVal)){
        // userNameEl.style.borderColor = "red";
        userNameEl.className = "form-control form-control-error";
        // document.getElementsByClassName("error-message")[0].innerHTML = "User name invalid!!";
        
        // <label class="error-message">User name invalid!!</label>
        var node = document.createElement("label");// create a new element
        node.className = "error-message";
        node.innerHTML = "User name invalid!!";

        document.getElementsByClassName("col-md-12")[1].append(node);
        countError++;
    }else {
        userNameEl.className = "form-control";
    }

    if(passwordVal != passwordVal2){
        passwordEl.className = "form-control form-control-error";
        passwordEl2.className = "form-control form-control-error";
        countError++;
    }else {
        if(!commonPattern.test(passwordVal)){
            passwordEl.className = "form-control form-control-error";
            countError++;
        } else {
            passwordEl.className = "form-control";
            passwordEl2.className = "form-control";
            
        }
    }
    // window.location = "https://www.w3schools.com/js/js_objects.asp";

    if(countError==0){
        // window.location = "http://127.0.0.1:5500/views/login.html";
        return true;
    }

    return false;
}