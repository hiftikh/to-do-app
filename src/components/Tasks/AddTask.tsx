import { useState } from "react";
import { Button, Input } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { isEmptyString } from "../../lib/util";
import { notifications } from "@mantine/notifications";
import useTaskStore from "../../hooks/useTaskStore";

export default function AddTask() {
  const [text, setText] = useState("");
  const [errorText, setErrorText] = useState(false);
  const { addTask } = useTaskStore((state) => state);

  const addTaskHandle = (text: string) => {
    const newTask = {
      id: Date.now(),
      name: text,
      completed: false,
      dateAdded: new Date(),
    };
    addTask(newTask);
    setText("");
    notifications.show({
      color: "green",
      title: "Task Added",
      message: `"${text}"`,
      autoClose: 2000,
      position: "bottom-center",
    });
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setErrorText(false);
    if (e.key == "Enter") {
      if (!isEmptyString(text)) {
        addTaskHandle(text);
        setErrorText(false);
      } else {
        setErrorText(true);
      }
    }
  };

  return (
    <>
      <div className="flex w-full justify-center gap-3  mt-10">
        <Input
          value={text}
          placeholder="Add new task..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-9/12 md:w-10/12"
          onKeyUp={handleOnKeyUp}
        />
        <Button
          variant="filled"
          onClick={() => {
            addTaskHandle(text);
          }}
          className="w-3/12 md:w-2/12"
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
}
