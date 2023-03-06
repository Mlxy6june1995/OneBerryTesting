var retrieveProcedureData = require("../data/retrieveProcedureData");

class ProcedureData
{
    constructor()
    {
        this.tender_no = "",
        this.tender_description = "",
        this.agency = "",
        this.award_date = "",
        this.tender_detail_status = "",
        this.supplier_name = "",
        this.awarded_amt = 0
    }

    getTenderNo() 
    {
        return this.tender_no;
    }
    setTenderNo(tender_no) 
    {
        return this.tender_no = tender_no;
    }

    getTenderDescription() 
    {
        return this.tender_description;
    }
    setTenderDescription(tender_description) 
    {
        return this.tender_description = tender_description;
    }

    getAgency() 
    {
        return this.agency;
    }
    setAgency(agency) 
    {
        return this.agency = agency;
    }

    getAwardDate() 
    {
        return this.award_date;
    }
    setAwardDate(award_date) 
    {
        return this.award_date = award_date;
    }

    getTenderDetailStatus() 
    {
        return this.tender_detail_status;
    }
    setTenderStatusDetail(tender_detail_status) 
    {
        return this.tender_detail_status = tender_detail_status;
    }

    getSupplierName() 
    {
        return this.supplier_name;
    }
    setSupplierName(supplier_name) 
    {
        return this.supplier_name = supplier_name;
    }

    getAwardedAmt()
    {
        return this.awarded_amt;
    }
    setAwardedAmt(awarded_amt) 
    {
        return this.awarded_amt = awarded_amt;
    }

    
    RetrieveProcedureData()
    {
        return new Promise((resolve,reject) => 
        {
            retrieveProcedureData((result) =>
            {
                console.log(result);
                //console.log(result);
                //console.log(result);
                /*try
                {
                    resolve(result);
                }
                catch(e)
                {
                    reject(e);
                }*/
            })
        })  
    }
}

module.exports = ProcedureData;