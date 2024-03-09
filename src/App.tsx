import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos,setTodos]=useState<Todo[]>([])
  //we can also use union <string|number> for variable data type
  //console.log(todo);


  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} />
    </div>
  );
};

export default App;
