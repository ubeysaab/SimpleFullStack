const express =require('express')
const app = express()
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config()//so we can access it 
app.use(cors())//that when we having an incoming API call it'll not block   and we'll able to send data to our backend
app.use(express.json()); // to be able to send data in JSON format
app.use(express.urlencoded({ extended: false })); //  because we not gonna be sending in any form data



// database and its services we can adding it to here
const dbService = require("./dataBaseServices");


//! Create 
app.post("/insertProducts", (request, response) => {
  const {ProductName,SupplierID,CategoryID,
    QuantityPerUnit,UnitPrice,UnitsInStock,
    UnitsOnOrder,ReOrderLevel,Discounted}=request.body
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewProducts(ProductName,SupplierID,CategoryID,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder,ReOrderLevel,Discounted);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//! Create 
app.post("/insert", (request, response) => {
  const {CompanyName,
    ContactName,
    ContactTitle,
    Address,
    City,
    Region,
    PostaCode,

    Country,
    Phone,
    Fax}=request.body
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewCustomer(CompanyName,
    ContactName,
    ContactTitle,
    Address,
    City,
    Region,
    PostaCode,
    Country,
    Phone,
    Fax);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});


app.post("/insertEmployees", (request, response) => {
  const {LastName,FirstName,
    Title,BirthDate,HireDate,
    Address,City,Region,PostalCode,Country,HomePhone,Extension}=request.body
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewEmployees(LastName,FirstName,
    Title,BirthDate,HireDate,
    Address,City,Region,PostalCode,Country,HomePhone,Extension);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});


//! Read


app.get("/getAllProducts", (request, response) => {
  // first check for dbinstance
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromProducts(); //when we call this is actually gonna return a promise
  result
    .then((data) => response.json({ data: data })) // burada cevabimiz network icinde cikacaktir
    .catch((err) => console.log(err)); // we wanna do any error handling assume  the worst cases

  console.log('test Get All1')//so when we make an API call we can see that we reached our backend
  // response.json(
  //   {
  //     success:true,

  //   }
  // );
});
app.get("/getAll", (request, response) => {
  // first check for dbinstance
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromCustomers(); //when we call this is actually gonna return a promise
  result
    .then((data) => response.json({ data: data })) // burada cevabimiz network icinde cikacaktir
    .catch((err) => console.log(err)); // we wanna do any error handling assume  the worst cases

  console.log('test Get All1')//so when we make an API call we can see that we reached our backend
  // response.json(
  //   {
  //     success:true,

  //   }
  // );
});

app.get("/getAllEmployees", (request, response) => {
  
  const db = dbService.getDbServiceInstance();
  const result = db.getAllDataFromEmployees(); //when we call this is actually gonna return a promise
  result
    .then((data) => response.json({ data: data })) // burada cevabimiz network icinde cikacaktir
    .catch((err) => console.log(err)); // we wanna do any error handling assume  the worst cases

  console.log('test Get All1')//so when we make an API call we can see that we reached our backend
  // response.json(
  //   {
  //     success:true,

  //   }
  // );
});













//! Update
app.patch('/update',(request,response)=>{
  const {ProductID,ProductName,SupplierID,CategoryID,
    QuantityPerUnit,UnitPrice,UnitsInStock,
    UnitsOnOrder,ReOrderLevel,Discounted}=request.body
  const db=dbService.getDbServiceInstance()
  const result =db.updateProductById(ProductID,ProductName,SupplierID,CategoryID,
    QuantityPerUnit,UnitPrice,UnitsInStock,
    UnitsOnOrder,ReOrderLevel,Discounted)
  result.then(data=>response.json({success:data}))
  .catch(err=>console.log(err))

})

app.patch('/update1',(request,response)=>{
  const {LastName,FirstName,
    Title,BirthDate,HireDate,
    Address,City,Region,PostalCode,Country,HomePhone,Extension,EmployeesID}=request.body
  const db=dbService.getDbServiceInstance()
  const result =db.updateEmployeeById(LastName,FirstName,
    Title,BirthDate,HireDate,
    Address,City,Region,PostalCode,Country,HomePhone,Extension,EmployeesID)
  result.then(data=>response.json({success:data}))
  .catch(err=>console.log(err))

})













//! Delete
app.delete('/delete/:id',(request,response)=>{
  console.log(request.params)// request parameters  which is the data 
  const {id}=request.params
  const db=dbService.getDbServiceInstance()
  const result =db.deleteRowById(id)
  result.then(data=>response.json({success:data}))
  .catch(err=>console.log(err))
})

app.delete('/delete1/:id',(request,response)=>{
  console.log(request.params)// request parameters  which is the data 
  const {id}=request.params
  const db=dbService.getDbServiceInstance()
  const result =db.deleteRowById1(id)
  result.then(data=>response.json({success:data}))
  .catch(err=>console.log(err))
})
app.delete('/delete2/:id',(request,response)=>{
  console.log(request.params)// request parameters  which is the data 
  const {id}=request.params
  const db=dbService.getDbServiceInstance()
  const result =db.deleteRowById2(id)
  result.then(data=>response.json({success:data}))
  .catch(err=>console.log(err))
})



// ! Search 


//  searchProduct/ bunlar  Request Parameters
app.get('/searchProduct/:ProductName',(request,response)=>
{
  // console.log(request.params)
  const {ProductName}=request.params;
  // console.log(ProductName+"dd")
  const db=dbService.getDbServiceInstance()
  const result =db.searchByProductName(ProductName)
  result
  .then((data) => response.json({ data: data }))
  .catch((err) => console.log(err));

})


app.get('/searchEmployees/:ProductName',(request,response)=>
{
  // console.log(request.params)
  const {ProductName}=request.params;
  // console.log(ProductName+"dd")
  const db=dbService.getDbServiceInstance()
  const result =db.searchByEmployeesName(ProductName)
  result
  .then((data) => response.json({ data: data }))
  .catch((err) => console.log(err));

})
app.get('/searchCustomer/:customerName',(request,response)=>
{
  // console.log(request.params)
  const {customerName}=request.params;
  // console.log(customerName+"dd")
  const db=dbService.getDbServiceInstance()
  const result =db.searchByCustomerName(customerName)
  result
  .then((data) => response.json({ data: data }))
  .catch((err) => console.log(err));

})














//! Running local Server
app.listen(process.env.PORT,()=>{
  console.log('Server Is Running Now !!')
})