import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../redux/actions/actions";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    title: "",
    desc: "",
  });
  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("object", todo);
      const response = await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      console.log("temp ", data);
      dispatch(fetchTodos());
      setTodo({
        title: "",
        desc: "",
        isCompleted: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="inputContainer">
        <input
          value={todo.title}
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="Title"
        />
        <input
          value={todo.desc}
          name="desc"
          onChange={handleChange}
          type="text"
          placeholder="Desc"
        />
      </div>
      <div className="buttonContainer">
        <button>Add Todo</button>
      </div>
    </form>
  );
};

export default Form;
