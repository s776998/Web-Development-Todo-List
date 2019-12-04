import { VisibilityFilters } from "./constants";
import { todosRef } from "./firebase";

export const types = {
  SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER",
  FETCH_TODOS_PENDING: "FETCH_TODOS_PENDING",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_ERROR: "FETCH_TODOS_ERROR"
};

export const actionCreators = {
  add: todo => async dispatch => {
    todosRef.push().set(todo);
  },
  remove: id => async dispatch => {
    todosRef.child(id).remove();
  },
  update: todo => async dispatch => {
    todosRef.child(todo.id).set({
      completed: todo.completed,
      text: todo.text
    });
  },
  setVisibilityFilter: visibility => {
    return { type: types.SET_VISIBILITY_FILTER, payload: visibility };
  },
  fetchTodosPending: () => {
    return { type: types.FETCH_TODOS_PENDING };
  },
  fetchTodosSuccess: todos => {
    return { type: types.FETCH_TODOS_SUCCESS, payload: todos };
  },
  fetchTodosError: error => {
    return { type: types.FETCH_TODOS_ERROR, payload: error };
  }
};

const initialState = {
  todos: [],
  pending: false,
  error: null,
  visibilityFilter: VisibilityFilters.SHOW_ALL
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_TODOS_PENDING:
      return {
        ...state,
        pending: true
      };
    case types.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: action.payload
      };
    case types.FETCH_TODOS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case types.SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: payload
      };
    default:
      return state;
  }
};
