import { FC } from "react";
import { ErrorProvider } from "./contexts/ErrorContext";
import Home from "./components/Home";

import "./styles/Home.css";
import "./styles/ExpenseItem.css";
import "./styles/Group.css";
import "./styles/List.css";
import "./styles/Modal.css";
import "./styles/Toolbar.css";

const App: FC = () => (
  <ErrorProvider>
    <Home />
  </ErrorProvider>
);

export default App;
