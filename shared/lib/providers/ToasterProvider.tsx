import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
type Value = {
  success: boolean;
  text: string;
};
const ToasterValueContext = createContext<Value | null>(null);
const ToasterActionContext = createContext<{
  changeToaster: (newValue: Value | null) => void;
} | null>(null);

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<Value | null>(null);

  const changeToaster = useCallback((newValue: Value | null) => {
    setValue(newValue);
	}, []);
	const actions = useMemo(
    () => ({
      changeToaster,
    }),
    [changeToaster]
  );

  return (
    <ToasterActionContext.Provider value={actions}>
      <ToasterValueContext.Provider value={value}>
        {children}
      </ToasterValueContext.Provider>
    </ToasterActionContext.Provider>
  );
};

export default ToasterProvider;
export { ToasterActionContext, ToasterValueContext };
