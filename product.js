
// hiển thị inputAdd
let closeBtn = document.querySelector(".close");
let productModal = document.getElementById("productModal");
let showProductBtn = document.querySelector(".product-show-btn");
let addProductBtn = document.getElementById("submit-input-btn")
// input
let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productStockInput = document.getElementById("productStock")

let productCategoryInput = document.getElementById("productCategory");

let productPriceSortInput = document.getElementById("sort-input")


let productImageInput = document.getElementById("productImage");
//render
let productItem = document.querySelector(".product-item");
//category-select
let categories = JSON.parse(localStorage.getItem("categories"))
// Phân Trang

let pagination = document.getElementById("pagination")
let searchBtn = document.querySelector(".search-btn")
let searchInput = document.getElementById("searchInput")

let currentPage = 1;
const itemsPerPage = 5;


//
let imageBase64 = null

let checkViet = null;

showProductBtn.addEventListener("click", function () {

    productModal.style.display = "block";

})

closeBtn.addEventListener("click", function () {
    productModal.style.display = "none";

})

//


addProductBtn.addEventListener("click", function () {
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let productName = productNameInput.value.trim()
    let productPrice = productPriceInput.value.trim()
    let productStock = productStockInput.value.trim()
    // let productCategory = productCategoryInput.options[productCategoryInput.selectedIndex].textContent;
    let productCategory = productCategoryInput.value;
    if (checkViet !== null) {
        product[checkViet].name = productName;
        product[checkViet].img = imageBase64;
        product[checkViet].price = +productPrice;
        product[checkViet].stock = +productStock;
        product[checkViet].category = +productCategory
        checkViet = null;
        addProductBtn.textContent = "登録"
        window.localStorage.setItem("product", JSON.stringify(product))
        productModal.style.display = "none";
        productNameInput.value = ""
        productPriceInput.value = ""
        productStockInput.value = ""
        render();
        return;
    }
    let checkName = product.findIndex((e) => e.name.toLowerCase() === productName.toLowerCase())
    let id = 1;
    if (product.length > 0) {
        id = product[product.length - 1].id + 1
    }
    if (checkName === -1) {
        product.push({ id: id, img: imageBase64, name: productName, price: +productPrice, stock: +productStock, category: +productCategory })
        console.log(product);
        window.localStorage.setItem("product", JSON.stringify(product))
        productNameInput.value = ""
        productPriceInput.value = ""
        productStockInput.value = ""
        render();
        productModal.style.display = "none";
    } else {
        alert("hãy nhập tên khác")
    }
})


function render() {
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    if (productPriceSortInput.value === "aes") {
        product.sort((a, b) => a.price - b.price);
    } else if (productPriceSortInput.value === "des") {
        product.sort((a, b) => b.price - a.price);
    }

    // dbCategory = dbCategory.filter((e) => e.name.toLowerCase().includes(filterName));


    let search = searchInput.value.toLowerCase().trim()

    console.log(search)

    product = product.filter(e => e.name.toLowerCase().includes(search))

    let totalPages = Math.ceil(product.length / itemsPerPage)
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    let currentItems = product.slice(startIndex, endIndex);


    let print = ""
    for (const index in currentItems) {
        print = print + `
         <tr>
                <td>${currentItems[index].id}</td>
            <td><img src="${currentItems[index].img}" alt="Product Image" width="100px" /></td>
                <td>${currentItems[index].name}</td>
                <td>${currentItems[index].price}</td>
                <td>${currentItems[index].stock}</td>
                <td>${categories.find(el => el.id == currentItems[index].category).name}</td>
                <td>
                <button onclick="updateBtn(${currentItems[index].id})">アップデート</button>
                <button onclick="deleteBtn(${currentItems[index].id})">削除</button>
                  </td>
                </tr>
        `
    }

    // console.log(categories)
    productItem.innerHTML = print;

    let printPage = ""

    for (let i = 1; i <= totalPages; i++) {
        printPage += `<button onclick="changePage(${i})">${i}</button>`
    }

    pagination.innerHTML = printPage;

}

productPriceSortInput.onclick = function () {
    render()
}

function deleteBtn(deleteIndex) {
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let deleteArr = product.findIndex((e) => e.id === deleteIndex);
    product.splice(deleteArr, 1);
    window.localStorage.setItem("product", JSON.stringify(product))
    render()
}


function updateBtn(updataId) {
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let updataIndex = product.findIndex((e) => e.id === updataId);
    checkViet = updataIndex
    productNameInput.value = product[checkViet].name
    productModal.style.display = "block";
    addProductBtn.textContent = "変更しますか!"
}



function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('image-product').src = reader.result
        imageBase64 = reader.result
    }
    reader.readAsDataURL(file);
}





function showCategories() {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    productCategoryInput.innerHTML = `<option value="0" disabled >カテゴリー選択</option>
`
    categories.forEach(element => {
        const option = document.createElement('option')
        option.value = element.id
        option.textContent = element.name
        productCategoryInput.appendChild(option)
    });
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    render();
}

showCategories()



searchBtn.addEventListener("click", function () {
    render()
})

render()