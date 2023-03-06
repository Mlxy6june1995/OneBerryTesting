var express = require("express");
var router = express.Router();
var csv = require("csvtojson");
var resolve = require('path').resolve

async function retrieveProcedureData(fileName)
{
    try
    {
        //var fileName= __dirname+"/government-procurement-via-gebiz_1-3-2023_13-38-16.csv";
        var procedure = await csv().fromFile(__dirname+"/"+fileName);
        return procedure;
    }
    catch(e)
    {
        return e;
    }
}

router.post("/", function(req, res)
{
    try
    {
        retrieveProcedureData(req.body.upload).then(result =>
        {
            res.json(result);
        });
    }
    catch(e)
    {
        console.log(e);
    }
});
module.exports = router;

