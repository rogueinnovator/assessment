import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import Notes from './pages/Notes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
