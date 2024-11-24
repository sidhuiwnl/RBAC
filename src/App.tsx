import { ThemeProvider } from "@/components/theme-provider";
import Main from "./components/Main";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen ">
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
