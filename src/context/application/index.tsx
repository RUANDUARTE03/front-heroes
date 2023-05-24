import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextDefaultValuesProps = {
  token: string;
  setToken: (value: string) => void;
};

const contextDefaultValues: ContextDefaultValuesProps = {
  token: "",
  setToken: () => null,
};

export const ApplicationContext =
  createContext<ContextDefaultValuesProps>(contextDefaultValues);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");

  return (
    <ApplicationContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}
