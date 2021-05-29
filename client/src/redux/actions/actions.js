import {
  ADD_TODO,
  TODO_COMPLETED,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from "./actionTypes";

const addTodo = (newTodo) => {
  return { type: ADD_TODO, payload: newTodo };
};

const fetchTodos = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_TODOS_REQUEST,
      });
      const todos = await fetch("/todos");
      const jsonTodos = await todos.json();
      dispatch(fetchTodosSuccess(jsonTodos));
    } catch (error) {
      dispatch(fetchTodosFailure(error.message));
    }
  };
};

const fetchTodosRequest = () => {
  console.log("fetchTodosRequest");
  return {
    type: FETCH_TODOS_REQUEST,
  };
};

const fetchTodosSuccess = (users) => {
  console.log("fetchTodosSuccess");
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: users,
  };
};
const fetchTodosFailure = (error) => {
  console.log("fetchTodosFailure");
  return {
    type: FETCH_TODOS_FAILURE,
    payload: error,
  };
};

const todoCompleted = (completedTodo) => {
  return {
    type: TODO_COMPLETED,
  };
};

export {
  addTodo,
  todoCompleted,
  fetchTodos,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
};
