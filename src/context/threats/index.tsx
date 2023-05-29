import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HeroesProps } from "src/models/HeroesProps";
import { HeroesService } from "src/services/heroes";
import { ThreatService } from "src/services/threat";

type DangerLevelProps = "God" | "Dragon" | "Tiger" | "Wolf";

type MonsterProps = {
  name: string;
  url: string;
};

export type ThreatProps = {
  dangerLevel: DangerLevelProps;
  monster: MonsterProps;
  name?: string;
  url?: string;
  heroe?: string;
  isCombat?: boolean;
  timeDuration?: Date;
};

type ContextThreatsProps = {
  closer: HeroesProps | null;
  idCloser: string;
  setIdCloser: (value: string) => void;
  currentThreat: ThreatProps | null;
  setCurrentThreat: (value: ThreatProps) => void;
  allThreat: ThreatProps[];
};

const contextDefaultValues: ContextThreatsProps = {
  closer: null,
  idCloser: "",
  setIdCloser: () => null,
  currentThreat: null,
  setCurrentThreat: () => null,
  allThreat: [],
};

export const ThreatsApplication =
  createContext<ContextThreatsProps>(contextDefaultValues);

export function ThreatsProvider({ children }: { children: ReactNode }) {
  const [idCloser, setIdCloser] = useState("");
  const [closer, setCloser] = useState<HeroesProps | null>(null);
  const [currentThreat, setCurrentThreat] = useState<ThreatProps | null>(null);
  const [allThreat, setAllThreat] = useState<ThreatProps[]>([]);
  const [refreshGetAll, setRefreshGetAll] = useState(false);

  // useEffect(() => {
  //   if (currentThreat) {
  //     const createThreat = async () => {
  //       const { dangerLevel, monster } = currentThreat;

  //       await new ThreatService().createThreat({ dangerLevel, monster });
  //       setRefreshGetAll(!refreshGetAll);
  //     };

  //     createThreat();
  //   }
  // }, [currentThreat]);

  useEffect(() => {
    const getAllThreats = async () => {
      const { body } = await new ThreatService().getAll();

      const removeFirstItem = body.slice(1);

      setAllThreat(removeFirstItem);
    };

    getAllThreats();
  }, [refreshGetAll]);

  useEffect(() => {
    if (idCloser) {
      const getHeroeCloser = async () => {
        const { body } = await new HeroesService().getHeroeById({
          id: idCloser,
        });

        console.log(body);

        setCloser(body);
      };

      getHeroeCloser();
    }
  }, [idCloser]);

  return (
    <ThreatsApplication.Provider
      value={{
        idCloser,
        closer,
        setIdCloser,
        currentThreat,
        setCurrentThreat,
        allThreat,
      }}
    >
      {children}
    </ThreatsApplication.Provider>
  );
}

export function useThreatsApplication() {
  return useContext(ThreatsApplication);
}
