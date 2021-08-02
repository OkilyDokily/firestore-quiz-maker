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
        firestore.collection("users").where("user", "==", e.target.user.value).get().then(function (snapshot) {
          console.log(snapshot)
          let email = snapshot.docs[0].data().email;
          console.log(email)
          auth.signInWithEmailAndPassword(email, e.target.password.value).then(() => {
            const userId = firebase.auth().currentUser.uid;

            firestore.collection("users").where("userid", "==", userId).get().then((querySnapshot) => {
              if (querySnapshot.empty) {
                changeMessage("User not found");
              }
              else {
                const find = querySnapshot.docs.find(x => x.id === e.target.user.value);
                if (find) {
                  dispatch(a.logIn(find.id))
                  changeComponent()
                }
                else {
                  changeMessage("User not found");
                }
              }
            })
          });
        });
        break;
      case "Sign Up":
        auth.createUserWithEmailAndPassword(e.target.email.value, e.target.password.value).then(() => {
          firestore.collection("users").doc(e.target.user.value).set({ userid: firebase.auth().currentUser.uid, email: e.target.email.value, user: e.target.user.value }, { merge: true });
          dispatch(a.logIn(e.target.user.value));
          changeComponent();
        }).catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value).then(() => {
              const userId = firebase.auth().currentUser.uid;
              firestore.collection("users").doc(e.target.user.value).get().then((snapshot) => {
                if (!snapshot.exists) {
                  firestore.collection("users").doc(e.target.user.value).set({ user: e.target.user.value, userid: userId, email: e.target.email.value }, { merge: true });
                  dispatch(a.logIn(e.target.user.value));
                  changeComponent();
                }
              })
            })
          }
        })
        break;
      case "Reset Password":

        firebase.auth().sendPasswordResetEmail(e.target.email.value)
          .then(() => {
            console.log("reset success");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error code", errorCode, "Error Message", errorMessage);
          });
        return;
      case "Change Email":
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value).then(() => {
          const user = firebase.auth().currentUser;
          //change email using firestore api
          user.updateEmail(e.target.newemail.value).then(() => {
            firestore.collection("users").where("email", "==", e.target.email.value).get().then((querySnapshot) => {
              querySnapshot.docs.forEach(function (doc) {
                console.log(doc,"doc");
                firestore.collection("users").doc(doc.id).update({ email: e.target.newemail.value });
              });
            })

          })

        })
        break;
      default:
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
              <label>Username</label>
              <input name="user" type="text" />
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
    case "Reset Password":
      return (
        <div>
          {message !== null ? <p>{message}</p> : null}
          <form style={formStyle} onSubmit={fireStoreSecurity}>
            <div style={inputStyles}>
              <label>Email</label>
              <input name="email" type="email" />
            </div>

            <button>{props.type}</button>
          </form>
        </div>
      )

    case "Change Email":
      return (
        <div>
          {message !== null ? <p>{message}</p> : null}
          <form style={formStyle} onSubmit={fireStoreSecurity}>
            <div style={inputStyles}>
              <label>Old Email</label>
              <input name="email" type="email" />
            </div>
            <div style={inputStyles}>
              <label>New Email</label>
              <input name="newemail" type="email" />
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

