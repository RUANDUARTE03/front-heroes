import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import * as S from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { HeroesService } from "../../services/heroes";
import { useApplicationContext } from "src/context/application";

const CreateHeroe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setMessageAlert, token } = useApplicationContext();
  const [name, setName] = useState("");
  const [classHeroe, setClassHeroe] = useState("");
  const [typeHeroe, setTypeHeroe] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(false);

  useEffect(() => {
    if (id) {
      const getById = async () => {
        const { body } = await new HeroesService().getHeroeById({ id });

        setName(body.name);
        setClassHeroe(body.classHeroe);
        setTypeHeroe(body.typeHeroe);
      };

      getById();
    }
  }, []);

  const handleCreateHeroe = async () => {
    const { body } = await new HeroesService().createHeroe({
      name,
      classHeroe,
      typeHeroe,
    });

    if (!body.isError) {
      setMessageAlert("Herói adicionado com sucesso");
      navigate("/home");
    }
  };

  const handleUpdateHeroe = async () => {
    if (!id) return null;

    const { body } = await new HeroesService().updateHeroeById({
      classHeroe,
      id,
      name,
      typeHeroe,
    });

    if (!body.isError) {
      setMessageAlert("Herói alterado com sucesso");
      navigate("/home");
    }
  };

  const handleRemove = async () => {
    if (!id) return null;

    if (!confirmRemove) {
      setConfirmRemove(true);
    } else {
      const { body } = await new HeroesService().removeHeroeById({ id });

      if (!body.isError) {
        setConfirmRemove(false);
        setMessageAlert("Herói removido com sucesso");
        navigate("/home");
      }
    }
  };

  return (
    <S.ContainerCreateHeroe>
      <S.ContainerModalCreateHeroe>
        <S.Title>{id ? "Herói" : "Adicionar Herói"}</S.Title>
        <S.BodyForm>
          <S.InputInformation
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Herói"
          />
          <S.InputInformation
            value={classHeroe}
            onChange={(e) => setClassHeroe(e.target.value)}
            placeholder="Classe do Herói - ex (S, A, B, C)"
          />
          <S.InputInformation
            value={typeHeroe}
            onChange={(e) => setTypeHeroe(e.target.value)}
            placeholder="Tipo do Herói - ex (Ice, Fire)"
          />
        </S.BodyForm>
        <Button onClick={id ? handleUpdateHeroe : handleCreateHeroe}>
          <p>{id ? "Alterar" : "Adicionar"}</p>
        </Button>
        {id && (
          <Button onClick={handleRemove}>
            <p>{confirmRemove ? "Confirmar Exclusão" : "Excluir"}</p>
          </Button>
        )}
        <Button
          onClick={() => {
            navigate("/home");
          }}
          version={"v2"}
        >
          <p>{id ? "Voltar" : "Cancelar"}</p>
        </Button>
      </S.ContainerModalCreateHeroe>
    </S.ContainerCreateHeroe>
  );
};

export default CreateHeroe;
