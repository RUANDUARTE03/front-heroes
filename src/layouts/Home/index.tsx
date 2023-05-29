import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { HeroesService } from "../../services/heroes";
import { useApplicationContext } from "../../context/application";
import { Button, Threats } from "src/components";
import { useNavigate } from "react-router-dom";
import { HeroesProps } from "src/models/HeroesProps";

const Home = () => {
  const navigate = useNavigate();
  const [listHeroes, setListHeroes] = useState<HeroesProps[]>();
  const { token, messageAlert } = useApplicationContext();

  useEffect(() => {
    const getAllHeroes = async () => {
      const { body } = await new HeroesService().listAllHeroes({ token });

      setListHeroes(body);
    };

    getAllHeroes();
  }, []);

  const redirectCreateHeroe = () => {
    navigate("/create/heroe");
  };

  if (!listHeroes) return <></>;

  return <Threats listHeroes={listHeroes} />;

  // return (
  //   <S.ContainerHome>
  //     <S.MessageAlert>{messageAlert}</S.MessageAlert>
  //     <S.ContainerActions>
  //       <Button width="120px" onClick={redirectCreateHeroe}>
  //         <p>Adicionar</p>
  //       </Button>
  //     </S.ContainerActions>
  //     <S.BodyItemsHeroes>
  //       {listHeroes?.map((heroe, index) => {
  //         return (
  //           <S.ItemHeroe key={index}>
  //             <S.InfomationsHeroe>
  //               <p className="name">
  //                 <span>Nome</span>: {heroe.name}
  //               </p>
  //               <p className="classHeroe">
  //                 <span>Classe</span>: {heroe.classHeroe}
  //               </p>
  //               <p className="type">
  //                 <span>Tipo</span>: {heroe.typeHeroe}
  //               </p>
  //               <p className="latitude">
  //                 <span>Latitude</span>: {heroe.latitude}
  //               </p>
  //               <p className="longitude">
  //                 <span>Longitude</span>: {heroe.longitude}
  //               </p>
  //             </S.InfomationsHeroe>
  //             <S.ActionsHeroe>
  //               <Button
  //                 onClick={() => navigate(`/edit/heroe/${heroe._id}`)}
  //                 version="v2"
  //               >
  //                 <p>Visualizar</p>
  //               </Button>
  //             </S.ActionsHeroe>
  //           </S.ItemHeroe>
  //         );
  //       })}
  //     </S.BodyItemsHeroes>
  //   </S.ContainerHome>
  // );
};

export default Home;
