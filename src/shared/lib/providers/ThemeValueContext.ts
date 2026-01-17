import { createContext } from "react";
interface ThemeValue {
	theme: string;
	toggleTheme: () => void;
}
export const ThemeValueContext = createContext<ThemeValue | null>(null);