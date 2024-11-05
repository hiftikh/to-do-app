import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useTaskStore from "./hooks/useTaskStore";

export default function ClearHistory() {
  const { taskList, clearTasks } = useTaskStore((state) => state);

  const onClickClearTasks = () => {
    clearTasks();
    notifications.show({
      color: "green",
      title: "All tasks have been deleted.",
      message: "",
      autoClose: 2000,
      position: "bottom-center",
    });
  };
  return (
    <Button
      onClick={onClickClearTasks}
      className="w-full mt-10"
      disabled={taskList.length === 0}
    >
      Clear History
    </Button>
  );
}
