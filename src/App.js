import Listview from './listview';
import './App.css';
import './listview.css';

function App() {
  return (
    <div className="App">
      <div className="search">
        <i className='fas fa-search'></i>
        <input type="search" name='searchuser' placeholder='Search user'></input>
      </div>
    <Listview />
    </div>
  );
}

export default App;
