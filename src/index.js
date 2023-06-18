addEventListener("DOMContentLoaded", () => {
  //document yuklediginde  veritabanindan veri cekecem  ve sonuclari tabloda gostermek istiyorum
  //there we will use our fetch api but backend doesn't set right now
  // before using fetch we need to run our local server so we can know  that's running
  fetch("http://localhost:5000/getAllProducts")
    //todo : here we writing  PROMISES
    .then((response) => response.json()) //we're always  gonna be expecting a json response
    .then((data) => loadHtmlTable(data["data"]));
});

function loadHtmlTable(data) {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML =
      "<tr><td class='no-data text-center font-medium' colspan='12'>No Data</td></tr>";
    return; //because if empty we don't wanna run any thing below this
  }
  //DECLARE A HTML TABLE IF THERE SOME DATA
  let tableHtml = "";
  console.log(data);
  data.forEach(
    ({
      ProductID,
      ProductName,
      SupplierID,
      CategoryID,
      QuantityPerUnit,
      UnitPrice,
      UnitsInStock,
      UnitsOnOrder,
      ReOrderLevel,
      Discounted,
    }) => {
      tableHtml += "<tr>";
      tableHtml += `<td>${ProductID}</td>`;
      tableHtml += `<td>${ProductName}</td>`;
      tableHtml += `<td>${SupplierID}</td>`;
      tableHtml += `<td>${CategoryID}</td>`;
      tableHtml += `<td>${QuantityPerUnit}</td>`;
      tableHtml += `<td>${UnitPrice}</td>`;
      tableHtml += `<td>${UnitsInStock}</td>`;
      tableHtml += `<td>${UnitsOnOrder}</td>`;
      tableHtml += `<td>${ReOrderLevel}</td>`;
      tableHtml += `<td>${Discounted}</td>`;
      tableHtml += `<td><button class="delete-row-btn" data-id=${ProductID}>Delete</button></td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id=${ProductID}>Edit</button></td>`;
      tableHtml += "</tr>";
    }
  );
  table.innerHTML = tableHtml;
}

// ! insert buradan basliyor canim
const addBtn = document.querySelector(".add-product-btn");
addBtn.onclick = function addingElement() {
  const productNameInput = document.querySelector(".productName-input");
  //grab the value  and after send it to the back end reset the input to empty string
  const productName = productNameInput.value;

  const supplierIdInput = document.querySelector(".supplierId-input");
  const supplierId = supplierIdInput.value;

  const categoryIdInput = document.querySelector(".categoryId-input");
  const categoryId = categoryIdInput.value;

  const quantityPerUnitInput = document.querySelector(".quantityPerUnit-input");
  const quantityPerUnit = quantityPerUnitInput.value;

  const unitPriceInput = document.querySelector(".unitPrice-input");
  const unitPrice = unitPriceInput.value;

  const unisInStockInput = document.querySelector(".unitsInStock-input");
  const unitsInStock = unisInStockInput.value;

  const unitsOnOrderInput = document.querySelector(".unitsOnOrder-input");
  const unitsOnOrder = unitsOnOrderInput.value;

  const reOrderLevelInput = document.querySelector(".reOrderLevel-input");
  const reOrderLevel = reOrderLevelInput.value;

  const discountedInput = document.querySelector(".discounted-input");
  const discounted = discountedInput.value;

  productNameInput.value= " ";
    supplierIdInput.value= " ";
    categoryIdInput.value= " ";
    quantityPerUnitInput.value= " ";
    unitPriceInput.value= " ";
    unisInStockInput.value= " ";
    unitsOnOrderInput.value= " ";
    reOrderLevelInput.value= " ";
    discountedInput.value = " ";

  fetch("http://localhost:5000/insertProducts", {
    headers: {
      //bu fetch icindeki her sey oldugu gibi yazilmalidir
      "Content-type": "application/json",
    },
    method: "POST",
    //body is gonna iclude the json data
    body: JSON.stringify({
      ProductName: productName,
      SupplierID: supplierId,
      CategoryID: categoryId,
      QuantityPerUnit: quantityPerUnit,
      UnitPrice: unitPrice,
      UnitsInStock: unitsInStock,
      UnitsOnOrder: unitsOnOrder,
      ReOrderLevel: reOrderLevel,
      Discounted: discounted,
    }),
  })
    // in our response here
    .then((response) => response.json())
    //then we gonna get the data
    // .then((data) => insertOneRowIntoTable(data["data"])); // so we gonna insert some data in our table  , data there gonna be an object bu we wanna just the data part of that object
    .then(()=>console.log('successfully added'))
    location.reload();
};


