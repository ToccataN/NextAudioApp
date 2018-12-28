
const headerStyle ={
	display: 'flex',
	justifyContent: 'center'
}

const Header = (props) => (
    <div style={headerStyle} className={"app-header"}>
      <div className={"center-header"}>
        <h1>Next Additive Synthesizer</h1>
        <h5><a href="https://github.com/ToccataN/NextAudioApp">Github Repo</a></h5>
      </div>
    </div>
)
	
export default Header