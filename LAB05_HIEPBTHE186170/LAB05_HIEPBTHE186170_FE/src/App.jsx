import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListOfOrchids from './pages/ListOfOrchids';
import EditOrchid from './pages/EditOrchid';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ListOfOrchids />} />
          <Route path="/edit/:id" element={<EditOrchid />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
