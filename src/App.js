import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Router from './Route/Router';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router/>
    </div>
  );
}

export default App;
