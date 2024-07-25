// input

let loginInput = document.getElementById("loginInput")

let loginPasswordInput = document.getElementById("loginPassword")

let loginBtn = document.getElementById("login-btn")

let errorMessenger = document.getElementById("error-messenger")

loginBtn.addEventListener("click", function () {

    let userDb = JSON.parse(localStorage.getItem("users")) || [];

    let loginEmail = loginInput.value.toLowerCase()

    let loginPassword = loginPasswordInput.value.toLowerCase()


    if (loginEmail && loginPassword) {

        let finUser = userDb.find((e) => e.email === loginEmail);

        if (loginEmail === finUser.email && loginPassword === finUser.password) {

            localStorage.setItem(("loginUserLocalStorage"), JSON.stringify(finUser))
            window.location.href = "../main_page.html"
        } else {
            errorMessenger.textContent = "メールアドレス,それともパスワードは間違っている!"

            console.log(finUser.email)
            console.log(finUser.password)
        }


    }
})