import React from 'react'
import * as d3 from 'd3'
import '../../assets/main.css'

'use strict'


const width = 300,
  height = 200,
  margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }, 
  w = width,
  h = height - margin.top;

class SinePanel extends React.Component{
	constructor(props){
		super(props);
        this.state={
        	yData: this.props.yData,
        	xData: this.props.xData,
        	oscs: this.props.oscs
        }
		
	}

	numArray(xData){
      return xData/10 > 1 ? xData/10 : 1 ;
	}

	computeDataArray(xData, yData){
		let num = this.numArray(xData),
		    array = [];
		array = d3.range(num).map((d) => [d , ( (d == 0 || d == parseInt(num) ) ? Math.sin(yData )/2 : (Math.sin((d % 2 ) * yData) ) ) ])
		return array;
	}

	computeLine(x, y, initCurve = d3.curveBasis, curColor = "blue"){
        let dataPoints = this.computeDataArray(x, y),
            primaryRange = this.computeDataArray(this.state.xData, 20* this.state.yData);
        let xScale = d3.scaleLinear()
                    .domain([0, d3.max(dataPoints, (d) => d[0]) ] )
                    .range([0, w]);
        let yScale = d3.scaleLinear()
                    .domain([d3.min(dataPoints, (d) => d[1]), d3.max(dataPoints, (d) => d[1])] )
                    .range([h - ( Math.abs(d3.min(primaryRange, (d) => d[1]) ) ), 
                    	h - (200 - d3.max(primaryRange, (d) => d[1])  ) ]);
		this.lineGenerator = d3.line()
		    .x(function(d){
		    	return xScale(d[0])
		    })
		    .y(function(d){
		    	return yScale(d[1])
		    })
		    .curve(initCurve);
        this.pathData = this.lineGenerator(dataPoints);    
        this.svg.append("path").transition().attr("d", this.pathData).attr("stroke", curColor).attr("fill", "transparent");

	}

	iterateLines(x, y){
	  let oscNum = this.state.oscs,
	      color= d3.scaleOrdinal().range(d3.schemeCategory10);
	  this.svg.selectAll("path").remove();

      if(oscNum > 1){
      	for(var i = 0 ; i < oscNum; i++){
	  	  let yValue = Math.pow(y, (i-2.18)/2)*2,
  	          xValue = x * Math.pow(2, 1 + .5 + ((i - 1)/2) ) / 10;

          if(i == 0){
          	this.computeLine(x, y);
          } else {
          	this.computeLine(xValue, yValue, d3.curveBasis, color(i) );
          }

	    }
      }else {
      	this.computeLine(x, y);
      }

	}

	componentDidMount(){
	  this.svg = d3.select("#oscillator").append("svg").attr("x", w).attr("height", 175).style("margin-top", 5 + "px");
      this.iterateLines(this.state.xData, this.state.yData);
	}

    componentDidUpdate(prevProps){
    	if(this.props.yData != prevProps.yData){
    		this.setState({
    		  yData: this.props.yData
    		}, () => {
    			this.iterateLines(this.state.xData, this.state.yData)
    		})
    	}

    	if(this.props.xData != prevProps.xData){
    		this.setState({
    		  xData: this.props.xData
    		}, () => {this.iterateLines(this.state.xData, this.state.yData)})
    	}
        
        if(this.props.oscs != prevProps.oscs){
        	this.setState({
        		oscs: this.props.oscs
        	}, () => {
        		this.iterateLines(this.state.xData, this.state.yData)
        	})
        }

    }
   
    render(){

    	return(
          <div className={"ui-panel sine-panel"}>
            <div id={"oscillator"}>
               
            </div>
          </div>
     
    	)
    }

}

export default SinePanel