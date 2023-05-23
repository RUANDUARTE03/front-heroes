import styled from "styled-components";
import { primary, secondary } from "../../styles/variables";

export const ContainerHeader = styled.div`
  background-color: ${secondary};
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%
`;

export const BodyInformations = styled.div`
  display: flex;

  & p {
    cursor: pointer;
    margin: 0 12px;
    font-size: 22px;
    font-weight: 700;
    color: ${primary};
  }
`;
