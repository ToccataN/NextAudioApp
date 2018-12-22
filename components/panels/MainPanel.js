import React from 'react'
import  Rotary  from '../Rotary'
import '../../assets/main.css'

const gainStyle ={
	display: "flex",
  flexFlow: "column",
  width: 150,
  justifyContent: 'center'
}

class MainPanel extends React.Component{
  constructor(props){
  	super(props);
  }
  

 
  render(){
  	return(
      <div style={gainStyle} className={"main-panel"}>
        <button onClick={this.props.keyToggle}> {this.props.keyOn ? "Key Off" : "Key On"} </button>       
          <Rotary value={this.props.masterGain} onChange={this.props.changeMasterGain} min={0} max={.5} 
           unlockDistance={25} name={"Gain"} /> 
          <Rotary value={this.props.baseFrequency} min={20} max={2500} onChange={this.props.changeBaseFrequency} 
           unlockDistance={25} name={"Frequnecy"}/> 

      </div>
  	)
  }

}

export default MainPanel