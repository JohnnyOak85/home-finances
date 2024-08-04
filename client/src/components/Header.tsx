import localization from "../localization/pt-PT";

import "../styles/Header.css";
import Toolbar from "./Toolbar";

const Header = () => {
  const { title } = localization;

  return (
    <header>
      <h1>{title}</h1>
      <Toolbar />
    </header>
  );
};

export default Header;
