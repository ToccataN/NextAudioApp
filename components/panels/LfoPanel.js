import React from 'react'
import Rotary from '../Rotary'
import '../../assets/main.css'

const LFOStyle = {
	display: 'inline',
	width: 110
}

const LFORotaryStyle ={
	width: 30
}

class LfoPanel extends React.Component{
  constructor(props){
  	super(props);
  	this.state={
  		type: this.props.lfoType,
  		options:["sine", "square", "sawtooth", "triangle"]
  	}
  }


  render(){
  	return(
      <div className={"ui-panel"}>
        
          <div className={"selector"}>
             <select value={this.state.type} onChange={(val) => this.setState({ type: val.target.value}, this.props.changeLFO(val.target.value, 1)) }>
              {this.state.options.map((wave) => <option key={wave} value={wave}>{wave}</option> )}
            </select>
          </div>
       
        
        <div className={"lfo-knobs"}>
          <Rotary style={LFORotaryStyle} value={this.props.lfoRate} index={2} onChange={this.props.changeLFO} name={"Rate"}
          min={0} max={60} unlockDistance={25}/>
          <Rotary style={LFORotaryStyle} value={this.props.lfoFreq} index={3} onChange={this.props.changeLFO} name={"Freq"}
          min={0} max={10000} unlockDistance={25}/>
        </div>
      </div>
  	)
  }

}

export default LfoPanel