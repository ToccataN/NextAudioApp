import MainLayout from '../components/MainLayout'
import { Provider, connect } from 'react-redux'
import { store } from '../store.js'
import * as actions from '../actions'
import '../assets/main.css'

const Index = (props) =>(
    <Provider store={store}>
      <IndexContainer />
    </Provider>
)

function mapStateToProps (state) {
  const { keyOn, masterGain, masterFreq, oscArray, LFObj, phase } = state
  return { keyOn, masterGain, masterFreq, oscArray, LFObj, phase }
}

const mapDispatchToProps = (dispatch) => {
  return{
  	keyToggle: () => {
      dispatch(actions.toggleKey())
    },
    changeMasterGain: (value) => {
    	dispatch(actions.changeMasterGain(value))
    },
    changeBaseFrequency: (value) => {
    	dispatch(actions.changeBaseFrequency(value))
    },
    addOsc: () => {
    	dispatch(actions.addOscillator());
    },
    subOsc: () => {
    	dispatch(actions.subOscillator());
    },
    changeLFO: (value, index) => {
    	dispatch(actions.changeLFO(value, index));
    },
    changePhase: (value) => {
    	dispatch(actions.changePhase(value));
    },
    playNote: (value) => {
  	    dispatch(actions.playNote(value));
    },
      stopNote: (value) => {
          dispatch(actions.stopNote(value));
      }
  }
  
}

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout)

export default Index
