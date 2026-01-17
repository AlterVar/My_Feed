import { ThemeValueContext } from "@/shared/lib";
import { useEffect, useState, type ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    return theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeValueContext.Provider value={value}>
      <SkeletonTheme
        baseColor={
          theme === "light" ? "rgb(219, 219, 219, 0.05)" : "rgb(0, 0, 0, 0.05)"
        }
        highlightColor={
          theme === "light" ? "rgb(219, 219, 219, 1)" : "rgb(0, 0, 0, 1)"
        }
				duration={0.5}
        customHighlightBackground="linear-gradient(90deg, var(--base-color) 0%, var(--highlight-color) 60%, var(--base-color) 100%)"
      >
        {children}
      </SkeletonTheme>
    </ThemeValueContext.Provider>
  );
};

export default ThemeProvider;
