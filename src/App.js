import './App.css';
import { Meme } from './components/Meme';
import { CreatedMeme } from './components/CreatedMeme';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Meme/>}/>
        <Route path='/createdMeme' element={<CreatedMeme/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
