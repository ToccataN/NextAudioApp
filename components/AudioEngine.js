import React from 'react'

class AudioEngine extends React.Component {
  constructor(props){
  	super(props);
  	this.state ={
  		gain: this.props.gain,
  		freq: this.props.freq,
  		oscArray: [],
  		lfoType: this.props.lfoType,
  		lfoRate: this.props.lfoRate,
  		lfoFreq: this.props.lfoFreq
    }
  }

  componentDidMount(){
  	  	this.AudioContext= new (window.AudioContext || window.webkitAudioContext)();
    	this.oscillator1 = this.AudioContext.createOscillator();
    	this.gainNode = this.AudioContext.createGain();
    	this.oscillator1.connect(this.gainNode);
        this.gainNode.connect(this.AudioContext.destination);
        this.gainNode.gain.value = this.state.gain;
        this.oscillator1.frequency.value = this.state.freq;
        this.oscillator1.start(0);
        this.lfo = this.createLFO(this.gainNode);
    
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
  		let oscArray = this.adjustOscillatorFrequency();
  		this.setState({
  			freq: this.props.freq,
  			oscArray: oscArray
  		}, () => {
  			this.oscillator1.frequency.value = this.state.freq
  		})
  	}

  	if(this.props.lfoRate != prevProps.lfoRate){
  		console.log(this.state.lfoRate)
  		this.setState({
  			lfoRate: this.props.lfoRate
  		}, () => {
  			this.lfo['osc'].frequency.value = this.state.lfoRate
  		});
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

    if(this.props.count != prevProps.count){
    	if(this.props.count % 2 ==0){
    		this.setState({
    		    gain: 0
    		})

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
  	});

  }

  adjustOscillatorGain(){
  	let oscs = this.state.oscArray;
  	for(let i = 0; i < oscs.length; i++ ){
      oscs[i][1].gain.value = Math.pow(this.props.gain, (i+1)/2);
  	}
  	return oscs;
  }

  adjustOscillatorFrequency(){
  	let oscs = this.state.oscArray;
  	for(let i = 0; i < oscs.length; i++ ){
      oscs[i][0].frequency.value = this.props.freq * Math.pow(2, 1 + .5 + (i+1)/2);
  	}
  	return oscs;
  }

  createLFO(osc){
  	var lfo = this.AudioContext.createOscillator(),
  	    lfoGain = this.AudioContext.createGain(),
  	    type = this.state.lfoType,
  	    rate = this.state.lfoRate,
  	    freq = this.state.lfoFreq;

  	    lfo.connect(lfoGain);
  	    lfo.type = type;
  	    lfo.frequency.value = rate;
        lfoGain.gain.value = freq;
        lfoGain.connect(osc.gain)
        lfo.start(0);  
   
        return {
        	osc: lfo,
        	gain: lfoGain
        }

        
  }

  updateLFO(params){
  	
  	this.lfo['osc'].type = params[1];
  	this.lfo['osc'].frequency.value = params[2];
  	this.lfo['gain'].gain.value = params[3];
 
  }

  render(){
  	return <div style={{display: 'none'}} />;
  }
  

}

export default AudioEngine