import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useApplicationContext } from "../../context/application";
import { isValidEmail } from "../../utils/emailValid";
import { RegisterService } from "src/services/register";

const Register = () => {
  const navigate = useNavigate();
  const { token, messageAlert, setMessageAlert, setTypeMessage } = useApplicationContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleRegister = async () => {
    const checkIfAllInformations =
      !!firstName.length ||
      !!lastName.length ||
      !!email.length ||
      !!password.length ||
      !!passwordConfirmation.length;

    if (!checkIfAllInformations) {
      setMessageAlert("Preencha todas as informações");

      return;
    }

    const checkEmail = isValidEmail(email);

    if (!checkEmail) {
      setMessageAlert("Email inválido");

      return;
    }

    if (password !== passwordConfirmation) {
      setMessageAlert("Confirmação de senha inválida");

      return;
    }

    const { body } = await new RegisterService().create({
      email,
      firstName,
      lastName,
      password,
    });

    if (!body.error) {
      navigate("/login");
      setTypeMessage('success')
      setMessageAlert('Sucesso ao criar usuário')
    } else {
      setMessageAlert("Erro ao tentar registrar-se");
    }
  };

  return (
    <S.ContainerRegister>
      <S.ContainerModalRegister>
        <S.Title>Register</S.Title>
        <S.BodyForm>
          <S.InputInformation
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nome"
          />
          <S.InputInformation
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Sobrenome"
          />
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
          <S.InputInformation
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirmação de senha"
            type="password"
          />
        </S.BodyForm>
        <S.ErroMessage>{messageAlert}</S.ErroMessage>
        <Button onClick={handleRegister}>
          <p>Registrar-se</p>
        </Button>
        <Button
          onClick={() => {
            navigate("/login");
          }}
          version={"v2"}
        >
          <p>Cancelar</p>
        </Button>
      </S.ContainerModalRegister>
    </S.ContainerRegister>
  );
};

export default Register;
