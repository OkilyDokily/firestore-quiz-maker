import * as a from "./ActionTypes"

export function logIn(log){
  return{
    type: a.LOG_IN,
    log
  }
}

export function changeComponent(component){
  return {
    type: a.CHANGE_COMPONENT,
    component
  }
}

export function addRoute(username,id){
  return {
    type:a.ADD_ROUTE,
    username,
    id
  }
}