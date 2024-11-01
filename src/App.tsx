import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import ToDoList from "./Components/ToDoList";

function App() {
  return (
    <>
      <MantineProvider>
        <Container size="xs" className="mt-10">
          <h1 className="text-xl font-bold text-center">To Do List</h1>
          <ToDoList />
        </Container>
        <Notifications />
      </MantineProvider>
    </>
  );
}

export default App;
