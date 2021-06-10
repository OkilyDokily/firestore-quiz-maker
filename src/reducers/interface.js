import * as a from '../Actions/ActionTypes'

const inititalState = {
  component: "Security"
  
}

function securityReducer(state = inititalState, action) {
  switch (action.type) {
    case a.CHANGE_COMPONENT:
      return {component: action.component}
    default:
      return state;
  }
}

export default securityReducer;