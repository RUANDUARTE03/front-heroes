import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { AuthService } from "../../services/auth";
import { useApplicationContext } from "../../context/application";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useApplicationContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const { body } = await new AuthService().login({ email, password });

    setToken(body.token);
    navigate("/home");
  };

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
            type="password"
          />
        </S.BodyForm>
        <Button onClick={handleLogin}>
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
