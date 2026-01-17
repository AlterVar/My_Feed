import type { ReactNode } from "react";
import GraphQLProvider from "./graphQL/GraphQLProvider";
import ThemeProvider from "@/app/providers/theme/ThemeProvider";
import { ToasterProvider } from "@/shared/lib";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <GraphQLProvider>
      <ThemeProvider>
        <ToasterProvider>{children}</ToasterProvider>
      </ThemeProvider>
    </GraphQLProvider>
  );
};

export default AppProviders;
