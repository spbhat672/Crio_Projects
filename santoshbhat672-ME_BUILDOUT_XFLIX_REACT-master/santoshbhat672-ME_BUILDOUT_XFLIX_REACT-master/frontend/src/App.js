import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VideoPage from './pages/VideoPage';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/video/:videoId" element={<VideoPage/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
