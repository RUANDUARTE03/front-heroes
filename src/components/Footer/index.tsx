import React from "react";
import * as S from "./styles";

const Footer = () => {
  const currentYear = 3150 // new Date().getFullYear();

  return (
    <S.ContainerFooter>
      <p>
        &copy; {currentYear} Ruan de Sousa Duarte Consultoria em Tecnologia.
        Todos os direitos reservados.
      </p>
    </S.ContainerFooter>
  );
};

export { Footer };
