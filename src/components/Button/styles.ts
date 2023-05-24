import styled from "styled-components";
import { light, primary, secondary } from "src/styles/variables";

type ContainerButtonProps = {
  version: "v1" | "v2";
};

export const ContainerButton = styled.div<ContainerButtonProps>`
  align-items: center;
  background-color: ${(props) =>
    props.version === "v1" ? `${light}` : `${secondary}`};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 12px 0 20px;
  width: 60%;

  & p {
    color: ${primary};
    font-size: 16px;
    font-weight: 700;
  }
`;