// ! Search buradan 
const searchBtn = document.querySelector(".product-search-btn ");

searchBtn.onclick = () => {
  const searchingValue = document.querySelector(".product-search-input").value;
  console.log(searchingValue);
  fetch("http://localhost:5000/searchProduct/"+searchingValue.trim())
    //todo : here we writing  PROMISES
    .then((response) => response.json()) //we're always  gonna be expecting a json response
    .then((data) => loadHtmlTable(data["data"]));
};


// ! Delete Buradan 
document
  .querySelector("table tbody  ")
  .addEventListener("click", function(event) {
    console.log(event.target); //hedef olan satiri yazdirir
    if (event.target.className === "delete-row-btn") {
      //now we will create a function and we'll send the id  to the that function and it will send it to the backend  and it will delete the row  from the data base
      deleteRowById(event.target.dataset.id);
    } else if (event.target.className === "edit-row-btn") {
      handleEditRow(event.target.dataset.id);
    }
  });
  function deleteRowById(id) {
    fetch("http://localhost:5000/delete/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload();
        }
      });
    // after we delete it  we would want to reload the table  so there several way that we can doing this
    // 1. we can  call loadHtmlTable to gets all data  or create new function that grabs all data again  from the table without refreshing the page  it would be just a fetch call then call load html table
  }
  
  // ! Update Function
const updateBtn = document.querySelector("#update-row-btn");
function handleEditRow(id) {
  const updateSection = document.querySelector(".edit-section");
  updateSection.hidden = false;
  document.querySelector("#update-row-btn").dataset.id = id; //id we grab it from event.target.dataset.id
}

updateBtn.onclick = () => {
  const productNameInput = document.querySelector(".productName-input");
  //grab the value  and after send it to the back end reset the input to empty string
  const productName = productNameInput.value;

  const supplierIdInput = document.querySelector(".supplierId-input");
  const supplierId = supplierIdInput.value;

  const categoryIdInput = document.querySelector(".categoryId-input");
  const categoryId = categoryIdInput.value;

  const quantityPerUnitInput = document.querySelector(".quantityPerUnit-input");
  const quantityPerUnit = quantityPerUnitInput.value;

  const unitPriceInput = document.querySelector(".unitPrice-input");
  const unitPrice = unitPriceInput.value;

  const unisInStockInput = document.querySelector(".unitsInStock-input");
  const unitsInStock = unisInStockInput.value;

  const unitsOnOrderInput = document.querySelector(".unitsOnOrder-input");
  const unitsOnOrder = unitsOnOrderInput.value;

  const reOrderLevelInput = document.querySelector(".reOrderLevel-input");
  const reOrderLevel = reOrderLevelInput.value;

  const discountedInput = document.querySelector(".discounted-input");
  const discounted = discountedInput.value;

  productNameInput.value= " ";
    supplierIdInput.value= " ";
    categoryIdInput.value= " ";
    quantityPerUnitInput.value= " ";
    unitPriceInput.value= " ";
    unisInStockInput.value= " ";
    unitsOnOrderInput.value= " ";
    reOrderLevelInput.value= " ";
    discountedInput.value = " ";
  // we gonna patch here so were not exactly  creating a new row in the table  we are updating something so  we're gonna  use patch in this case
  fetch("http://localhost:5000/update", {
    headers: {
      // if we don't write the headers  we gonna got empty object in our backend  , it won't be able to send data to the backend as we expected
      "Content-type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      ProductID: updateBtn.dataset.id,
      ProductName: productName,
      SupplierID: supplierId,
      CategoryID: categoryId,
      QuantityPerUnit: quantityPerUnit,
      UnitPrice: unitPrice,
      UnitsInStock: unitsInStock,
      UnitsOnOrder: unitsOnOrder,
      ReOrderLevel: reOrderLevel,
      Discounted: discounted,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};