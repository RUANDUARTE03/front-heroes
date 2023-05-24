import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { HeroesService } from "../../services/heroes";
import { useApplicationContext } from "../../context/application";
import { Button } from "src/components";

type HeroesProps = {
  _id: string;
  name: string;
  typeHeroe: string;
  classHeroe: string;
};

const Home = () => {
  const [listHeroes, setListHeroes] = useState<HeroesProps[]>();
  const { token } = useApplicationContext();

  useEffect(() => {
    const getAllHeroes = async () => {
      const { body } = await new HeroesService().listAllHeroes({ token });

      setListHeroes(body);
    };

    getAllHeroes();
  }, []);

  return (
    <S.ContainerHome>
      <S.ContainerActions>
        <Button width="120px" onClick={() => null}>
          <p>Adicionar</p>
        </Button>
      </S.ContainerActions>
      <S.BodyItemsHeroes>
        {listHeroes?.map((heroe) => {
          return (
            <S.ItemHeroe>
              <S.InfomationsHeroe>
                <p className="name">
                  <span>Nome</span>: {heroe.name}
                </p>
                <p className="classHeroe">
                  <span>Classe</span>: {heroe.classHeroe}
                </p>
                <p className="type">
                  <span>Tipo</span>: {heroe.typeHeroe}
                </p>
              </S.InfomationsHeroe>
              <S.ActionsHeroe></S.ActionsHeroe>
            </S.ItemHeroe>
          );
        })}
      </S.BodyItemsHeroes>
    </S.ContainerHome>
  );
};

export default Home;
