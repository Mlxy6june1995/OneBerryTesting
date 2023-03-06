import React from "react";
import { Component } from 'react';
import CanvasJSReact from './canvasjs.react';

import "../App.css"
import "../css/ProcedurePage.css"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GraphicalModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            collected: [],
            xAxis: "",
            yAxis: "",
            title: "",
            type: "",
        };
    } 

    componentWillReceiveProps(props)
    {
        this.setState({data: props.collectedData});
        this.setState({xAxis: props.xAxis});
        this.setState({yAxis: props.yAxis});
        this.setState({title: props.title});
        this.setState({type: props.type});
    }

    render()
    {
        const options = {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: this.state.title
            },
            axisX: {
                title: this.state.xAxis,
                reversed: false,
            },
            axisY: {
                title: this.state.yAxis,
                includeZero: true,
                labelFormatter: this.addSymbols
            },
            data: [{
                type: this.state.type,
                dataPoints: this.state.data
            }]
        }

        return(
            <>
            <div>
                <CanvasJSChart options = {options}/>
            </div>
            </>
        );
        /*return (console.log(this.state.data));*/
    }
}

export default GraphicalModal;