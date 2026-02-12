import { HashRouter } from "react-router-dom";
import { AppRouter } from "@/app/router";

export default function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}
