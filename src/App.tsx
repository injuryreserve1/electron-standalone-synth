import classes from './App.module.css';
import Envelope from './components/Envelope/Envelope';
import Limiter from './components/Limiter/Limiter';
import Oscillator from './components/Oscillator/Oscillator';
import Piano from './components/Piano/Piano';

function App() {

  return (
    <div className={classes.app}>
      <div className={classes.settings}>
        <Oscillator/>
        <Limiter/>
        <Envelope/>
      </div>
      <div className={classes.piano}>
        <Piano/>
      </div>
    </div>
  )
}

export default App