import { useFirestore } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as  a from '../Actions/index'
import firebase from "firebase/app";
import {
  useParams
} from "react-router-dom";

function SecurityForm(props) {
  let { user, id } = useParams();
  const firestore = useFirestore();
  const auth = firebase.auth();

  const dispatch = useDispatch();
  const [message, changeMessage] = useState(null);

  function changeComponent() {
    if (user !== undefined && id !== undefined) {
      dispatch(a.changeComponent("QuizOrResults"))
    }
    else
      if (user !== undefined) {
        dispatch(a.changeComponent("QuizList"))
      }
      else {
        dispatch(a.changeComponent("Dashboard"))
      }
  }

  const fireStoreSecurity = (e) => {
    e.preventDefault();
    switch (props.type) {
      case "Login":
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value).then(() => {
          const userId = firebase.auth().currentUser.uid;
          firestore.collection("users").where("userid", "==", userId ).get().then((snapshot) => {
            const user = snapshot.docs?.[0];
            console.log("snapshot",snapshot);
            if (user) {
              dispatch(a.logIn(user.id));
              changeComponent();
            }
            else {
              changeMessage("Invalid Credentials");
            }
          }
          )
        }).catch((error) => {
          console.log(error);
          changeMessage("Invalid Credentials");
        });
        break;
      case "Sign Up":
        firestore.collection("users").doc(e.target.user.value).get().then(snapshot => {
          if (snapshot.exists) {
            changeMessage("User already exists");
          }
          else {
            auth.createUserWithEmailAndPassword(e.target.email.value, e.target.password.value).then(() => {
              firestore.collection("users").doc(e.target.user.value).set({ userid: firebase.auth().currentUser.uid }, { merge: true });
              dispatch(a.logIn(e.target.user.value));
              changeComponent();
            }).catch((error) => {
              console.log(error.message,"error");
            }
             
            );
          }
        }
        );

        break;
      default:
        return;
    }
  }



  const formStyle = {
    width: "250px"
  }
  const inputStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px"
  }

  const propsTypeStyle = {
    fontWeight: "bold"
  }


  switch (props.type) {
    case "Login":
      return (
        <div>
          {message !== null ? <p>{message}</p> : null}
          <form style={formStyle} onSubmit={fireStoreSecurity}>
            <p style={propsTypeStyle}>{props.type}</p>
            <div style={inputStyles}>
              <label>Email</label>
              <input name="email" type="email" />
            </div>
            <div style={inputStyles}>
              <label>Password</label>
              <input name="password" type="password" />
            </div>
            <button>{props.type}</button>
          </form>
        </div>
      )
    case "Sign Up":
      return (
        <div>
          {message !== null ? <p>{message}</p> : null}
          <form style={formStyle} onSubmit={fireStoreSecurity}>
            <p style={propsTypeStyle}>{props.type}</p>
            <div style={inputStyles}>
              <label>Username</label>
              <input name="user" type="text" />
            </div>
            <div style={inputStyles}>
              <label>Email</label>
              <input name="email" type="email" />
            </div>
            <div style={inputStyles}>
              <label>Password</label>
              <input name="password" type="password" />
            </div>
            <button>{props.type}</button>
          </form>
        </div>
      )
    default:
  }



}

export default SecurityForm;

