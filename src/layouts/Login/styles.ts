import { light, primary, secondary } from "src/styles/variables";
import styled from "styled-components";

export const ContainerLogin = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px - 42px);
  justify-content: center;
`;

export const ContainerModalLogin = styled.div`
  align-items: center;
  background-color: ${primary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 12px;
  width: 400px;
`;

export const Title = styled.p`
  color: ${light};
  font-size: 32px;
  font-weight: 400;
`;

export const BodyForm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px 0 16px;
  width: 100%;
`;

export const InputInformation = styled.input`
  border-radius: 8px;
  height: 40px;
  margin-top: 12px;
  padding-left: 8px;
  width: 80%;

  ::placeholder {
    padding-left: 8px;
  }
`;

export const InformationRegister = styled.p`
  color: ${light};
  font-size: 14px;
  font-weight: 600;

  & span {
    color: ${secondary};
    cursor: pointer;
  }
`;

export const ErroMessage = styled.p`
  color: red;
  font-size: 14px;
  font-weight: 400;
`;

export const SuccessMessage = styled.div`
  background-color: green;
  width: 400px;
  margin: 20px 0;
  padding: 12px;
  border-radius: 4px;

  & p {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
`