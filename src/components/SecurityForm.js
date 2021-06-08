import { useFirestore } from 'react-redux-firebase';
function SecurityForm(props) {
  const firestore = useFirestore();

  function fireStoreSecurity(e) {
    e.preventDefault();
    console.log("ahhh")
    console.log(e.target.username.value);
    // switch (props.type) {
    //   case "Log In":
    //     return;
    //   case "Sign Up":
    //     return firestore.collection('users').add({
    //       username: e.target.username.value,
    //       password: e.target.password.value
    //     }).then(docref=> console.log("success",docref));
    //   default:
    // }
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
      <button onSubmit={(e) => fireStoreSecurity(e)}>{props.type}</button>
    </form>
  )
}

export default SecurityForm;

