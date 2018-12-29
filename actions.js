import { actionType } from './store'



export const changeMasterGain = (value) => {
  return { type: actionType.CHANGE_GAIN, value: value };
}

export const toggleKey = () => {
  return { type: actionType.KEY };
}

export const changeBaseFrequency = (value) =>{
	return{
		type: actionType.CHANGE_FREQ,
		value
	}
}

export const addOscillator = () =>{
	return {
		type: actionType.ADD_OSC
	}
}

export const subOscillator = () =>{
	return {
		type: actionType.SUB_OSC
	}
}

export const changeLFO = (value, index) => {
  return {
  	type: actionType.CHANGE_LFO,
  	value,
  	index
  }
}

export const changePhase = (value) =>{
	return {
		type: actionType.CHANGE_PHASE,
		value
	}
}
