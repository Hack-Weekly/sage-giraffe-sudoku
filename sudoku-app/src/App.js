import './App.css';
import SudokuGrid from './SudokuGrid';
import MyComponent from './theme';

function App() {
  return (
    <h1 className="App">
      <Header/>
      <SudokuGrid/>
      <Buttons/>
      <MyComponent/>
    </h1>
  );
}

function Header() {
  return(
    <div class="Header">
      <h1>Sudoku App</h1>
      <button class="toggle-theme">Mode</button>
    </div>
  )
}

function Buttons() {
  return(
    <div class="Buttons">
      <button class="button green">Easy</button>
      <button class="button blue">Medium</button>
      <button class="button red">Hard</button>
    </div>
  )
}


export default App;
