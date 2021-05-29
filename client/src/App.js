import React, { useEffect } from "react";
import TasksScreen from "./screen/TasksScreen";
import "./app.css";

function App() {
  useEffect(() => {}, []);
  return (
    <div>
      <TasksScreen />
    </div>
  );
}

export default App;
