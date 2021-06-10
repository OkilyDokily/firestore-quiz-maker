import * as a from "../Actions/ActionTypes";

const initialState = {
  username:null,
  id:null,
  added:false
}

function routingReducer(state= initialState,action){
  switch(action.type){
    case a.ADD_ROUTE:
      return {username:action.username,id:action.id,added:true};
    default:
      return state;
  }
}


export default routingReducer;