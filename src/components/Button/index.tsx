import React, { ReactNode } from "react";
import * as S from "./styles";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  version?: "v1" | "v2";
  width?: string;
};

const Button = ({
  children,
  onClick,
  version = "v1",
  width = "60%",
}: ButtonProps) => {
  return (
    <S.ContainerButton width={width} onClick={onClick} version={version}>
      {children}
    </S.ContainerButton>
  );
};

export { Button };
