import React from 'react'
import {Knob} from 'react-rotary-knob'
import { skin1 } from '../assets/knobskin1'

class Rotary extends React.Component{
  constructor(props){
  	super(props);

  	this.state={
  		value: this.props.value,
  		function: this.props.onChange.bind(this),
        maxVal: Math.abs(this.props.max - this.props.min)/5
  	}
 
    this.handleOnChange = this.handleOnChange.bind(this);
    

  }
  
  handleOnChange(val){
  	 
  	 let distance = Math.abs(val - this.state.value),
  	     max = this.state.maxVal 

     if(distance > max){
     	return;
     } else {
     	this.setState({
     		value: val
     	}, this.state.function(val));
     }

  }
  
  render(){
  	let { value, ...properties} = this.props,
        rotateStyle ={
           transform: "rotate(-180deg)",
           display: 'flex',
           justifyContent: 'center'
        }, divStyle ={
           display: 'flex',
           flexFlow: 'column',
           marginTop: 20,
           justifyContent: 'center',
           textAlign: 'center'
        }

    return(
      <div className={"rotary-knob"} style={divStyle}>
        <Knob value={this.state.value} skin={skin1} style={rotateStyle}
          preciseMode={false} {...properties} onChange={this.handleOnChange}  />
          <h6 style={{marginTop: 10, marginBottom: 10}}> {this.props.name}: {Math.round(this.state.value*100)/100} </h6>
      </div>
    )
    	
  }

}

export default Rotary