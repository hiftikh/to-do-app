import { Checkbox, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { TaskItemInterface } from "../Interface/TaskItem";
import { formatDate, joinClassNames } from "../lib/util";

interface TaskListInterface {
  task: TaskItemInterface;
  deleteTask: Function;
  toggleCompleted: Function;
}

interface Props {
  onClick?: React.MouseEventHandler;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export default function ToDoItem({
  task,
  deleteTask,
  toggleCompleted,
}: TaskListInterface) {
  const onChangeCompleteHandle = () => {
    toggleCompleted(task.id);
  };

  const onClickBtnHandle = () => {
    deleteTask(task.id);
  };

  return (
    <div
      className={joinClassNames(
        "flex my-5 rounded-xl justify-between items-center gap-5 shadow-lg p-5",
        task.completed ? "bg-green-400" : "bg-white"
      )}
    >
      <CompletedInput
        onChange={onChangeCompleteHandle}
        checked={task.completed}
      />
      <div className="w-5/6 text-left">
        <p>{task.text}</p>
        <span className="text-xs">
          Date Added: {formatDate(task.dateAdded.toString())}
        </span>
      </div>
      <div className="flex flex-row">
        <DeleteBtn onClick={onClickBtnHandle} />
      </div>
    </div>
  );
}

const DeleteBtn = ({ onClick }: Props) => {
  return (
    <Button variant="filled" color="red" size="xs" onClick={onClick}>
      <IconTrash size={14} />
    </Button>
  );
};

const CompletedInput = ({ onChange, checked }: Props) => {
  return (
    <>
      <Checkbox checked={checked} onChange={onChange} />
    </>
  );
};
