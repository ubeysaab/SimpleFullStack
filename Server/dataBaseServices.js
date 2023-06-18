const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

// ! Create connection to the data base
const connection = mysql.createConnection({
  // it's gonna object that requires some keys
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// ! Connection status
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Data Base Is : " + connection.state);
});

let sample;
//Todo : we will create a class is gonna contain all the functions that will be using to get all the data or update data or insert or delete
class DataBaseServices {
  // there is one instance of this class we don't wanna keep recreating an object of this class every time .
  // first create static function
  static getDbServiceInstance() {
    return sample ? sample : new DataBaseServices();
  }

  //! Create Function 1
  async insertNewProducts(
    productName,
    supplierId,
    categoryId,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reOrderLevel,
    discounted
  ) {
    try {
      //create a promise in our promise we're  gonna handle the query  so if the query is successful we resolve it other ways we gonna reject it so if reject is gonna go to our  catch  blok and the error gonna handle from there
      const insertId = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query =
          "INSERT INTO product (ProductName,SupplierID,CategoryID,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder,ReOrderLevel,Discounted) VALUES (?,?,?,?,?,?,?,?,?)"; // ! if we have any condition where we're passing in data like ( SELECT * FROM names where id = ?) you have a array in the line below
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(
          query,
          [
            productName,
            supplierId,
            categoryId,
            quantityPerUnit,
            unitPrice,
            unitsInStock,
            unitsOnOrder,
            reOrderLevel,
            discounted,
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
          }
        );
      });

      // console.log("bu Insert ID  sayfa her yuklediginde artiyorum :", insertId);
      return {
        ProductID: insertId,
        ProductName: productName,
        SupplierID: supplierId,
        CategoryID: categoryId,
        QuantityPerUnit: quantityPerUnit,
        UnitPrice: unitPrice,
        UnitsInStock: unitsInStock,
        UnitsOnOrder: unitsOnOrder,
        ReOrderLevel: reOrderLevel,
        Discounted: discounted,
      };
    } catch (error) {
      console.log(error);
    }
  }



  // ! Create Function 2
  async insertNewEmployees(
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
    Extension
  ) {
    try {
      const insertID = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO employees (LastName,FirstName,Title,BirthDate,HireDate,Address,City,Region,PostalCode,Country,HomePhone,Extension) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        connection.query(
          query,
          [
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
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            console.log(result)
            resolve(result.insertID);
          }
        );
      });

     
      return {
        EmployeesID:insertID,
        LastName: LastName,
        FirstName: FirstName,
        Title: Title,
        BirthDate: BirthDate,

        HireDate: HireDate,
        Address: Address,
        City: City,
        Region: Region,
        PostalCode: Postalcode,
        Country: Country,
        HomePhone: Homephone,
        Extension: Extension,
      
      };
    } catch (error) {
      console.log(error);
    }
  }

