import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as a from '../Actions/index'
import firebase from 'firebase/app';
function Header() {
  const dispatch = useDispatch();
  const component = useSelector(state => state.interface.component)
  const loggedIn = useSelector(state => state.security.loggedIn);
  const history = useHistory();
  
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    height: "40px",
    alignItems: "center",
    background: "lightgreen",
    borderBottom: "1 solid black"
  }

  const buttonStyle = {
    display: "flex",
    alignItems: "stretch"
  }

  const catchLineStyle = {
    fontSize: "20px",
    marginLeft: "8px"
  }

  const button = {
    borderRadius: "0",
    background: "#08881d"
  }

  function returnMessage() {
    switch (component) {
      case "Dashboard":
        return "Your Dashboard";
      case "Security":
        return "Quiz Maker - Make online quizzes fast.";
      default:
        return "Quiz Maker - Make online quizzes fast.";
    }
  }


  function dashBoardOrSecurity() {
    if (loggedIn !== null) {
      dispatch(a.changeComponent("Dashboard"));
    }
    else {
      dispatch(a.changeComponent("Security"));
    }
    
  }

  function logOut(){
    //logout of firestore authentication

    firebase.auth().signOut().then(() => {
      dispatch(a.logOut())
    }).catch((error) => {
      // An error happened.
    });
  
    history.push('/')
  }

  return (
    <div style={headerStyle}>
      <div style={catchLineStyle}>
        {returnMessage()}
      </div>
      <div style={buttonStyle}>
        <button style={button} onClick={dashBoardOrSecurity}>See Dashboard</button>
        <button style={button} onClick={logOut}>Logout</button>
      </div>

    </div>
  )
}

export default Header;