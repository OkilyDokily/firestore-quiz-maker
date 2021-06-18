import { useDispatch } from 'react-redux';
import * as a from '../Actions/index'
function Header() {
  const dispatch = useDispatch();
  
  return (
    <div>
      <div>
        Quiz Maker - Make quizzes fast and easy.
      </div>
      <div>
        <button onClick={() => dispatch(a.changeComponent("Dashboard"))}>See Dashboard</button>
        <button onClick={() => dispatch(a.logOut())}>Logout</button>
      </div>

    </div>
  )
}

export default Header;