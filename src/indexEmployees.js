addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/getAllEmployees")
    //todo : here we writing  PROMISES
    .then((response) => response.json())
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
      EmployeesID,
      LastName,
      FirstName,
      Title,
      BirthDate,
      HireDate,
      Address,
      City,
      Region,
      PostalCode,
      Country,
      HomePhone,
      Extension,
    }) => {
      tableHtml += "<tr>";
      tableHtml += `<td>${EmployeesID}</td>`;
      tableHtml += `<td>${LastName}</td>`;
      tableHtml += `<td>${FirstName}</td>`;
      tableHtml += `<td>${Title}</td>`;
      tableHtml += `<td>${BirthDate}</td>`;
      tableHtml += `<td>${HireDate}</td>`;
      tableHtml += `<td>${Address}</td>`;
      tableHtml += `<td>${City}</td>`;
      tableHtml += `<td>${Region}</td>`;
      tableHtml += `<td>${PostalCode}</td>`;
      tableHtml += `<td>${Country}</td>`;
      tableHtml += `<td>${HomePhone}</td>`;
      tableHtml += `<td>${Extension}</td>`;

      tableHtml += `<td><button class="delete-row-btn" data-id=${EmployeesID}>Delete</button></td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id=${EmployeesID}>Edit</button></td>`;
      tableHtml += "</tr>";
    }
  );
  table.innerHTML = tableHtml;
}

// ! insert buradan basliyor canim
const addBtn = document.querySelector(".add-employee-btn");
addBtn.onclick = function addingElement() {
  const lastNameInput = document.querySelector(".lastName-input");
  //grab the value  and after send it to the back end reset the input to empty string
  const lastName = lastNameInput.value;

  const firstNameInput = document.querySelector(".firstName-input");
  const firstName = firstNameInput.value;

  const titleInput = document.querySelector(".title-input");
  const title = titleInput.value;

  const birthDateInput = document.querySelector(".birthDate-input");
  const birthDate = birthDateInput.value;

  const hireDateInput = document.querySelector(".hireDate-input");
  const hireDate = hireDateInput.value;

  const adressInput = document.querySelector(".address-input");
  const adress = adressInput.value;

  const regionInput = document.querySelector(".region-input");
  const region = regionInput.value;

  const postalCodeInput = document.querySelector(".postalCode-input");
  const postalCode = postalCodeInput.value;

  const countryInput = document.querySelector(".country-input");
  const country = countryInput.value;

  const homephoneInput = document.querySelector(".homephone-input");
  const homephone = homephoneInput.value;

  const extensionInput = document.querySelector(".extension-input");
  const extension = extensionInput.value;
  const cityInput = document.querySelector(".city-input");
  const city = cityInput.value;

  lastNameInput.value = " ";

  firstNameInput.value = " ";
  titleInput.value = " ";
  birthDateInput.value = " ";
  hireDateInput.value = " ";
  adressInput.value = " ";
  cityInput.value = " ";
  regionInput.value = " ";
  postalCodeInput.value = " ";
  countryInput.value = " ";
  homephoneInput.value = " ";
  extensionInput.value = " ";

  fetch("http://localhost:5000/insertEmployees", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    //body is gonna iclude the json data
    body: JSON.stringify({
      LastName: lastName,
      FirstName: firstName,
      Title: title,
      BirthDate: birthDate,

      HireDate: hireDate,
      Address: adress,
      City: city,
      Region: region,
      PostalCode: postalCode,
      Country: country,
      HomePhone: homephone,
      Extension: extension,
    }),
  })
    // in our response here
    .then((response) => response.json())

    .then(() => console.log("successfully added"));
  location.reload();
};

const searchBtn = document.querySelector(".employee-search-btn");

searchBtn.onclick = () => {
  const searchingValue = document.querySelector(".employee-search-input").value;
  console.log(searchingValue);
  fetch("http://localhost:5000/searchEmployees/"+searchingValue)
    //todo : here we writing  PROMISES
    .then((response) => response.json()) //we're always  gonna be expecting a json response
    .then((data) => loadHtmlTable(data["data"]));
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
    fetch("http://localhost:5000/delete1/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload();
        }
      });
  
  }
  // ! Update
updateBtn=document.querySelector('#update-row-btn')

function handleEditRow(id) {
  const updateSection = document.querySelector(".edit-section");
  updateSection.hidden = false;
  document.querySelector("#update-row-btn").dataset.id = id; //id we grab it from event.target.dataset.id
}

updateBtn.onclick=()=>
{
  const lastNameInput = document.querySelector(".lastName-input");
  //grab the value  and after send it to the back end reset the input to empty string
  const lastName = lastNameInput.value;

  const firstNameInput = document.querySelector(".firstName-input");
  const firstName = firstNameInput.value;

  const titleInput = document.querySelector(".title-input");
  const title = titleInput.value;

  const birthDateInput = document.querySelector(".birthDate-input");
  const birthDate = birthDateInput.value;

  const hireDateInput = document.querySelector(".hireDate-input");
  const hireDate = hireDateInput.value;

  const adressInput = document.querySelector(".address-input");
  const adress = adressInput.value;

  const regionInput = document.querySelector(".region-input");
  const region = regionInput.value;

  const postalCodeInput = document.querySelector(".postalCode-input");
  const postalCode = postalCodeInput.value;

  const countryInput = document.querySelector(".country-input");
  const country = countryInput.value;

  const homephoneInput = document.querySelector(".homephone-input");
  const homephone = homephoneInput.value;

  const extensionInput = document.querySelector(".extension-input");
  const extension = extensionInput.value;
  const cityInput = document.querySelector(".city-input");
  const city = cityInput.value;

  lastNameInput.value = " ";

  firstNameInput.value = " ";
  titleInput.value = " ";
  birthDateInput.value = " ";
  hireDateInput.value = " ";
  adressInput.value = " ";
  cityInput.value = " ";
  regionInput.value = " ";
  postalCodeInput.value = " ";
  countryInput.value = " ";
  homephoneInput.value = " ";
  extensionInput.value = " ";
  fetch("http://localhost:5000/update1", {
    headers: {
      // if we don't write the headers  we gonna got empty object in our backend  , it won't be able to send data to the backend as we expected
      "Content-type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      EmployeesID:updateBtn.dataset.id,
      LastName: lastName,
      FirstName: firstName,
      Title: title,
      BirthDate: birthDate,

      HireDate: hireDate,
      Address: adress,
      City: city,
      Region: region,
      PostalCode: postalCode,
      Country: country,
      HomePhone: homephone,
      Extension: extension,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}