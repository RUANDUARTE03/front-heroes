/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { generateRandomDate } from "src/utils/generateRandomDate";
import { updateCounter } from "src/utils/updateCounter";

export type DangerLevelProps = "God" | "Dragon" | "Tiger" | "Wolf";

export type MonsterProps = {
  name: string;
  url: string;
};

export type ThreatProps = {
  _id?: string;
  dangerLevel: DangerLevelProps;
  monster: MonsterProps;
  name?: string;
  url?: string;
  heroe?: string;
  isCombat?: boolean;
  timeDuration?: Date;
  exactDuration?: Date;
};

type ContextThreatsProps = {
  closer: HeroesProps | null;
  idCloser: string;
  setIdCloser: (value: string) => void;
  currentThreat: ThreatProps | null;
  setCurrentThreat: (value: ThreatProps) => void;
  allThreat: ThreatProps[];
  saveBatleThreast: () => void;
  heroeSend: boolean;
  setHeroeSend: (value: boolean) => void;
};

const contextDefaultValues: ContextThreatsProps = {
  closer: null,
  idCloser: "",
  setIdCloser: () => null,
  currentThreat: null,
  setCurrentThreat: () => null,
  allThreat: [],
  saveBatleThreast: () => null,
  heroeSend: false,
  setHeroeSend: () => null,
};

export const ThreatsApplication =
  createContext<ContextThreatsProps>(contextDefaultValues);

export function ThreatsProvider({ children }: { children: ReactNode }) {
  const [idCloser, setIdCloser] = useState("");
  const [closer, setCloser] = useState<HeroesProps | null>(null);
  const [currentThreat, setCurrentThreat] = useState<ThreatProps | null>(null);
  const [allThreat, setAllThreat] = useState<ThreatProps[]>([]);
  const [refreshGetAll, setRefreshGetAll] = useState(false);
  const [heroeSend, setHeroeSend] = useState(false);

  const saveBatleThreast = async () => {
    if (currentThreat) {
      const generateDate = generateRandomDate(currentThreat.dangerLevel);

      const getExactDate = updateCounter(generateDate) || "";

      const parts = getExactDate.split(" ");

      const hours = parseInt(parts[0].replace("h", ""));
      const minutes = parseInt(parts[1].replace("m", ""));
      const seconds = parseInt(parts[2].replace("s", ""));

      const duration = new Date();
      duration.setHours(hours);
      duration.setMinutes(minutes);
      duration.setSeconds(seconds);

      const { body } = await new ThreatService().createThreat({
        dangerLevel: currentThreat?.dangerLevel,
        monster: currentThreat?.monster,
        heroeId: closer?._id!,
        timeDuration: generateDate,
        exactDuration: duration,
      });

      if (!body.isError) {
        setRefreshGetAll(!refreshGetAll);
        setHeroeSend(true);
      }
    }
  };

  useEffect(() => {
    const getAllThreats = async () => {
      const { body } = await new ThreatService().getAll();

      body?.map(async (item: any) => {
        const elapsedTime = updateCounter(item?.timeDuration);

        if (!elapsedTime) {
          await new HeroesService().removeToBatle({ id: item.heroe });
        }
      });

      setAllThreat(body);
    };

    getAllThreats();
  }, [currentThreat, refreshGetAll]);

  useEffect(() => {
    if (idCloser) {
      const getHeroeCloser = async () => {
        const { body } = await new HeroesService().getHeroeById({
          id: idCloser,
        });

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
        saveBatleThreast,
        heroeSend,
        setHeroeSend,
      }}
    >
      {children}
    </ThreatsApplication.Provider>
  );
}

export function useThreatsApplication() {
  return useContext(ThreatsApplication);
}
