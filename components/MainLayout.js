import Header from './Header'
import AudioEngine from './AudioEngine'
import React from 'react'
import MainPanel from './panels/MainPanel'
import Oscillator from './panels/Oscillator'

const mainLayoutStyle ={
	display: 'flex',
	flexFlow: 'row'
}

class MainLayout extends React.Component{

  constructor(props){
  	super(props);
  	this.state ={
  		
  	}

  }

  render(){

  	return(
      <div >
        <Header /> 
        <div style={mainLayoutStyle} className={"main-layout"}>
          <AudioEngine gain={ this.props.keyOn ? this.props.masterGain : 0 } freq={this.props.masterFreq} oscArray={this.props.oscArray}/>
          <MainPanel keyToggle={this.props.keyToggle} changeMasterGain={this.props.changeMasterGain} 
          masterGain={this.props.masterGain} keyOn={this.props.keyOn} baseFrequency={this.props.masterFreq}
          changeBaseFrequency={this.props.changeBaseFrequency} />
          <Oscillator addOsc={this.props.addOsc} subOsc={this.props.subOsc} oscArray={this.props.oscArray} />
         </div>
        
      </div>     
  	)
  }
  
}

export default MainLayout;
  