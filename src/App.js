import './App.css';
import Controller from './components/Controller'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const appStyle = {
  margin: "auto",
  width: "95%",
  backgroundColor: "#f8f8ff"

}

function App() {
  return (
    // <div style={appStyle}>
    <Router>
      <Switch>
        <Route path="/:user/:id" component={Controller} />
        <Route path="/" component={Controller} />
      </Switch>
    </Router>
    // </div>
  );
}

export default App;
