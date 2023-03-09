import React, { Component } from "react";
import axios from "axios";

import "../App.css"

class ProcedureData extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      procedure: [],
      unsort: [],
      filter: "",
      criterias: "",
      sorting_criterias: "",
      sorting_way: "",  
    };
  }
  
  componentWillReceiveProps(props)
  {
    this.setState({procedure: props.procedure});
  }

  async retrieveProcedureData(file)
  {
    try
    {
      let res = await axios.post("http://18.141.147.126:3001/retrieveProcedureData", {upload: file});
      let data = await res.data;
      if(data != [])
      {
        this.setState({procedureData:data});
        console.log("Upload successfully");
      }
      else
      {
        console.log("Upload not successfully");
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  filterTxt = (e) =>
  {
    this.setState({filter: e.target.value});
  }

  handlerChange = (e) => 
  {
      const{name,value}= e.target;
      this.setState({[name]:value});
  };

  async onDateRange()
  {
    var start = document.getElementById("startDate").value;
    var startSplit = start.split("-");
    var startDay = parseInt(startSplit[2]);
    var startMonth = parseInt(startSplit[1]);

    var end = document.getElementById("endDate").value;
    var endSplit = end.split("-");
    var endDay = parseInt(endSplit[2]);
    var endMonth = parseInt(endSplit[1]);

    if(startMonth > endMonth)
    {
      alert("Please choose the right date range.");
    }
    else if(startMonth === endMonth)
    {
      if(startDay > endDay)
      {
        alert("Please choose the right date range.");
      }
      else
      {
        this.searchDateRange(startDay, startMonth, endDay, endMonth);
      }
    }
    else
    {
      if(startDay > endDay)
      {
        alert("Please choose the right date range.");
      }
      else
      {
       this.searchDateRange(startDay, startMonth, endDay, endMonth);
      }
    }
  }

  async searchDateRange(startDay, startMonth, endDay, endMonth)
  {
    var procedureDateWithin = this.state.procedure;
    var temp = [];
    var withinDateRange = [];
    for(var i = 0; i < procedureDateWithin.length; i++)
    {
      var monthEntry = procedureDateWithin[i]["award_date"].split("/")[1];
      if(startMonth <= parseInt(monthEntry))
      {
        var dayEntry = procedureDateWithin[i]["award_date"].split("/")[0];
        if(startDay <= parseInt(dayEntry))
        {
          temp.push(procedureDateWithin[i]);
        }
      }
    }
    for(var i = 0; i < temp.length; i++)
    {
      var monthEntry = temp[i]["award_date"].split("/")[1];
      if(parseInt(monthEntry) <= endMonth)
      {
        console.log(temp[i]["award_date"]);
        var dayEntry = temp[i]["award_date"].split("/")[0];
        if(parseInt(dayEntry) <= endDay)
        {
          withinDateRange.push(temp[i]);
        }
      }
    }
    this.setState({procedure:withinDateRange});
  }

  criteriasAsSorting(e)
  {
    console.log(e.target.id);
    //document.getElementById("chosenCriteria").value = e.target.id;
    this.setState({sorting_criterias: e.target.id});
  }


  async sortingWay(value)
  {
    await this.setState({sorting_way: value});
    this.sortEntry();
  }

  sortEntry()
  {
    var unsort = this.state.procedure;
    if(this.state.sorting_criterias === "")
    {
      alert("Please make sure to choose your criteria by clicking on it.\nChosen Criteria: None\nSorting Arrangement: Not Chosen");
    }
    else
    {
      alert("Please make sure to choose your criteria by clicking on it.\nChosen Criteria: "+this.state.sorting_criterias+"\nSorting Arrangement: "+this.state.sorting_way);
      if(this.state.sorting_way === "ascending")
      { 
        if(this.state.sorting_criterias === "awarded_amt")
        {
          var data = unsort.sort((a, b) => a[this.state.sorting_criterias] - b[this.state.sorting_criterias]);
          this.setState({procedure:data});
        }
        else if(this.state.sorting_criterias === "award_date")
        {
           var data = this.state.procedure.sort((a, b) => {
            a = a["award_date"].split('/');
            b = b["award_date"].split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
            })
            this.setState({procedure:data});
        }
        else 
        {
          var compare = (a,b) => a[this.state.sorting_criterias].localeCompare(b[this.state.sorting_criterias]);
          var data = unsort.sort(compare);
          this.setState({procedure:data});
        }
      }
      else if(this.state.sorting_way === "descending")
      {
        if(this.state.sorting_criterias === "awarded_amt")
        {
          var data = unsort.sort((a, b) => b[this.state.sorting_criterias] - a[this.state.sorting_criterias]);
          this.setState({procedure:data});
        }
        else if(this.state.sorting_criterias === "award_date")
        {
           var data = unsort.sort((a, b) => {
            a = a["award_date"].split('/');
            b = b["award_date"].split('/');
            return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
            })
            this.setState({procedure:data});
        }
        else 
        {
          var compare = (a,b) => b[this.state.sorting_criterias].localeCompare(a[this.state.sorting_criterias]);
          var data = unsort.sort(compare);
          this.setState({procedure:data});
        }
      }
    }
  }

  async onSelectedEntries()
  {
    try
    {
      var startEntry = parseInt(document.getElementById("start").value)-1;
      var endEntry = parseInt(document.getElementById("end").value)-1;
      if(startEntry < endEntry)
      {
        var slicedArray = this.state.procedure.slice(startEntry, endEntry);
        this.setState({procedure:slicedArray});
      }
      else
      {
        alert("Please choose the correct range of entries you preferred.");
      }
    }
    catch(e)
    {
      console.log(e.code);
      console.log(e.message);
      console.log(e.stack);
    }
  }

  onPassData = async (e) =>
  {
    try
    {
      this.props.onPassingData(this.state.procedure);
    }
    catch(e)
    {
      console.log(e.code);
      console.log(e.message);
      console.log(e.stack);
    }
  }

  onSaveData = async () =>
  {
    try
    {
      let res = await axios.post("http://13.215.200.30:3001/savingCustomizedData", {procedureData: this.state.procedure});
      let data = await res.data;
      console.log(data);
      window.location.reload(false);
    }
    catch(e)
    {
      console.log(e.code);
      console.log(e.message);
      console.log(e.stack);
    }
  }

  render()
  {
    var {criterias, procedure} = this.state;


    //Search Function
    let Datasearch = (procedure.length <= 0)?
                      (null):
                      ( 
                          (criterias === "")?
                          (procedure):
                          (procedure.filter(item => 
                          {
                              return Object.keys(item).some(key =>
                              item[criterias].toLowerCase().includes(this.state.filter.toLowerCase()))
                          }))
                    );


    return (
      <div>

        <b>Search:</b>
        <br/>
        <b>1. Select the criteria in the select box</b>
        <br/>
        <b>2. Type the filter you need to search</b>
        <br/>
        <select name="criterias" id="criterias" onChange={this.handlerChange}>
          <option value = "" hidden>Select Criteria</option>
          <option value="tender_description">Tender Description</option>
          <option value="agency">Agency</option>
          <option value="tender_detail_status">Tender Detail Status</option>
          <option value="supplier_name">Supplier_Name</option>
          <option value="awarded_amt">Awarded Amt</option>
        </select>
        <input type="text" value = {this.state.filter} onChange = {this.filterTxt} placeholder="Enter your filter">
        </input>
        <br/>
        <br/>
        <b> Search by Date Range:</b>
        <br/>
        <b>1. Select the date in the text box. Left is the start date and right is end date</b>
        <br/>
        <input type="date" id="startDate" name="date-start" min="2016-01-01" max="2016-12-31"/> 
        &nbsp; <b> to </b> &nbsp;
        <input type="date" id="endDate" name="date-end" min="2016-01-01" max="2016-12-31"/>
        <br/>
        <button id = "dateRange" onClick = {(e) => this.onDateRange()}>
          Search
        </button>
        <br/>
        <br/>

        <b>Sort:</b>
        <br/>
        <b>1. Select the criteria that you want to sort in the table</b>
        <br/>
        <b>2. Press on the button of yr preferred way to sort</b>
        <br/>
        <button id = "ascending" onClick = {(e) => this.sortingWay(e.target.id)}>
          Ascending
        </button>
        &nbsp;
        <button id = "descending" onClick = {(e) => this.sortingWay(e.target.id)}>
          Descending
        </button>
        <br/>
        <br/>

        <b>The entries to be view:</b>
        <br/>
        <b>1. Type the entry range on both text box</b>
        <br/>
        <b>2. Pressed the selected entries button.</b>
        <br/>
        <input type="text" id="start" placeholder="start"/>&nbsp;
        <b id = "word">to</b>&nbsp;
        <input type="text" id="end" placeholder="end"/>
        <br/>
        <button id = "selectedEntries" onClick = {(e) => this.onSelectedEntries(e)}>
          Selected Entries
        </button>
        <br/>
        <br/>

        <b>Pass Data To Display Graph/Chart</b>
        <br/>
        <b>Passing the data for displaying</b>
        <br/>
        <button id = "pass" onClick = {this.onPassData}>
          Pass Data
        </button>
        <br/>
        <br/>

        <b>Save File</b>
        <br/>
        <b>Save the file in csv format in the backend/data folder</b>
        <br/>
        <button id = "save" onClick = {this.onSaveData}>
          Save Data
        </button>

        <div id = "scrollTable" className = "scrollTable">
          <table className="procedureData">
            <tr>
              <th id = "tender_no." onClick={(e) => this.criteriasAsSorting(e)}>Tender No.</th>
              <th id ="tender_description" onClick={(e) => this.criteriasAsSorting(e)}>Tender Description</th>
              <th id = "agency" onClick={(e) => this.criteriasAsSorting(e)}>Agency</th>
              <th id = "award_date" onClick={(e) => this.criteriasAsSorting(e)}>Award Date</th>
              <th id = "tender_detail_status" onClick={(e) => this.criteriasAsSorting(e)}>Tender Detail Status</th>
              <th id = "supplier_name" onClick={(e) => this.criteriasAsSorting(e)}>Supplier Name</th>
              <th id = "awarded_amt" onClick={(e) => this.criteriasAsSorting(e)} >Awarded Amount(S$)</th>
            </tr>
            {
              (procedure.length <= 0)?
              (null):
              (
                Datasearch.map((entry, i) => 
              (
                <>
                <tr>
                  <td>{entry.tender_no}</td>
                  <td>{entry.tender_description}</td>
                  <td>{entry.agency}</td>
                  <td>{entry.award_date}</td>
                  <td>{entry.tender_detail_status}</td>
                  <td>{entry.supplier_name}</td>
                  <td>{entry.awarded_amt}</td>
                  </tr>
                  </>
              )
              )
            )
          }          
          </table>
        </div>
      </div>
    );
  }
}

export default ProcedureData;