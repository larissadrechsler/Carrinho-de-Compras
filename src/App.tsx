import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <div>
        <h1>Projeto Inicializado com Sucesso!</h1>
      </div>
    </MantineProvider>
  );
}

export default App;
