import React from "react";
import { Component } from 'react';
import { withRouter } from "react-router";
import axios from "axios";

import ProcedureData from "../Components/ProcedureData";
import GraphicalModal from "../Components/GraphicalModal";

import "../App.css"
import "../css/ProcedurePage.css"

class ProcedurePage extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      procedureData: [],
      graphData: [],
      datatoBeCollected: [],
      collectedData: [],
      xAxis: "",
      yAxis: "",
      title: "",
      type: ""
    };
  }

  onUpload = async (e) =>
  {
    try
    {
        e.preventDefault();
        var uploadFile = document.getElementById("myFile").files[0].name;
        if(uploadFile.split(".")[1] === "csv")
        {
          await this.retrieveProcedureData(uploadFile);
        }
        else
        {
          alert("The file that contains the data is in csv file.");
        }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  async retrieveProcedureData(file)
  {
    try
    {
      let res = await axios.post("http://18.136.201.57:3001/retrieveProcedureData", {upload: file});
      let data = await res.data;
      if(data != [])
      {
        this.setState({procedureData:data});
        alert("Upload successfully");
      }
      else
      {
        alert("Upload not successfully");
      }
    }
    catch(e)
    {
      console.log(e.code);
      console.log(e.message);
      console.log(e.stack);
    }
  }

  setData = async(value) =>
  {
    this.setState({graphData: value});
  }
  
  async collectingData(e)
  {  
    var selectedView = document.getElementById("viewing").value;
    var procedure_data = this.state.graphData;    
    if(procedure_data.length > 0)
    {
      if(selectedView === "noOfProject")
      {      
        var temp = [];
        var noOfProject = [];     
          for(var i = 0; i < procedure_data.length; i++)
          {
            if(temp.indexOf(procedure_data[i].agency) === -1)
            {
              temp.push(procedure_data[i].agency);
              var data = {};
              data.label = procedure_data[i].agency;
              data.y = 1;
              noOfProject.push(data);
            } 
            else
            {
              for(var j = 0; j < noOfProject.length; j++)
              {
                if(noOfProject[j].label === procedure_data[i].agency)
                {
                  var total = 1 + noOfProject[j].y;
                  noOfProject[j].y = total;
                }
              }
            }
          } 
          this.setState({collectedData: noOfProject});
          this.setState({xAxis: "Agency"});
          this.setState({yAxis: "No of project"});
          this.setState({title: "No. of project from each agency"});
          this.setState({type: "column"});
      }
      else if(selectedView === "totalAwardAmt")
      {
        var result = {};

        procedure_data.forEach(function(d) 
        {
          if (result.hasOwnProperty(d.agency)) 
          {
            result[d.agency] = result[d.agency] + parseInt(d.awarded_amt);
          } 
          else 
          {
            result[d.agency] = parseInt(d.awarded_amt);
          }
        });

        var data = [];
        for (var prop in result) 
        {
          data.push({label: prop, y: result[prop] });
        }

        this.setState({collectedData: data});
        this.setState({xAxis: "Agency"});
        this.setState({yAxis: "Total Awarded Amt"});
        this.setState({title: "Total Awarded Amt from Each Agency"});
        this.setState({type: "column"});
      }
      if(selectedView === "noOfProjectLine")
      {      
        var temp = [];
        var noOfProject = [];     
          for(var i = 0; i < procedure_data.length; i++)
          {
            if(temp.indexOf(procedure_data[i].award_date) === -1)
            {
              temp.push(procedure_data[i].award_date);
              var data = {};
              data.label = procedure_data[i].award_date;
              data.y = 1;
              noOfProject.push(data);
            } 
            else
            {
              for(var j = 0; j < noOfProject.length; j++)
              {
                if(noOfProject[j].label === procedure_data[i].award_date)
                {
                  var total = 1 + noOfProject[j].y;
                  noOfProject[j].y = total;
                }
              }
            }
          } 

          var sort_data = noOfProject.sort((a, b) => 
          {
            a = a["label"].split('/');
            b = b["label"].split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
          })

          this.setState({collectedData: sort_data});
          this.setState({xAxis: "Date"});
          this.setState({yAxis: "No of project"});
          this.setState({title: "No. of project from Each Date"});
          this.setState({type: "line"});
      }
      else if(selectedView === "totalAwardAmtLine")
      {
        var result = {};

        procedure_data.forEach(function(d) 
        {
          if (result.hasOwnProperty(d.award_date)) 
          {
            result[d.award_date] = result[d.award_date] + parseInt(d.awarded_amt);
          } 
          else 
          {
            result[d.award_date] = parseInt(d.awarded_amt);
          }
        });

        var data = [];
        for (var prop in result) 
        {
          data.push({label: prop, y: result[prop] });
        }

        var sort_data = data.sort((a, b) => 
          {
            a = a["label"].split('/');
            b = b["label"].split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
          })

        this.setState({collectedData: sort_data});
        this.setState({xAxis: "Date"});
        this.setState({yAxis: "Total Awarded Amt"});
        this.setState({title: "Total Awarded Amt from Each Date"});
        this.setState({type: "line"});
      }
    }
    else
    {
      alert("There is no data being passed to the graph.");
    }
  }

  render()
  {
    return (
      <>
        <h1 id = "title"> Load Data </h1>  
        <b>Upload File</b>
        <br/>
        <b>1. Press the choose file button to upload the file</b>
        <br/>
        <b>2. Press the Load Data button to populate the table</b>
        <br/>
        <form id="uploadForm" onClick={(e) => e.stopPropagation()}  onSubmit={this.gettingFileName}>
            <input type="file" id="myFile" name="filename"/>
            <br/>
            <input type = "Submit" onClick = {this.onUpload} value = "Load Data"/>
        </form>
        <h1 id = "title"> Procedure Data </h1>  
        <ProcedureData procedure = {this.state.procedureData} onPassingData = {this.setData}  />
        <h1 id = "title"> Graphical Modal </h1>
        <br/>
        <b>Loading the Data To Display as a Graph/Chart</b>
        <br/>
        <select name="viewing" id="viewing">
          <option value = "" hidden>Select Ways To View Data</option>
          <option value="noOfProject"> No Of Project From Each Agency</option>
          <option value="totalAwardAmt"> Total Awarded Amount From Each Agency</option>
          <option value="noOfProjectLine"> No Of Project From Each Date</option>
          <option value="totalAwardAmtLine"> Total Awarded Amount From Each Date</option>
        </select>
        <br/>
        <button onClick = {(e) => {e.stopPropagation(); this.collectingData(e)}}>
          Load Graph
        </button>
        <br/>
        <br/>
        <br/>
        <GraphicalModal collectedData = {this.state.collectedData} xAxis = {this.state.xAxis} yAxis = {this.state.yAxis} title = {this.state.title} type = {this.state.type}/>
      </>
    );
  }
}

export default withRouter(ProcedurePage);