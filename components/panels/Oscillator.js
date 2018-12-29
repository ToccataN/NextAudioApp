import React from 'react'
import  Rotary  from '../Rotary'

const oscStyle={
   width: 110,
   display: 'inline'
}

class Oscillator extends React.Component {
  constructor(props){
  	super(props);
  }
  
  render(){
    return(
      <div style={oscStyle} className={"osc-panel ui-panel"}>
        <div className={"osc-dec-inc"}>
           <button onClick={this.props.addOsc}><i className={"arrow-up"}> </i></button>
           <button onClick={this.props.subOsc}><i className={"arrow-down"}> </i></button>
        </div>
        <div className={"osc-num"}>
          {this.props.oscArray}
        </div>
        <h5> Harmonic Oscillators </h5>
      </div>
    )    	
  }
  

}

export default Oscillator