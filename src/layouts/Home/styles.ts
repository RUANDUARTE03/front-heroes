import { primary, secondary } from "src/styles/variables";
import styled from "styled-components";

export const ContainerHome = styled.div`
  padding: 40px 60px;
`;

export const MessageAlert = styled.p`
  color: ${secondary};
  text-align: center;
`;

export const ContainerActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-left: -20px;
`;

export const BodyItemsHeroes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 40px 0;
`;

export const ItemHeroe = styled.div`
  border: 1px solid ${secondary};
  margin: 0 20px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 28px 0;
`;

export const InfomationsHeroe = styled.div`
  & p {
    color: ${primary};
    font-size: 16px;
    font-weight: 500;
  }

  & span {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const ActionsHeroe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
