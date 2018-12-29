import React from 'react'
import Rotary from '../Rotary'
import '../../assets/main.css'

const WaveRotaryStyle ={
	width: 20,
	height: 25
}

class WavePanel extends React.Component{
  constructor(props){
  	super(props)
  }

  render(){
  	return(
      <div className={"wave-panel ui-panel"}>
        <Rotary style={WaveRotaryStyle} value={this.props.phase} onChange={this.props.changePhase}
           min={0} max={0.5} name={"Phase"} />

      </div>
    
  	)
  }


}

export default WavePanel