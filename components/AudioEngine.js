import React from 'react'

class AudioEngine extends React.Component {
  constructor(props){
  	super(props);
  	this.state ={
  		gain: this.props.gain,
  		freq: this.props.freq,
  		oscArray: [],
  		LFOBj: this.props.lfo,
  		phase: this.props.phase
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
        this.realPhase = new Float32Array(32);
        this.imagPhase = new Float32Array(32);
        
        
   
        if(this.props.oscArray > 1){
          var num = this.props.oscArray;
          this.resetOscillators(num);
          this.adjustOscillatorGain(this.state.gain);
          this.adjustOscillatorFrequency();
        }

        if(this.props.phase != 0){
        	this.phaseAdjustment(this.props.phase);
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
      	});
      }

  	}

    if(this.props.count != prevProps.count){
    	if(this.props.count % 2 ==0){
    		this.setState({
    		    gain: 0
    		})

    	}
    }

    if(this.props.phase != prevProps.phase){
      this.setState({
      	phase: this.props.phase
      }, this.phaseAdjustment(this.state.phase));
    }
    
  }
 
  componentWillUnmount(){
  	this.AudioContext.close();
  	this.setState({
  		oscArray: []
  	})
  }

  addOscillator(int){
  	let osc = this.AudioContext.createOscillator(),
  	    oscGainNode = this.AudioContext.createGain();
  
  	osc.connect(oscGainNode);
  	oscGainNode.connect(this.gainNode);
  	osc.start(0);
  	oscGainNode.gain.value = Math.pow(this.state.gain, (int-2.18)/2);
  	osc.frequency.value = this.state.freq * Math.pow(2, 1 + .5 + ((int - 1)/2) );
  	
  	this.setState({
  		oscArray: [...this.state.oscArray, [osc, oscGainNode]]
  	}, ()=>{ this.phaseAdjustment(this.state.phase) });

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

  phaseAdjustment(value){
    let a1 = 0.0;
    let b1 = 1.0;
    let oscs = this.state.oscArray;

    if(oscs.length != 0){
      for (let i = 1 ; i <= oscs.length; i++){
        let shift = 2 * Math.PI * value * Math.pow(i, .2); 
        this.realPhase[i] = a1 * Math.cos(shift) - b1 * Math.sin(shift);
        this.imagPhase[i] = a1 * Math.sin(shift) + b1 * Math.cos(shift);
        let wt = this.AudioContext.createPeriodicWave(this.realPhase, this.imagPhase);
        oscs[i-1][0].setPeriodicWave(wt);
      }    
    }
  
  }

  render(){
  	return <div style={{display: 'none'}} />;
  }
  

}

export default AudioEngine