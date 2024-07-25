let btnAddCategory = document.getElementById("btn-submit-form");
let inputCategory = document.getElementById("category-inline");
let errorCategoryName = document.getElementById("error-category-name")
let btnCancelCategory = document.getElementById("btn-cancel-form");
let categoryData = document.getElementById("categoryData")
let updateTxt = document.querySelector("Update-txt")
let searchBtn = document.querySelector("#search-btn");
let searchInputText = document.getElementById("search-inputText");
let sortInput = document.getElementById("sort-input")


let idUpdateGlobal = null;



btnAddCategory.addEventListener("click", function () {
    const categoryName = inputCategory.value.trim();
    console.log(categoryName);


    if (!categoryName) {
        errorCategoryName.textContent = "nhập đầy đủ tên hộ mình"
    } else {
        const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];

        if (idUpdateGlobal) {
            let findIndexInputUpdate = dbCategory.findIndex((e) => e.id === idUpdateGlobal)
            dbCategory[findIndexInputUpdate].name = categoryName
            window.localStorage.setItem("categories", JSON.stringify(dbCategory));
            idUpdateGlobal = null
            btnAddCategory.textContent = "カテゴリー登録"
            inputCategory.value = "";

            renderCategory();
            return;
        }

        let id = 1;

        if (dbCategory.length > 0) {
            id = dbCategory[dbCategory.length - 1].id + 1;
        }

        let checkName = dbCategory.findIndex((category) => category.name.toLowerCase() === categoryName.toLowerCase());


        if (checkName === -1) {

            const newCategory = {
                id: id,
                name: categoryName,
            }

            dbCategory.push(newCategory);
            window.localStorage.setItem("categories", JSON.stringify(dbCategory))


            inputCategory.value = "";

            errorCategoryName.innerText = ""

            renderCategory();

        } else {
            errorCategoryName.innerText = "tên category trùng nhau"
        }
    }
});


btnCancelCategory.addEventListener("click", function () {

    inputCategory.value = ""
    errorCategoryName.innerText = ""

})



function renderCategory() {
    let dbCategory = JSON.parse(localStorage.getItem("categories")) || [];


    const filterName = searchInputText.value.trim().toLowerCase();


    dbCategory = dbCategory.filter((e) => e.name.toLowerCase().includes(filterName));

    const sortValue = sortInput.value;



    if (sortValue === "aes") {
        dbCategory.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "des") {
        dbCategory.sort((a, b) => b.name.localeCompare(a.name));
    }


    let print = "";
    for (let index = 0; index < dbCategory.length; index++) {

        print +=

            `
          <tr>
            <td>${dbCategory[index].id}</td>
            <td>${dbCategory[index].name}</td>
            <td>
            <button onclick="editCategory(${dbCategory[index].id})">アップデート</button>
            <button onclick="deleteCategory(${dbCategory[index].id})">削除</button>

            </td>
        </tr>
       `
    }

    categoryData.innerHTML = print;

}


renderCategory();


function deleteCategory(idDelete) {

    const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];

    let indexDelete = dbCategory.findIndex((e) => e.id === idDelete);


    dbCategory.splice(indexDelete, 1);

    window.localStorage.setItem("categories", JSON.stringify(dbCategory))


    renderCategory();


}

function editCategory(idEdit) {

    const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];

    let categoryName = dbCategory.find((e) => e.id === idEdit);


    if (categoryName) {
        inputCategory.value = categoryName.name;

        btnAddCategory.textContent = "アップデートしますか"

    }

    idUpdateGlobal = idEdit
}



searchBtn.addEventListener("click", function () {

    renderCategory()

})


sortInput.addEventListener("change", function () {
    renderCategory();
})