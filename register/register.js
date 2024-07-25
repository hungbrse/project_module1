// input
let inputEmail = document.getElementById("inputEmail")
let inputPassword = document.getElementById("inputPassword")
let inputTel = document.getElementById("inputTel")
let inputUserName = document.getElementById("inputUserName")
let inputbirthDay = document.getElementById("inputbirthDay")
let registerBtn = document.getElementById("register-btn")
let errorMessenge = document.getElementById("error-message")


//value

// newUer = {
//     id: "",
//     email: "",
//     password: "",
//     username: "",
//     role: 0,
//     status: false,
//     cart: [],
// }


registerBtn.addEventListener("click", function () {

    let UserDb = JSON.parse(localStorage.getItem("users")) || [];
    let userEmail = inputEmail.value.toLowerCase()
    let userPassword = inputPassword.value.toLowerCase()
    let userPhone = +inputTel.value.toLowerCase().trim()
    let userBirthDay = inputbirthDay.value
    let userName = inputUserName.value.toLowerCase().trim()
    let id = UserDb.length > 0 ? UserDb[UserDb.length - 1].id + 1 : 1;


    console.log(userEmail)
    console.log(userPassword)
    console.log(userPhone)
    console.log(userBirthDay)
    console.log(userName)

    let checkEmail = UserDb.find((e) => e.email === userEmail)

    if (userEmail && userPassword && userPhone && userName && userBirthDay) {

        if (!checkEmail) {

            inputEmail.value = ""
            inputPassword.value = ""
            inputTel.value = ""
            inputPassword.value = ""
            inputbirthDay.value = ""

            UserDb.push({ id: id, email: userEmail, password: userPassword, name: userName, phone: userPhone, birthday: userBirthDay, role: 0, status: true, cart: [] })
            window.localStorage.setItem(("users"), JSON.stringify(UserDb))
            window.location.href = "http://127.0.0.1:5501/login/login.html";

        } else {
            errorMessenge.textContent = "このメールアドレスは使えません"

        }
    } else {
        errorMessenge.textContent = "内容を入力してください"

    }
})

