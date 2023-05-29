import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useThreatsApplication } from "src/context/threats";
import { HeroesProps } from "src/models/HeroesProps";
import { findNearestLocation } from "src/utils/calculeDistance";
import { getDate } from "src/utils/getDate";
import { updateCounter } from "src/utils/updateCounter";
import * as S from "./styles";

type ThreatsProps = {
  listHeroes: HeroesProps[];
};

const Threats = ({ listHeroes }: ThreatsProps) => {
  const {
    closer,
    setIdCloser,
    setCurrentThreat,
    currentThreat,
    allThreat,
    saveBatleThreast,
    heroeSend,
    setHeroeSend,
  } = useThreatsApplication();
  const [isIgnored, setIsIgnored] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const socket = io("https://zrp-challenges-dev-production.up.railway.app/");

    socket.on("connect", () => {
      console.log("Conectado ao serviço de WebSocket.");
    });

    socket.on("occurrence", (data) => {
      setCurrentThreat(data);
      setIsIgnored(false);
      setHeroeSend(false);
      const location = data.location[0];

      const filterByClass = listHeroes.filter((heroe) => {
        if (data.dangerLevel === "God") {
          return heroe.classHeroe === "S";
        }
        if (data.dangerLevel === "Dragon") {
          return heroe.classHeroe === "A";
        }
        if (data.dangerLevel === "Tiger") {
          return heroe.classHeroe === "B";
        }
        if (data.dangerLevel === "Wolf") {
          return heroe.classHeroe === "C";
        }
      });

      const filterIfBalte = filterByClass?.filter((heroe) => !heroe.inBatle);

      const filteredData = filterIfBalte.map(
        ({ latitude, longitude, _id }) => ({
          id: _id,
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        })
      );

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimeElapsed: { [key: number]: string } = {};
      allThreat?.forEach((threat, index) => {
        const elapsedTime = updateCounter(threat?.timeDuration);
        if (elapsedTime) {
          updatedTimeElapsed[index] = elapsedTime;
        }
      });
      setTimeElapsed(updatedTimeElapsed);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [allThreat]);

  const handleIgnore = () => {
    setIsIgnored(true);
  };

  const sendHeroe = async () => {
    saveBatleThreast();
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
          <p className="alertMessage">Ignorado</p>
        ) : heroeSend ? (
          <p className="alertMessage">Heroi Enviado</p>
        ) : (
          <>
            <S.HeroeCloser>
              <p className="nameHeroe">Nome: {closer?.name}</p>
              <p className="classHeroe">Classe: {closer?.classHeroe}</p>
              <p className="latHeroe">Latitude: {closer?.latitude}</p>
              <p className="lngHeroe">Longitude: {closer?.longitude}</p>
            </S.HeroeCloser>
            <div className="actions">
              <div className="ignore" onClick={handleIgnore}>
                <p>Ignorar</p>
              </div>
              <div className="sendHeroe" onClick={sendHeroe}>
                <p>Enviar Heroi</p>
              </div>
            </div>
          </>
        )}
      </S.CardThreat>

      <S.ContainerLastsThreats>
        {allThreat?.slice(heroeSend ? 1 : 0).map((threat, index) => {
          let exactDuration;

          if (threat.exactDuration) {
            exactDuration = getDate(threat.exactDuration);
          }

          return (
            <S.CardThreat key={index}>
              <img src={threat?.url} />
              <p className="name">Nome: {threat?.name}</p>
              <p className="level">Nível: {threat?.dangerLevel}</p>
              {exactDuration && (
                <p className="duration">Duração: {exactDuration}</p>
              )}
              <br />
              <p>{timeElapsed[index]}</p>
            </S.CardThreat>
          );
        })}
      </S.ContainerLastsThreats>
    </S.ContainerThreat>
  );
};

export { Threats };
