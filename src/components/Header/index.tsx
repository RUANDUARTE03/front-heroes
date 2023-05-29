import React from "react";
import * as S from "./styles";

const Header = () => {
  return (
    <S.ContainerHeader>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <polygon points="50 10 90 90 10 90" fill="#e5e5e5" />
        <text
          x="50%"
          y="60%"
          fontFamily="Arial"
          fontSize="24"
          fontWeight="700"
          fill="#14213d"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Heroes
        </text>
      </svg>
      {/** @todo - remove when not logged */}
      <S.BodyInformations>
        <p>Perfil</p>
        <p>Login</p>
      </S.BodyInformations>
    </S.ContainerHeader>
  );
};

export { Header };
