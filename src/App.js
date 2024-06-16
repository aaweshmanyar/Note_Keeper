import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Menubar from './components/Menubar/Menubar';
import Navbar from './components/Navbar/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Readnote from './components/CRUD/ReadNote/Readnote';
import Createnote from './components/CRUD/CreateNote/Createnote';
import Updatenote from './components/CRUD/UpdateNote/Updatenote';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Menubar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/read/:id' element={<Readnote />} />
        <Route path='/create' element={<Createnote />} />
        <Route path='/update/:id' element={<Updatenote />} />
      </Routes>
      <div style={{textAlign:"center", margin:"100px 0", opacity:".5"}}>Inspired by Google Keep</div>
      <ToastContainer bodyClassName='toastBody'/>
    </div>
  );
}

export default App;
