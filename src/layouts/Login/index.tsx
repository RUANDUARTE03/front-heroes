import React, { useState } from "react";
import * as S from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.ContainerLogin>
      <S.ContainerModalLogin>
        <S.Title>Login Heroes</S.Title>
        <S.BodyForm>
          <S.InputInformation
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <S.InputInformation
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </S.BodyForm>
        <S.BtnLogin>
          <p>Login</p>
        </S.BtnLogin>
        <S.InformationRegister>
          Ainda não tem cadastro? <span>Registre-se</span>
        </S.InformationRegister>
      </S.ContainerModalLogin>
    </S.ContainerLogin>
  );
};

export default Login;
