import "@mantine/core/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import useThemeStore from "./Components/hooks/useThemeStore";
import useTaskStore from "./Components/hooks/useTaskStore";
import ToDoList from "./Components/ToDoList";
import DarkModeToggle from "./Components/DarkModeToggle";

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
          <ToDoList />
        </Container>
        <Notifications />
      </MantineProvider>
    </>
  );
}

export default App;
