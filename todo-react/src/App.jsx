import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const App = () => {
  // States
  const [currentTask, setCurrentTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [ids, setIds] = useState([]);
  const [reRender, setRerender] = useState(0);

  //UseEffect 2. 1-> Callback function , 2->  Dependency Array
  useEffect(() => {
    fetch("/api")
      .then((data) => {
        data
          .json()
          .then((jsonData) => {
            const refactoredList = jsonData.map((e) => {
              return e.todoItem;
            });
            const refactoredIds = jsonData.map((e) => {
              return e._id;
            });
            setIds(refactoredIds);
            setTasks(refactoredList);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Callback Functions
  const removeTaskWithIndex = async (index) => {
    try {
      const req = await fetch(`/api/${ids[index]}`, {
        method: "DELETE",
      });
      if (req.ok) {
        setRerender(reRender + 1);
      }else{
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = async () => {
    const request = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        todo: currentTask,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCurrentTask("");
    if (request.ok) {
      console.log("success");
      setRerender(reRender + 1);
    } else {
      console.log("Error");
    }
  };

  // JSX Content
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
      <ol id="taskList" className="space-y-3 p-6 max-w-lg mx-auto">
        {tasks.map((currentTaks, index) => {
          return (
            <TodoItem
              todo={currentTaks}
              removeTaskWithIndex={removeTaskWithIndex}
              index={index}
              key={index}
            />
          );
        })}
      </ol>
    </main>
  );
};

export default App;
