import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/Form/Form";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import TasksList from "../components/TasksList/TasksList";
import { fetchTodos } from "../redux/actions/actions";
import "./TasksScreen.css";
import EmptyList from "../components/EmptyList/EmptyList";

const TasksScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <div>
      <Header title="Full Stack Todo App" />
      <div className="container">
        <Form />
        <h2>Your Todos</h2>

        {todos.length > 0 ? (
          <ul>
            {todos?.map((todo) => (
              <TasksList key={todo._id} todo={todo} />
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};

export default TasksScreen;
