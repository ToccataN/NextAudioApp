import MainLayout from '../components/MainLayout'
import { Provider, connect } from 'react-redux'
import { store, toggleKey } from '../store.js'
import * as actions from '../actions'
import '../assets/main.css'

const Index = (props) =>(
    <Provider store={store}>
      <IndexContainer />
    </Provider>

)

function mapStateToProps (state) {
  const { keyOn, masterGain, masterFreq, oscArray} = state
  return { keyOn, masterGain, masterFreq, oscArray }
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
    }

  }
  
}

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout)

export default Index