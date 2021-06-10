import SecurityForm from "./SecurityForm";
import React, { useState } from 'react';


function Security(props) {
  const [securityState, setSecurityState] = useState(null);
  
  

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
      <button onClick={() => setSecurityState("Login")}>Login</button>
      <button onClick={() => setSecurityState("Sign Up")}>Sign Up</button>
      {renderSecurityState(securityState)}
    </React.Fragment>
  )
}


export default Security;