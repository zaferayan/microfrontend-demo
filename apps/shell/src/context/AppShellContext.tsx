// This file stores shell-owned global user and theme state.
import React from "react";

type ThemeMode = "light" | "dark";

interface UserProfile {
  name: string;
  role: string;
}

interface AppShellContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  user: UserProfile;
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null);

export const AppShellProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<ThemeMode>("light");

  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const value = React.useMemo<AppShellContextValue>(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === "light" ? "dark" : "light")),
      user: {
        name: "Zafer AYAN",
        role: "React Architect",
      },
    }),
    [theme],
  );

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
};

export const useAppShell = (): AppShellContextValue => {
  const context = React.useContext(AppShellContext);

  if (!context) {
    throw new Error("useAppShell must be used within AppShellProvider");
  }

  return context;
};
