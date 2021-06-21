import SecurityForm from "./SecurityForm";
import React, { useState } from 'react';


function Security(props) {
  const [securityState, setSecurityState] = useState(null);
  
  const explainerLinesStyle ={
    fontSize:"14px"
  }

  function renderSecurityState(securityState) {
    switch (securityState) {
      case "Login":
        return (
          <SecurityForm type="Login" />
        )
      case "Sign Up":
        return (
          <SecurityForm type="Sign Up" />
        )
      default:
        return null;
    }
  }
  return (
    <React.Fragment>
      <div style={explainerLinesStyle}>
        <p>Sign up to make quizzes or take quizzes.</p>
        <p>You get your own dashboard which lets you see all of your previous quiz results and a complete list of quizzes you've made, which you can share with your friends.</p>
      </div>
      <button className="button3" onClick={() => setSecurityState("Login")}>Login</button>
      <button className="button3" onClick={() => setSecurityState("Sign Up")}>Sign Up</button>
      {renderSecurityState(securityState)}
    </React.Fragment>
  )
}


export default Security;