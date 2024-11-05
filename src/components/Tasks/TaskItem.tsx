import { Checkbox, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate, joinClassNames } from "../../lib/util";
import { notifications } from "@mantine/notifications";
import useTaskStore from "../../hooks/useTaskStore";

export default function TaskItem() {
  const { taskList, deleteTask, toggleComplete } = useTaskStore(
    (state) => state
  );
  const onChangeCompleteHandle = (id: number) => {
    toggleComplete(id);
  };

  const onClickDeleteBtnHandle = (id: number) => {
    deleteTask(id);
    const taskName = taskList.filter((task) => task.id === id)[0].name;
    notifications.show({
      color: "red",
      title: "Task Removed",
      message: `"${taskName}"`,
      autoClose: 2000,
      position: "bottom-center",
    });
  };

  return (
    <>
      {taskList?.map((task) => {
        return (
          <div
            key={task.id}
            className={joinClassNames(
              "flex my-5 rounded-xl justify-between items-center gap-5 shadow-lg p-5",
              task.completed ? "bg-green-300" : "bg-white"
            )}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => onChangeCompleteHandle(task.id)}
            />
            <div className="w-5/6 text-left text-black">
              <p>{task.name}</p>
              {task.dateAdded && (
                <span className="text-[7pt]">
                  {formatDate(task.dateAdded.toString())}
                </span>
              )}
            </div>
            <div className="flex flex-row">
              <Button
                variant="filled"
                color="red"
                size="xs"
                onClick={() => onClickDeleteBtnHandle(task.id)}
              >
                <IconTrash size={14} />
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
