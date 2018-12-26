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

  render(){
    let count = 0;
  	return(
      <div >
        <Header /> 
        <div style={mainLayoutStyle} className={"main-layout"}>

         {
         	  this.props.keyOn ? (<AudioEngine lfoRate={this.props.LFObj[2]} gain={this.props.masterGain} freq={this.props.masterFreq} oscArray={this.props.oscArray} 
              lfoType={this.props.LFObj[1]}  lfoFreq={this.props.LFObj[3]} count={count}/>) : (count % 2 == 0 ? (<AudioEngine count={0} gain={0} freq={this.props.masterFreq} oscArray={this.props.oscArray} 
              lfoType={this.props.LFObj[1]} lfoRate={this.props.LFObj[2]} lfoFreq={this.props.LFObj[3]}/>) : (''))  
          } 
          
          <MainPanel keyToggle={this.props.keyToggle} changeMasterGain={this.props.changeMasterGain} 
          masterGain={this.props.masterGain} keyOn={this.props.keyOn} baseFrequency={this.props.masterFreq}
          changeBaseFrequency={this.props.changeBaseFrequency} />
          <div style={{display: 'flex', flexFlow:'column'}} >
            <Oscillator addOsc={this.props.addOsc} subOsc={this.props.subOsc} oscArray={this.props.oscArray} />
            <LfoPanel lfoRate={this.props.LFObj[2]} lfoFreq={this.props.LFObj[3]} onChange={this.props.changeLFO}
             lfoType={this.props.LFObj[1]}/>
          </div>
         </div>
        
      </div>     
  	)
  }
  
}

export default MainLayout;
  