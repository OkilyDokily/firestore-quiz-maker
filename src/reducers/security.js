import * as a from '../Actions/ActionTypes'

const inititalState = {
  loggedIn: null
}

function securityReducer (state = inititalState,action){
  switch(action.type){
    case a.LOG_IN:
      return {loggedIn : action.log }
    case a.LOG_OUT:
      return {loggedIn : null}
    default:
      return state;
  }
}

export default securityReducer;