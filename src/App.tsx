import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, Container, Divider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import useThemeStore from "./hooks/useThemeStore";
import useTaskStore from "./hooks/useTaskStore";
import DarkModeToggle from "./components/DarkModeToggle";
import TaskList from "./components/Tasks/TaskList";
import AddTask from "./components/Tasks/AddTask";
import ClearHistory from "./components/ClearHistory";

function App() {
  const themeMode = useThemeStore((state) => state.themeMode);
  const { taskList } = useTaskStore((state) => state);

  return (
    <>
      <MantineProvider forceColorScheme={themeMode as "dark"}>
        <div className="absolute right-3 top-3">
          <DarkModeToggle />
        </div>
        <Container size="xs" className="mt-10 mb-10">
          <h1 className="text-xl font-bold text-center">
            To Do List ({taskList.length})
          </h1>
          <TaskList />
          <Divider my="md" />
          <AddTask />
          <ClearHistory />
        </Container>
        <Notifications />
      </MantineProvider>
    </>
  );
}

export default App;
