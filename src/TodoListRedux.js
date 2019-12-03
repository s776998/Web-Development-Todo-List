import {VisibilityFilters} from "./constants";

export const types = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE: "UPDATE",
  SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER",
  FETCH_TODOS_PENDING: "FETCH_TODOS_PENDING",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_ERROR: "FETCH_TODOS_ERROR"
};

export const actionCreators = {
  add: todo => {
    return {type: types.ADD, payload: todo};
  },
  remove: index => {
    return {type: types.REMOVE, payload: index};
  },
  update: todo => {
    return {type: types.UPDATE, payload: todo};
  },
  setVisibilityFilter: visibility => {
    return {type: types.SET_VISIBILITY_FILTER,
    payload: visibility};
  },
  fetchTodosPending: () => {
    return {type: types.FETCH_TODOS_PENDING};
  },
  fetchTodosSuccess: todos => {
    return {type: types.FETCH_TODOS_SUCCESS, payload: todos};
  },
  fetchTodosError: error => {
    return {type: types.FETCH_TODOS_ERROR, payload: error};
  }
};

const initialState = {
  todos: [],
  pending: false,
  error: null,
  visibilityFilter: VisibilityFilters.SHOW_ALL
};

export const reducer = (state = initialState, action) => {
  const {todos} = state;
  const {type, payload} = action;
  switch(type){
    case types.ADD:
      return {
        ...state,
        todos: [payload, ...todos]
      };
    case types.REMOVE:
      return {
        ...state,
        todos: todos.filter(todo =>
        todo.id !== payload)
      };
    case types.UPDATE:
      return {
        ...state,
        todos: todos.map(todo =>
        todo.id === payload.id ? payload : todo)
      };
    case types.SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibility: payload
      };
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
    default:
      return state;
  }
};