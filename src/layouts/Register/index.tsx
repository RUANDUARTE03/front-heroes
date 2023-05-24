import React, { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
          />
          <S.InputInformation
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirmação de senha"
          />
        </S.BodyForm>
        <Button onClick={() => null}>
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
