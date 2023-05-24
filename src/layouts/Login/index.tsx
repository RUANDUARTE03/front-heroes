import React, { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.ContainerLogin>
      <S.ContainerModalLogin>
        <S.Title>Login</S.Title>
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
        <Button onClick={() => null}>
          <p>Login</p>
        </Button>
        <S.InformationRegister>
          Ainda não tem cadastro?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Registre-se
          </span>
        </S.InformationRegister>
      </S.ContainerModalLogin>
    </S.ContainerLogin>
  );
};

export default Login;
