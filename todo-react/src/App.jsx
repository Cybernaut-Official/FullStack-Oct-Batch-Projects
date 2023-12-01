import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  const handleButtonClick = () => {
    setTasks([...tasks,currentTask])
  };
  
  return (
    <main className="text-center">
      <h1 className="text-gray-700 text-4xl font-bold py-10">My To-Do List</h1>
      <div>
        <input
          type="text"
          value={currentTask}
          onChange={(e) => {
            setCurrentTask(e.target.value);
          }}
          placeholder="Add a new task"
          className="p-6 w-[70%] border border-gray-800"
        />
        <button
          onClick={handleButtonClick}
          className="bg-gray-700 text-white p-3 rounded-md ml-6"
        >
          Add
        </button>
      </div>
      <ol id="taskList" className="space-y-3 p-6 max-w-lg mx-auto"></ol>
    </main>
  );
};

export default App;
