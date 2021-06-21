import { useFirestore } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as  a from '../Actions/index'

function SecurityForm(props) {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [message, changeMessage] = useState(null);

  const fireStoreSecurity = (e) => {
    e.preventDefault();
    switch (props.type) {
      case "Login":
        return firestore.collection('users')
          .where("username", "==", e.target.username.value)
          .where("password", "==", e.target.password.value).get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 1) {
              querySnapshot.forEach((doc) => {
                dispatch(a.logIn(doc.data().username));
                dispatch(a.changeComponent("Dashboard"));
              });
            }
            else if (querySnapshot.size === 0) {
              changeMessage("Either the username or password is incorrect")
            }
            else if (querySnapshot.size === 2){
              changeMessage("hmmmm")
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      case "Sign Up":
       return firestore.collection('users')
         .where("username", "==", e.target.username.value).get().then((querySnapshot) => {
            if (querySnapshot.size === 1) {
              querySnapshot.forEach((doc) => {
                changeMessage("That username already exists.")
              });
            }
            else if (querySnapshot.size === 0) {
              firestore.collection('users').add({
                username: e.target.username.value,
                password: e.target.password.value
              }).then(
                docref => {
                  dispatch(a.logIn(e.target.username.value))
                  dispatch(a.changeComponent("Dashboard"));
                }
              )
            }
          })
      default:
        return;
    }
  }

  const formStyle = {
    width: "250px"
  }
  const inputStyles = {
    display:"flex",
    justifyContent:"space-between",
    marginBottom: "5px"
  }

  const propsTypeStyle = {
    fontWeight:"bold"
  }

  return (
    <div>
      {message !== null ? <p>{message}</p> : null}
      <form style={formStyle} onSubmit={fireStoreSecurity}>
        <p style={propsTypeStyle}>{props.type}</p>
        <div style={inputStyles}>
          <label>Username</label>
          <input name="username" type="text" />
        </div>
        <div style={inputStyles}>
          <label>Password</label>
          <input name="password" type="text" />
        </div>
        <button>{props.type}</button>
      </form>
    </div>

  )
}

export default SecurityForm;

