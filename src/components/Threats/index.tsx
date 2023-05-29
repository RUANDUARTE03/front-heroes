import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useThreatsApplication } from "src/context/threats";
import { HeroesProps } from "src/models/HeroesProps";
import { findNearestLocation } from "src/utils/calculeDistance";
import * as S from "./styles";

type ThreatsProps = {
  listHeroes: HeroesProps[];
};

const Threats = ({ listHeroes }: ThreatsProps) => {
  const { setIdCloser, setCurrentThreat, currentThreat, allThreat } =
    useThreatsApplication();
  const [isIgnored, setIsIgnored] = useState(false);

  useEffect(() => {
    const socket = io("https://zrp-challenges-dev-production.up.railway.app/");

    socket.on("connect", () => {
      console.log("Conectado ao serviço de WebSocket.");
    });

    socket.on("occurrence", (data) => {
      setCurrentThreat(data);
      setIsIgnored(false);
      const location = data.location[0];

      const filteredData = listHeroes.map(({ latitude, longitude, _id }) => ({
        id: _id,
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      }));

      const response = findNearestLocation(
        filteredData,
        location.lat,
        location.lng
      );

      if (response) {
        setIdCloser(response?.id);
      }
    });

    socket.on("error", (error) => {
      console.log("Erro recebido:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleIgnore = () => {
    setIsIgnored(true);
  };

  return (
    <S.ContainerThreat>
      <S.Title>As ameaças estão por vir</S.Title>
      <S.CurrentThreat>Essa é a ameaça atual:</S.CurrentThreat>

      <S.CardThreat>
        <img src={currentThreat?.monster?.url} />
        <p className="name">Nome: {currentThreat?.monster.name}</p>
        <p className="level">Nível: {currentThreat?.dangerLevel}</p>
        {isIgnored ? (
          <p className="ignoreMessage">Ignorado</p>
        ) : (
          <div className="actions">
            <div className="ignore" onClick={handleIgnore}>
              <p>Ignorar</p>
            </div>
            <div className="sendHeroe">
              <p>Enviar Heroi</p>
            </div>
          </div>
        )}
      </S.CardThreat>

      <S.ContainerLastsThreats>
        {allThreat?.map((threat, index) => (
          <S.CardThreat key={index}>
            <img src={threat?.url} />
            <p className="name">Nome: {threat?.name}</p>
            <p className="level">Nível: {threat?.dangerLevel}</p>
          </S.CardThreat>
        ))}
      </S.ContainerLastsThreats>
    </S.ContainerThreat>
  );
};

export { Threats };
