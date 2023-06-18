addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/getAll")
    //todo : here we writing  PROMISES
    .then((response) => response.json())
    .then((data) => loadHtmlTable(data["data"]));
});

// table yukleme

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
      CustomerId,
      CompanyName,
      ContactName,
      ContactTitle,
      Address,
      City,
      Region,
      PostaCode,
      Country,
      Phone,
      Fax,
    }) => {
      tableHtml += "<tr>";
      tableHtml += `<td>${CustomerId}</td>`;
      tableHtml += `<td>${CompanyName}</td>`;
      tableHtml += `<td>${ContactName}</td>`;
      tableHtml += `<td>${ContactTitle}</td>`;
      tableHtml += `<td>${Address}</td>`;
 
      tableHtml += `<td>${City}</td>`;
      tableHtml += `<td>${Region}</td>`;
      tableHtml += `<td>${PostaCode}</td>`;

      tableHtml += `<td>${Country}</td>`;
      tableHtml += `<td>${Phone}</td>`;
      tableHtml += `<td>${Fax}</td>`;

      tableHtml += `<td><button class="delete-row-btn" data-id=${CustomerId}>Delete</button></td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id=${CustomerId}>Edit</button></td>`;
      tableHtml += "</tr>";
    }
  );
  table.innerHTML = tableHtml;
}


// ! Insert
const addBtn = document.querySelector(".add-customers-btn");
addBtn.onclick = function addingElement() {
  const companyNameInput = document.querySelector(".companyName-input");
  //grab the value  and after send it to the back end reset the input to empty string
  const companyName = companyNameInput.value;

  const contactNameInput = document.querySelector(".contactName-input");
  const contactName = contactNameInput.value;

  const contactTitleInput = document.querySelector(".contactTitle-input");
  const contactTitle = contactTitleInput.value;


  const adressInput = document.querySelector(".address-input");
  const address = adressInput.value;

  const regionInput = document.querySelector(".region-input");
  const region = regionInput.value;

  const postalCodeInput = document.querySelector(".postalCode-input");
  const postalCode = postalCodeInput.value;

  const countryInput = document.querySelector(".country-input");
  const country = countryInput.value;

  const phoneInput = document.querySelector(".phone-input");
  const phone = phoneInput.value;

  const faxInput = document.querySelector(".fax-input");
  const fax = faxInput.value;
  const cityInput = document.querySelector(".city-input");
  const city = cityInput.value;

  contactNameInput.value = " ";

  companyNameInput.value = " ";
  contactTitleInput.value = " ";

  adressInput.value = " ";
  cityInput.value = " ";
  regionInput.value = " ";
  postalCodeInput.value = " ";
  countryInput.value = " ";
  phoneInput.value = " ";
  fax.value = " ";

  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    //body is gonna iclude the json data
    body: JSON.stringify({
      
      CompanyName: companyName,
      ContactName: contactName,
      ContactTitle:contactTitle,
      Address:address ,
      City: city,
      Region:region ,
      PostaCode:postalCode,
      Country:country ,
      Phone: phone,
      Fax:fax 
    }),
  })
    // in our response here
    .then((response) => response.json())

    .then(() => console.log("successfully added"));
  location.reload();
};





// !Delete 
document
  .querySelector("table tbody  ")
  .addEventListener("click", function(event) {
    console.log(event.target); 
    if (event.target.className === "delete-row-btn") {
     
      deleteRowById(event.target.dataset.id);
    } else if (event.target.className === "edit-row-btn") {
      handleEditRow(event.target.dataset.id);
    }
  });

  function deleteRowById(id) {
    fetch("http://localhost:5000/delete2/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload();
        }
      });
  
  }



  
const searchBtn = document.querySelector(".customers-search-btn");

searchBtn.onclick = () => {
  const searchingValue = document.querySelector(".customers-search-input").value;
  console.log(searchingValue);
  fetch("http://localhost:5000/searchCustomer/"+searchingValue)
    //todo : here we writing  PROMISES
    .then((response) => response.json()) //we're always  gonna be expecting a json response
    .then((data) => loadHtmlTable(data["data"]));
};