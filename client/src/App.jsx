import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import SignUp from './pages/Sign-up/Sign-up';
import LogIn from './pages/log-in/Log-in';
import Lobby from './pages/Lobby/Lobby'
import SinglePlayer from './pages/Game/SinglePlayer';
import './app.css'
import ScoreBoard from './pages/ScoreBoard/ScoreBoard';
import AnimatedBackground from './components/animatedBackground/AnimatedBackground';
// import SetProfile from './pages/UnregisterUser/SetProfile';

function App() {
  return (<>
    <AnimatedBackground >
    </AnimatedBackground>
      <main className='container' dir='rtl'>

        <Routes>

          {/* <Route path='/' element={<SinglePlayer />} /> */}

          <Route path='/' element={<Home />} />
          <Route path='/sign-up/' element={<SignUp />} />
          <Route path='/log-in/' element={<LogIn />} />
          {/* <Route path='/unregister/' element={<SetProfile />} /> */}
          <Route path='/lobby/' element={<Lobby />} />
          <Route path='/game/single-player/' element={<SinglePlayer />} />
          <Route path='room'>
            <Route path=':roomId/play/' element={<SinglePlayer />} />
            <Route path=':roomId/score-board/' element={<ScoreBoard />} />
          </Route>

        </Routes>

      </main>
  </>);
}

export default App;
