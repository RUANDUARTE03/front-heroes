import styled from "styled-components";
import { primary, secondary } from "../../styles/variables";

export const ContainerHeader = styled.div`
  align-items: center;
  background-color: ${secondary};
  display:flex;
  justify-content: space-between;
  padding: 0 5%
`;

export const BodyInformations = styled.div`
  display: flex;

  & p {
    color: ${primary};
    cursor: pointer;
    font-size: 22px;
    font-weight: 700;
    margin: 0 12px;
  }
`;
