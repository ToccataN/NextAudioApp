import React from 'react'
import * as d3 from 'd3'
import '../../assets/main.css'

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
        	xData: this.props.xData
        }
		
	}

	numArray(xData){
      return xData/10 > 1 ? xData/10 : 1 ;
	}

	computeDataArray(xData, yData){
		let num = this.numArray(xData),
		    array = [];
		array = d3.range(num).map((d) => [d , ( (d == 0 || d == parseInt(num) ) ? Math.sin(yData )/2 : Math.sin((d % 2 ) * yData) ) ])
		return array;
	}

	computeLine(){
        let dataPoints = this.computeDataArray(this.state.xData, this.state.yData);
        let xScale = d3.scaleLinear()
                    .domain([0, d3.max(dataPoints, (d) => d[0]) ] )
                    .range([0, w]);
        let yScale = d3.scaleLinear()
                    .domain([0, .2] )
                    .range([h - 20, h - 225]);
		
		this.lineGenerator = d3.line()
		    .x(function(d){
		    	return xScale(d[0])
		    })
		    .y(function(d){
		    	return yScale(d[1])
		    })
		    .curve(d3.curveBasis);
        this.pathData = this.lineGenerator(dataPoints);
        this.svg.select("path").remove();
        this.svg.append("path").attr("d", this.pathData).attr("stroke", "blue");
	}

	componentDidMount(){
	  this.svg = d3.select("#oscillator").append("svg").attr("x", w).attr("height", 175).style("margin-top", 5 + "px");
      this.computeLine();
	}

    componentDidUpdate(prevProps){
    	if(this.props.yData != prevProps.yData || this.props.xData != prevProps.xData){
    		this.setState({
    		  yData: this.props.yData,
        	  xData: this.props.xData
    		}, () => {this.computeLine()})
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