import React, { ReactNode } from "react";
import * as S from "./styles";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  version?: "v1" | "v2";
};

const Button = ({ children, onClick, version = "v1" }: ButtonProps) => {
  return (
    <S.ContainerButton onClick={onClick} version={version}>
      {children}
    </S.ContainerButton>
  );
};

export { Button };
