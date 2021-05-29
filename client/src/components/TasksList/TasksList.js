import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { fetchTodos } from "../../redux/actions/actions";
import "./TasksList.css";

const TasksList = ({ todo }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      await fetch(`/todos/${id}`, { method: "DELETE" });
      dispatch(fetchTodos());
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsCompleted = async (id, isCompleted) => {
    try {
      await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCompleted: !isCompleted,
        }),
      });
      dispatch(fetchTodos());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <div className={`task-text`}>
        <h3 className={todo.isCompleted && "completedText"}>{todo.title}</h3>
        <p className={todo.isCompleted && "completedText"}>
          <i>{todo.desc}</i>
        </p>
      </div>
      <div className="circle-check">
        <AiOutlineCheckCircle
          className={todo.isCompleted ? "completed circleTick" : "circleTick"}
          onClick={() => {
            handleIsCompleted(todo._id, todo.isCompleted);
          }}
        />
        <AiOutlineDelete
          className="delete"
          onClick={() => {
            handleDelete(todo._id);
          }}
        />
      </div>
    </li>
  );
};

export default TasksList;
