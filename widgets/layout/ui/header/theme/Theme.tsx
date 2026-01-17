import { useContext } from "react";
import "./Theme.scss";
import { ThemeValueContext } from "@/shared/lib";

const Theme = () => {
  const theme = useContext(ThemeValueContext);
  return (
    <div className="theme">
      <label className="theme__label" htmlFor="theme">
        <p className="theme__title">
          {theme?.theme === "light" ? "Светлая тема" : "Темная тема"}
        </p>
        <input
          className="theme__input visually-hidden"
          type="checkbox"
          name="theme"
          id="theme"
          onChange={theme?.toggleTheme}
        />
        <span className="theme__custom-toggle" />
      </label>
    </div>
  );
};

export default Theme;
