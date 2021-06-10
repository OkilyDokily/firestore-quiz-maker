import './App.css';
import Controller from './components/Controller'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {

  return (
    <Router>
      <Switch>
        <Route path="/:user/:id">
          <div id="App">
            <Controller/>
          </div>
        </Route>
        <Route path="/">
          <div id="App">
            <Controller />
          </div>
        </Route>
      </Switch>
    </Router>
   
  );
}

export default App;
