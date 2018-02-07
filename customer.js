//required to packages for this script to work
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//connection to mysql server change connection details accordingly.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});


//connects to MySQL DB --- error will throw errors.
connection.connect(function(err){
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  listProducts(); //starts
});



//displays the data from the products table and arranges it in cTable.
function listProducts() {
  // Gathering everything from the products table.
  connection.query('select * from products', function(err, res){
    if (err) throw err;
    console.table(res);
    // console.log(res[0])
    start();
  });
};



//ignore this for now... trying for myself.
function validate1(value, status)
{
    // console.log(value)
        
        //  connection.query('select * from products where ?',[                      {
        //         id: value
        //     }],  function (err, res){
        //        console.log(res)
                
        //        if(res.length===1){
        //            console.log("hi")
        //           status(true);
        //        }else{
        //         console.log("bye")
        //            status(false);
        //        }
            


        //   });
        
        return true;
        
    }


//main function to interact with user.
function start(){
    inquirer.prompt([  //ask user what item and quantities they want to obtain
        {
            name: "itemNum",
            type: "input",
            message: "Enter Item ID number ",
            validate: function(value) {
                if(isNaN(value) === false) {
                    return true;
                }else{
                    return false;
                }
            }   
        },
        {
            name: "itemQuant",
            type: "input",
            message: "Enter Quantity ammount: ",
            validate: function(value) {
                if(isNaN(value) === false) {
                    return true;
                }else{
                    return false;
                }
            }   
        }

    ]).then(function(answer){
        connection.query('select * from products where ?',[
            {
                    id: answer.itemNum
                }
            ], function(err, res) {
            if(err) throw err; 
            
            // console.log(res[0].price);
            // console.log(answer.itemQuant)

            if(answer.itemQuant > res[0].stock_quantity){ //checks if quantity selected is valid otherwise relist.
             console.log(`
             Insufficient quantity!
             `)
                listProducts()
            }else{
                console.log(`
                Your purchase of ${answer.itemQuant} ${res[0].product_name} will be processed and you will be charge $${(parseInt(answer.itemQuant) * res[0].price).toFixed(2)}          
                
                `); //updates the db with new quanitites. 
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: res[0].stock_quantity-answer.itemQuant
                    },
                    {
                        id: answer.itemNum
                    }
                ], function(error){

                    if(err) throw err; 
                    //when update is completed it will display button message
                    console.log(`
                    Order Completed!!! 
                    `);

                    listProducts();
                })
            }
        })
    })
}

