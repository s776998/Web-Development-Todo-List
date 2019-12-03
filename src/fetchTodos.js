import {actionCreators} from "TodoListRedux";

const API_URL = "http(s)://5de5cb269c4220001405b029.mockapi.io/api/todos";

function fetchTodos() {
  return dispatch => {
    dispatch(actionCreators.fetchTodosPending());
    fetch(API_URL)
      .then(res => res.json())
      .then(res =>{
        if(res.error) {
          throw res.error;
        }
        dispatch(actionCreators.fetchTodosSuccess(res.json));
        return res.json();
      })
      .catch(error => {
        dispatch(actionCreators.fetchTodosError(error));
      });
  };
}

export default fetchTodos;