import { useState } from "react";
import ToDoItem from "./ToDoItem";
import data from "../json/task.json";
import { Button, Input, Divider } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { isEmptyString } from "../lib/util";

interface Props {
  text: string;
  onChange: (text: string) => void;
  onClick: (text: string) => void;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState(data);
  const [text, setText] = useState("");

  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      dateAdded: new Date().toDateString(),
    };
    setTasks([...tasks, newTask]);
    setText("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="mx-auto rounded-xl">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      <Divider my="md" />
      <AddTask text={text} onChange={setText} onClick={addTask} />
    </div>
  );
}

const AddTask = ({ onChange, onClick, text }: Props) => {
  const [errorText, setErrorText] = useState(false);
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setErrorText(false);
    if (e.key == "Enter") {
      if (!isEmptyString(text)) {
        setErrorText(false);
        onClick(text);
      } else {
        setErrorText(true);
      }
    }
  };

  return (
    <>
      <div className="flex w-full justify-center gap-3 flex-wrap sm:flex-nowrap">
        <Input
          value={text}
          placeholder="Add new task..."
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className="w-full sm:w-10/12"
          onKeyUp={handleOnKeyUp}
        />
        <Button
          variant="filled"
          onClick={() => {
            onClick(text);
          }}
          className="w-full sm:w-2/12"
          disabled={!text}
        >
          Add
        </Button>
      </div>
      {errorText && (
        <p className="text-sm text-red-500 p-2 gap-2 flex">
          <IconExclamationCircle className="inline" size={20} /> Can't add empty
          task silly...
        </p>
      )}
    </>
  );
};
function isBlankString() {
  throw new Error("Function not implemented.");
}
