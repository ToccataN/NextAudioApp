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