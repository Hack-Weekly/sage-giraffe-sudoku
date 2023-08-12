import './App.css';
import SudokuGrid from './SudokuGrid';

function App() {
  return (
    <h1 className="App">
      <Header/>
      <SudokuGrid/>
      <Buttons/>
    </h1>
  );
}

function Header() {
  return(
    <h1 class="Header">
      Sudoku App
    </h1>
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
