import './App.css';
import GameBox from './components/View/gameBox';

function App() {
  return (
    <div className="App">
      <div>
        <h2 style={{color: 'white'}}>Paper Scissors Rock Game</h2> 
        <GameBox/>
      </div>
    </div>
  );
}

export default App;
