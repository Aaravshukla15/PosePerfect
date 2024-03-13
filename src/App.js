import './App.css';
import Features from './components/features/Features';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home></Home>
      <Features></Features>
    </div>
  );
}

export default App;
