const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});



connection.connect(function(err){
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  listProducts();
});

function listProducts() {
  // Gathering everything from the products table.
  connection.query('select * from products', function(err, res){
    if (err) throw err;
    console.table(res);
    // console.log(res[0])
    start();
  });
};




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



function start(){
    inquirer.prompt([
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
        connection.query('select * from products where ?',[                      {
                    id: answer.itemNum
                 }], function(err, res) {
            if(err) throw err; 
            
            // console.log(res[0].price);
            // console.log(answer.itemQuant)

            if(answer.itemQuant > res[0].stock_quantity){
             console.log(`
             Insufficient quantity!
             `)
                listProducts()
            }else{

                console.log(`
                Your purchase of ${answer.itemQuant} ${res[0].product_name} will be processed and you will be charge $${(parseInt(answer.itemQuant) * res[0].price).toFixed(2)}          
                
                `)

                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: res[0].stock_quantity-answer.itemQuant
                    },
                    {
                        id: answer.itemNum
                    }
                ], function(error){

                    if(err) throw err; 

                    console.log(`
                    Order Completed!!!
                    `);

                    listProducts();

                })

                

            }

            


        
        
        
        })










        })

    }

