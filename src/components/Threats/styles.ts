import { light, primary, secondary } from "src/styles/variables";
import styled from "styled-components";

export const ContainerThreat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: ${primary};
`;

export const CurrentThreat = styled.p`
  font-size: 20px;
  margin: 16px 0;
  font-weight: 500;
  columns: ${primary};
`;

export const CardThreat = styled.div`
  border: 1px solid ${secondary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  width: 40%;
  margin: 12px;

  @media (max-width: 769px) {
    width: 90%;
  }

  & img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  & p {
    font-size: 22px;
    font-weight: 500;
    color: ${secondary};
  }

  & p.ignoreMessage {
    font-size: 20px;
    font-weight: 700;
    color: ${primary} !important;
    margin: 12px 0 0;
  }

  & div.actions {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin: 20px 0 0;

    & div.ignore {
      background-color: red;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;

      & p {
        color: ${light} !important;
      }
    }

    & div.sendHeroe {
      background-color: ${primary};
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;

      & p {
        color: ${light} !important;
      }
    }
  }
`;

export const ContainerLastsThreats = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
