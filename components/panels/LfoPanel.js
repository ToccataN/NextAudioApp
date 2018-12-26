import React from 'react'
import Rotary from '../Rotary'

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
      <div>
        <div className={"selector-display"}>
          <div className={"selector"}>
             <select value={this.state.type} onChange={(val) => this.setState({ type: val.target.value}, this.state.function(val.target.value, 1)) }>
              {this.state.options.map((wave) => <option key={wave} value={wave}>{wave}</option> )}
            </select>
          </div>
          <div className={"selector-window"}>

          </div>
        </div>
        
        <div style={{display: 'flex', flexFlow: 'row'}}>
          <Rotary style={LFORotaryStyle} value={this.props.lfoRate} index={2} onChange={this.props.onChange} name={"Rate"}
          min={0} max={60}/>
          <Rotary style={LFORotaryStyle} value={this.props.lfoFreq} index={3} onChange={this.props.onChange} name={"Freq"}
          min={0} max={10000}/>
        </div>
      </div>
  	)
  }

}

export default LfoPanel