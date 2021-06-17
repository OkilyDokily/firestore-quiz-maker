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
        <Route path="/:user/:id" component={Controller}/>
        <Route path="/" component={Controller}/>
      </Switch>
    </Router>
   
  );
}

export default App;
