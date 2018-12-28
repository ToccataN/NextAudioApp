import { createStore } from 'redux'
import * as actions from './actions'
import update from 'react-addons-update'

const initialState = {
	keyOn: false,
	masterGain: 0.01,
	masterFreq: 440,
	oscArray: 1,
	LFObj: [0, "sine", 0.0, 0.0] 
}

var arrayMutate = function(arr, index, value){
  arr[index] = value;
  return arr;
}

export const actionType = {
  KEY: 'KEY',
  CHANGE_GAIN: 'CHANGE_GAIN',
  CHANGE_FREQ: 'CHANGE_FREQ',
  ADD_OSC: 'ADD_OSC',
  SUB_OSC: 'SUB_OSC',
  CHANGE_LFO: 'CHANGE_LFO'

}

export const reducer = (state = initialState, action) =>{
	switch (action.type){
		case actionType.KEY:
		  return Object.assign({}, state, {
		  	keyOn: !state.keyOn
		  });
		case actionType.CHANGE_GAIN:
		  return Object.assign({}, state, {
		  	masterGain: action.value
		  });
		case actionType.CHANGE_FREQ:
          return Object.assign({}, state,{
          	masterFreq: action.value
          });
        case actionType.ADD_OSC:
          return Object.assign({}, state, {
          	oscArray: state.oscArray + 1
          });
        case actionType.SUB_OSC:
          if(state.oscArray > 1){
          	return Object.assign({}, state,{
              oscArray: state.oscArray - 1
          	});
          }
        case actionType.CHANGE_LFO:
          let index = action.index, value = action.value;
          return update(state,{
          	LFObj : {
          		[index]: {$set: value}
          	}
          });

		default: return state;
	}
}

export const store = createStore(reducer, initialState);
