var express = require("express");
var router = express.Router();
const converter = require('json-2-csv')
const writeFile = require('fs').writeFile;
const csvjson = require('csvjson');
const { json } = require("express");

const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/`;

console.log(desktopDir);

   
router.post("/", function(req, res)
{
    var currentdate = new Date();

    var fileName = __dirname+"/government-procurement-via-gebiz"+ "_"
                + currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() +"_"
                + currentdate.getHours() + "-"  
                + currentdate.getMinutes() + "-" 
                + currentdate.getSeconds()+".csv";
    
    console.log(fileName);
    
    converter.json2csv(req.body.procedureData, (err, csv) =>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            writeFile(fileName, csv, (err) =>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.send("Save successfully");
                }
            })
        }
    })
});


module.exports = router;

