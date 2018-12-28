import Header from './Header'
import AudioEngine from './AudioEngine'
import React from 'react'
import MainPanel from './panels/MainPanel'
import Oscillator from './panels/Oscillator'
import LfoPanel from './panels/LfoPanel'

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

  componentDidUpdate(prevProps){
  	
  }

  

  render(){
   if(!this.props.keyOn){
   	return(
      <div >
        <Header /> 
        <div style={mainLayoutStyle} className={"main-layout"}>         
          <MainPanel keyToggle={this.props.keyToggle} changeMasterGain={this.props.changeMasterGain} 
          masterGain={this.props.masterGain} keyOn={this.props.keyOn} baseFrequency={this.props.masterFreq}
          changeBaseFrequency={this.props.changeBaseFrequency} />
          <div style={{display: 'flex', flexFlow:'column'}} >
            <Oscillator addOsc={this.props.addOsc} subOsc={this.props.subOsc} oscArray={this.props.oscArray} />
            <LfoPanel lfoRate={this.props.LFObj[2]} lfoFreq={this.props.LFObj[3]} changeLFO={this.props.changeLFO}
             lfoType={this.props.LFObj[1]} />
          </div>
         </div>
        
      </div>
     )
   }else {
   	return(
      <div >
        <Header /> 
        <div style={mainLayoutStyle} className={"main-layout"}>         
          <AudioEngine lfo={this.props.LFObj} gain={this.props.masterGain} freq={this.props.masterFreq} oscArray={this.props.oscArray} 
              /> 
          <MainPanel keyToggle={this.props.keyToggle} changeMasterGain={this.props.changeMasterGain} 
          masterGain={this.props.masterGain} keyOn={this.props.keyOn} baseFrequency={this.props.masterFreq}
          changeBaseFrequency={this.props.changeBaseFrequency} />
          <div style={{display: 'flex', flexFlow:'column'}} >
            <Oscillator addOsc={this.props.addOsc} subOsc={this.props.subOsc} oscArray={this.props.oscArray} />
            <LfoPanel lfoRate={this.props.LFObj[2]} lfoFreq={this.props.LFObj[3]} changeLFO={this.props.changeLFO}
             lfoType={this.props.LFObj[1]} />
          </div>
         </div>
        
      </div>     
  	)
   }
  
  	
  }
  
}

export default MainLayout;
  