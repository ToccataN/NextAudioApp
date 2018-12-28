import React from 'react'

class AudioEngine extends React.Component {
  constructor(props){
  	super(props);
  	this.state ={
  		gain: this.props.gain,
  		freq: this.props.freq,
  		oscArray: [],
  		LFOBj: this.props.lfo
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
   
        if(this.props.oscArray > 1){
          var num = this.props.oscArray;
          this.resetOscillators(num);
          this.adjustOscillatorGain(this.state.gain);
          this.adjustOscillatorFrequency();
        }
    
  }

  componentDidUpdate(prevProps){
  	if (this.props.gain != prevProps.gain){
  		var gain = this.props.gain,
            oscArray = this.adjustOscillatorGain(gain);
  		this.setState({
    	  gain: gain,
    	  oscArray: oscArray
        }, () => {
          this.gainNode.gain.value = this.state.gain;
          this.lfo['gain'].gain.value = this.state.gain;
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

  	if(this.props.lfo != prevProps.lfo){
  		this.setState({
  			LFOBj: this.props.lfo
  		}, () => {
  			this.updateLFO(this.state.LFOBj)
  		});
  	}

  	if(this.props.oscArray != prevProps.oscArray){
      if(this.props.oscArray > this.state.oscArray.length){
        this.addOscillator(this.props.oscArray);
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
 
  componentWillUnmount(){
  	console.log(this.state.oscArray);
  	this.AudioContext.close();

  	this.setState({
  		oscArray: []
  	},() =>{  } )
  }

  addOscillator(int){
  	let osc = this.AudioContext.createOscillator(),
  	    oscGainNode = this.AudioContext.createGain();


    
  	osc.connect(oscGainNode);
  	oscGainNode.connect(this.gainNode);
  	osc.start(0);
  	oscGainNode.gain.value = Math.pow(this.state.gain, (int-1)/2);
  	osc.frequency.value = this.state.freq * Math.pow(2, 1 + .5 + ((int - 1)/2) );
  	console.log("oscs: " + oscGainNode.gain.value, "stuff: " + this.state.gain)
  	this.setState({
  		oscArray: [...this.state.oscArray, [osc, oscGainNode]]
  	}, ()=>{ console.log(this.state.oscArray.length) });

  }

  resetOscillators(num){ 	
    for(let i = 2; i <= num ; i++){
    	setTimeout(()=> { this.addOscillator(i); }, 100)
    	
    }
    
  }

  adjustOscillatorGain(gain){
  	let oscs = this.state.oscArray;
  	for(let i = 0; i < oscs.length; i++ ){
      oscs[i][1].gain.value = Math.pow(gain, (i+1)/2);
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

  createLFO(gainNode){
  	let lfo = this.AudioContext.createOscillator(),
  	    lfoGain = this.AudioContext.createGain(),
  	    lfoType = this.state.LFOBj[1],
  	    lfoRate = this.state.LFOBj[2],
  	    lfoFreq = this.state.LFOBj[3];

        lfoGain.gain.value = this.state.gain;
  	    lfo.connect(lfoGain);
  	    lfo.type = lfoType;
  	    lfo.frequency.value = lfoRate;
        lfo.detune.value = lfoFreq;
        lfoGain.connect(gainNode.gain)
        lfo.start(0);  
   
        return {
        	osc: lfo,
        	gain: lfoGain
        }

        
  }

  updateLFO(params){
  	
  	this.lfo['osc'].type = params[1];
  	this.lfo['osc'].frequency.value = params[2];
  	this.lfo['osc'].detune.value = params[3];
 
  }

  render(){
  	return <div style={{display: 'none'}} />;
  }
  

}

export default AudioEngine