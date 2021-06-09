import { useFirestore } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';
import * as  a from '../Actions/index'
function SecurityForm(props) {
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const fireStoreSecurity = (e) => {
    e.preventDefault();
    switch (props.type) {
      case "Login":
        return firestore.collection('users')
          .where("username", "==", e.target.username.value)
          .where("password", "==", e.target.username.value).get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 1) {
              querySnapshot.forEach((doc) => {
                dispatch(a.logIn(doc.data().username));
                dispatch(a.changeComponent("Dashboard"));
              });
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      case "Sign Up":
        return firestore.collection('users').add({
          username: e.target.username.value,
          password: e.target.password.value
        }).then(docref => console.log("success", docref));
      default:
    }
  }
  return (
    <form onSubmit={fireStoreSecurity}>
      <p>{props.type}</p>
      <div>
        <label>Username</label>
        <input name="username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="text" />
      </div>
      <button>{props.type}</button>
    </form>
  )
}

export default SecurityForm;

