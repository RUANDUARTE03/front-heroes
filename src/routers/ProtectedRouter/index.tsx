import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApplicationContext } from "src/context/application";

type ProtectedRouterProps = {
  children: ReactNode;
};

const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
  const { token } = useApplicationContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export { ProtectedRouter };