// ! Create Function 3 

  async insertNewCustomer(
    
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
  ) {
    try {
      const insertID = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO customer (CompanyName,ContactName,ContactTitle,Address,City,Region,PostaCode,Country,Phone,Fax) VALUES (?,?,?,?,?,?,?,?,?,?)";

        connection.query(
          query,
          [
            CompanyName,
      ContactName,
      ContactTitle,
      Address,
      City,
      Region,
      PostaCode,
      Country,
      Phone,
      Fax
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            console.log(result)
            resolve(result.insertID);
          }
        );
      });

     
      return {
        CustomerId:insertID,
        CompanyName: CompanyName,
        ContactName: ContactName,
        ContactTitle: ContactTitle,
     
        Address: Address,
        City: City,
        Region: Region,
        PostaCode: PostCode,
        Country: Country,
        Phone: phone,
        Fax: Fax,
      
      };
    } catch (error) {
      console.log(error);
    }
  }


































  // ! Read Function
  async getAllDataFromCustomers() {
    try {
      //create a promise in our promise we're  gonna handle the query  so if the query is successful we resolve it other ways we gonna reject it so if reject is gonna go to our  catch  blok and the error gonna handle from there
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer"; // ! if we have any condition where we're passing in data like ( SELECT * FROM names where id = ?) you have a array in the line below
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllDataFromProducts() {
    try {
      //create a promise in our promise we're  gonna handle the query  so if the query is successful we resolve it other ways we gonna reject it so if reject is gonna go to our  catch  blok and the error gonna handle from there
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM product"; // ! if we have any condition where we're passing in data like ( SELECT * FROM names where id = ?) you have a array in the line below
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDataFromEmployees() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM employees"; // ! if we have any condition where we're passing in data like ( SELECT * FROM names where id = ?) you have a array in the line below

        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // ! Update

  async updateProductById(
    productId,
    productName,
    supplierId,
    categoryId,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reOrderLevel,
    discounted,
    id
  ) {
    try {
      id = parseInt(id, 10); //base 10 we added it for some browsers
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query =
          "UPDATE product SET ProductName=?,SupplierID=?,CategoryID=?,QuantityPerUnit=?,UnitPrice=?,UnitsInStock=?,UnitsOnOrder=?,ReOrderLevel=?,Discounted=? WHERE ProductID=?"; 
        connection.query(
          query,
          [
            productName,
            supplierId,
            categoryId,
            quantityPerUnit,
            unitPrice,
            unitsInStock,
            unitsOnOrder,
            reOrderLevel,
            discounted,
            productId,
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          }
        );
      });
      console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }



  async updateEmployeeById(
    LastName,FirstName,
    Title,BirthDate,HireDate,
    Address,City,Region,PostalCode,Country,HomePhone,Extension,EmployeesID
  ) {
    try {
      EmployeesID = parseInt(EmployeesID, 10); //base 10 we added it for some browsers
      const response = await new Promise((resolve, reject) => {
       
        const query =
          "UPDATE employees SET LastName=?,FirstName=?,Title=?,BirthDate=?,HireDate=?,Address=?,City=?,Region=?,PostalCode=?,Country=?,HomePhone=?,Extension=? WHERE EmployeesID=?"; 
      
        connection.query(
          query,
          [
            LastName,FirstName,
            Title,BirthDate,HireDate,
            Address,City,Region,PostalCode,Country,HomePhone,Extension,EmployeesID
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          }
        );
      });
      console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }





































  // ! Delete
  async deleteRowById(id) {
    try {
      id = parseInt(id, 10); //base 10 we added it for some browsers
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query = "DELETE FROM product WHERE ProductID = ?"; // ! if we have any condition where we're passing in data like ( SELECT * FROM names where id = ?) you have a array in the line below
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteRowById1(id) {
    try {
      id = parseInt(id, 10); //base 10 we added it for some browsers
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query = "DELETE FROM employees WHERE EmployeesID = ?";
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteRowById2(id) {
    try {
      id = parseInt(id, 10); //base 10 we added it for some browsers
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query = "DELETE FROM customer WHERE CustomerId= ?";
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // ! Search Function
  async searchByProductName(productName) {
    try {
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query = "SELECT * FROM product WHERE ProductName=?"; // ! if we have any condition where we're passing in data like ( SELECT * FROM names where id = ?) you have a array in the line below
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(query, [productName], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("search : ", response);
      return response;
    } catch (error) {
      console.log(error);
      // return false;
    }
  }
  async searchByEmployeesName(productName) {
    try {
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query = "SELECT * FROM employees WHERE FirstName=?"; 
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(query, [productName], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("search : ", response);
      return response;
    } catch (error) {
      console.log(error);
      // return false;
    }
  }


  async searchByCustomerName(productName) {
    try {
      const response = await new Promise((resolve, reject) => {
        //the only thing we gonna change is from below the query and the way we handle it  inside query call back
        const query = "SELECT * FROM customer WHERE ContactName=?"; 
        // connection.query(query,[id]) so its parameterize a query value  so that we can prevent sql injection
        connection.query(query, [productName], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("search : ", response);
      return response;
    } catch (error) {
      console.log(error);
      // return false;
    }
  }
}

module.exports = DataBaseServices;
