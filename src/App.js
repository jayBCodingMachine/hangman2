import logo from './logo.svg';
import './App.css';
import Hangman from "./components/Hangman";

function App() {
  return (
    <div className="App">
     <Hangman maxWrong={6} />
    </div>
  );
}

export default App;
