import React from 'react'
import  Rotary  from '../Rotary'
import '../../assets/main.css'


class MainPanel extends React.Component{
  constructor(props){
  	super(props);
  }
  

 
  render(){
  	return(
      <div className={"main-panel ui-panel"}>
        <button onClick={this.props.keyToggle}> {this.props.keyOn ? "Key Off" : "Key On"} </button>       
          <Rotary value={this.props.masterGain} onChange={this.props.changeMasterGain} min={0} max={.2} 
           unlockDistance={25} name={"Gain"} /> 
          <Rotary value={this.props.baseFrequency} min={20} max={800} onChange={this.props.changeBaseFrequency} 
           unlockDistance={25} name={"Frequency"}/> 
      </div>
  	)
  }

}

export default MainPanel