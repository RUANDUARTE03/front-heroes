import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { AuthService } from "../../services/auth";
import { useApplicationContext } from "../../context/application";
import { isValidEmail } from "../../utils/emailValid";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, messageAlert, setMessageAlert, typeMessage } =
    useApplicationContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!password.length && !email.length) {
      setMessageAlert("Preencha as informações");

      return;
    }

    const checkEmail = isValidEmail(email);

    if (!checkEmail) {
      setMessageAlert("Email inválido");

      return;
    }

    const { body } = await new AuthService().login({ email, password });

    if (!body.error) {
      setToken(body.token);
      navigate("/home");
    } else {
      setMessageAlert("Erro ao tentar logar");
    }
  };

  console.log(typeMessage);

  return (
    <S.ContainerLogin>
      {typeMessage === "success" && (
        <S.SuccessMessage>
          <p>{messageAlert}</p>
        </S.SuccessMessage>
      )}
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
        {typeMessage === "" && <S.ErroMessage>{messageAlert}</S.ErroMessage>}
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
