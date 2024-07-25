
let loginUser = document.getElementById("loginUser")

let loginUserLocalStorage = JSON.parse(localStorage.getItem("loginUserLocalStorage")) || []

// Nếu có thông tin người dùng trong localStorage, hiển thị tên người dùng
if (loginUserLocalStorage && loginUserLocalStorage.name) {
    loginUser.innerHTML = ` <i class="fa-regular fa-user"></i> ${loginUserLocalStorage.name}`;
    console.log(loginUserLocalStorage.name)
}