import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import ToDoList from "./Components/ToDoList";

function App() {
  return (
    <>
      <MantineProvider>
        <Container size="xs" className="mt-10">
          <h1 className="text-xl font-bold text-center">ToDo List</h1>
          <ToDoList />
        </Container>
      </MantineProvider>
    </>
  );
}

export default App;
