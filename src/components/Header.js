import { useDispatch } from 'react-redux';
import * as a from '../Actions/index'
function Header() {
  const dispatch = useDispatch();
  
  const headerStyle = {
    display:"flex",
    justifyContent:"space-between",
    height: "40px",
    alignItems:"center",
    
    borderBottom: "1 solid black"
  }

  const buttonStyle = {
    display:"flex",
    alignItems:"stretch"
  }

  const catchLineStyle = {
    fontSize: "20px"
  }

  return (
    <div style={headerStyle}>
      <div style={catchLineStyle}>
        Quiz Maker - Make online quizzes fast.
      </div>
      <div style={buttonStyle}>
        <button onClick={() => dispatch(a.changeComponent("Dashboard"))}>See Dashboard</button>
        <button onClick={() => dispatch(a.logOut())}>Logout</button>
      </div>

    </div>
  )
}

export default Header;