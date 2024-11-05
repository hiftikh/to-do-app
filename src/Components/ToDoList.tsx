import { useState } from "react";
import ToDoItem from "./ToDoItem";
import { Button, Input, Divider } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { isEmptyString } from "../lib/util";
import { notifications } from "@mantine/notifications";
import useTaskStore from "./hooks/useTaskStore";

interface Props {
  text: string;
  onChange: (text: string) => void;
  onClick: (text: string) => void;
}

export default function ToDoList() {
  const [text, setText] = useState("");
  const { taskList, addTask, clearTasks } = useTaskStore((state) => state);

  const addTaskHandle = (text: string) => {
    const newTask = {
      id: Date.now(),
      name: text,
      completed: false,
      dateAdded: new Date(),
    };
    addTask(newTask);
    setText("");
  };

  const onClickClearTasks = () => {
    clearTasks();
  };

  return (
    <div className="mx-auto rounded-xl">
      <ToDoItem />
      <Divider my="md" />
      <AddTask text={text} onChange={setText} onClick={addTaskHandle} />
      <br />
      <Button
        onClick={onClickClearTasks}
        className="w-full "
        disabled={taskList.length < 1}
      >
        Clear History
      </Button>
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
        notifications.show({
          color: "green",
          title: "Task Added",
          message: `"${text}"`,
          autoClose: 2000,
          position: "bottom-center",
        });
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
