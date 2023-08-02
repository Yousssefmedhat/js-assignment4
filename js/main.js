var signupname = document.getElementById("signupName")
var signupemail = document.getElementById("signupEmail")
var signuppassword = document.getElementById("signupPassword")
var signinemail = document.getElementById("signinEmail")
var signinpassword = document.getElementById("signinPassword")
var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
}
else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}
function isEmpty() {
    if (signupname.value == "" || signupemail.value == "" || signuppassword.value == "") {
        return false
    }
    else {
        return true
    }
}
function signUp() {
    if (isEmpty() == false) {
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signupname.value,
        email: signupemail.value,
        password: signuppassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById("exist").innerHTML = '<span class="text-success m-3">success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3">Email already exists</span>'

    }
    else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById("exist").innerHTML = '<span class="text-success m-3">success</span>'
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupemail.value.toLowerCase()) {
            return false
        }
    }
}

function LoginEmpty() {

    if (signinpassword.value == "" || signinemail.value == "") {
        return false
    } else {
        return true
    }
}
function login() {
    if (LoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinpassword.value
    var email = signinemail.value
    var baseURL = window.location.origin
    var successLogin = false;
    console.log(signUpArray);
    console.log(email);
    console.log(password);
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            successLogin = true;
            // console.log("Login success");
            localStorage.setItem('Username', signUpArray[i].name)
            // if (baseURL == '/') {
            //     location.replace('https://' + location.hostname + '/home.html')

            // } else {
            //     location.replace(baseURL + '/home.html')

            // }
        }
    }
    if (successLogin) {
        
        alert("Success Login");
        window.location.href = 'home.html'
    }
    else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'

    }

}
var username = localStorage.getItem('Username')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

function logout() {
    localStorage.removeItem('Username')
}
