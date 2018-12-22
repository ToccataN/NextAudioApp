import React from 'react'

class AudioEngine extends React.Component {
  constructor(props){
  	super(props);
  	this.state ={
  		gain: this.props.gain,
  		freq: this.props.freq,
  		oscArray: []
    }
  }

  componentDidMount(){
    	this.AudioContext= new (window.AudioContext || window.webkitAudioContext)();
    	this.oscillator1 = this.AudioContext.createOscillator();
    	this.gainNode = this.AudioContext.createGain();
    	this.oscillator1.connect(this.gainNode);
        this.gainNode.connect(this.AudioContext.destination);
        this.oscillator1.start(0);
        this.gainNode.gain.value = this.state.gain;
        this.oscillator1.frequency.value = this.state.freq;
  }

  componentDidUpdate(prevProps){
  	if (this.props.gain != prevProps.gain){
        let oscArray = this.adjustOscillatorGain();
  		this.setState({
    	  gain: this.props.gain,
    	  oscArray: oscArray
        }, () => {
          this.gainNode.gain.value = this.state.gain
        })    
  	}

  	if(this.props.freq != prevProps.freq){
  		this.setState({
  			freq: this.props.freq
  		}, () => {
  			this.oscillator1.frequency.value = this.state.freq
  		})
  	}

  	if(this.props.oscArray != prevProps.oscArray){
      if(this.props.oscArray > this.state.oscArray.length){
        this.addOscillator();
      } else {
      	this.state.oscArray[this.props.oscArray - 1][0].stop();
      	this.state.oscArray.splice(this.props.oscArray-1, 1)
      	this.setState({
      		oscArray: this.state.oscArray
      	}, console.log("oscs: " + this.state.oscArray));
      }

  	}
    
  }
 

  addOscillator(){
  	let osc = this.AudioContext.createOscillator(),
  	    oscGainNode = this.AudioContext.createGain();

  	osc.connect(oscGainNode);
  	oscGainNode.connect(this.AudioContext.destination);
  	osc.start(0);
  	oscGainNode.gain.value = Math.pow(this.state.gain, (this.props.oscArray-1)/2);
  	osc.frequency.value = this.state.freq * Math.pow(2, 1 + .5 + ((this.props.oscArray - 1)/2) )
  	this.setState({
  		oscArray: [...this.state.oscArray, [osc, oscGainNode]]
  	}, console.log("oscs: " + this.state.oscArray));

  }

  adjustOscillatorGain(){
  	let oscs = this.state.oscArray;
  	for(let i = 0; i < oscs.length; i++ ){
      oscs[i][1].gain.value = Math.pow(this.props.gain, (i+1)/2);
  	}
  	return oscs;
  }


  render(){
  	return <div style={{display: 'none'}} />;
  }
  

}

export default AudioEngine