import { useFirestore } from 'react-redux-firebase';
function SecurityForm(props) {
  const firestore = useFirestore();

  function fireStoreSecurity(event) {
    event.preventDefault();
    switch (props.type) {
      case "Log In":
        return;
      case "Sign Up":
        return firestore.collection('users').add({
          username: event.target.username.value,
          password: event.target.password.value
        });
      default:
    }
  }
  return (
    <form>
      <p>{props.type}</p>
      <div>
        <label>Username</label>
        <input name="username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="text" />
      </div>
      <button onClick={() => fireStoreSecurity()}>{props.type}</button>
    </form>
  )
}

export default SecurityForm;

