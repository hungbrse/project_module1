// let userDb = JSON.parse(localStorage.getItem("users")) || [];
// userDb.push({
//     id: 0,
//     birthday: "2024-07-05",
//     email: "admin@gmail.com",
//     name: "admin",
//     password: "admin123",
//     phone: "0987654321",
//     role: 1,
//     status: true,
// })
// localStorage.setItem("users", JSON.stringify(userDb))

let currentPage = 1;

let pagination = 5;


let tableItem = document.getElementById("table-item")
let paginationDiv = document.getElementById("pagination-div")
let searchBtn = document.getElementById("search-Btn")
let searchInput = document.getElementById("searchInput")
let sortInput = document.getElementById("sort-input")
let adminLogin = document.getElementById("admin-login")

let adminLogout = document.getElementById("logout")





function render() {


    let userDb = JSON.parse(localStorage.getItem("users")) || [];

    let searchText = searchInput.value.trim().toLowerCase();

    userDb = userDb.filter((e) => e.email.toLowerCase().includes(searchText))

    if (sortInput.value === "ase") {
        userDb.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortInput.value === "des") {
        userDb.sort((a, b) => b.email.localeCompare(a.email));
    }

    let toltalPage = Math.ceil(userDb.length / pagination);
    let startIndex = (currentPage - 1) * pagination;
    let endIndex = startIndex + pagination;

    let printPage = userDb.slice(startIndex, endIndex)

    let print = ""

    for (let index in printPage) {

        print += `
            <tr>
                <td>${printPage[index].id}</td>
                <td>${printPage[index].email}</td>
                <td>${printPage[index].password}</td>
                <td>${printPage[index].name}</td>
                <td>${printPage[index].phone}</td>
                <td>${printPage[index].birthday}</td>
                <td>${printPage[index].role ? "Admin" : "User"}</td>
                <td>${printPage[index].status ? "Active" : "Block"}</td>
                <td>
                    <button onclick="changeStatus(${printPage[index].id})" style="display: ${printPage[index].role ? "none" : ""}">
                        ${printPage[index].status ? "BLock" : "Active"}
                    </button>
                </td>
            </tr>
        `
        tableItem.innerHTML = print;



    }

    let printPaginationBtn = ""
    for (let index = 1; index <= toltalPage; index++) {
        printPaginationBtn += `
                     <button onclick="changePage(${index})">${index}</button>
         `
    }
    paginationDiv.innerHTML = printPaginationBtn;
}

function changeStatus(id) {

    // lay local
    // tim vi tri theo id
    // doi status bang !staus
    // luu 
    //ve    
    let userDb = JSON.parse(localStorage.getItem("users")) || [];
    let findId = userDb.find((e) => e.id === id);

    if (findId) {
        findId.status = !findId.status
        window.localStorage.setItem("users", JSON.stringify(userDb))
        render()
    }


}


function changePage(pageNumber) {
    currentPage = pageNumber;
    render()
}


sortInput.addEventListener("change", function () {
    render();
})

searchBtn.addEventListener("click", function () {
    render();
})


adminLogin.addEventListener("mouseover", function () {

    adminLogout.style.display = "block"

})

adminLogin.addEventListener("mouseout", function () {

    adminLogout.style.display = "none"


})

adminLogout.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5501/login/login.html"
})

render();
