import { DangerLevelProps } from "../context/threats";

const rangeDate = (dangerLevel: DangerLevelProps) => {
  if (dangerLevel === "God") {
    return {
      minMinutes: 5,
      maxMinutes: 10,
    };
  }
  if (dangerLevel === "Dragon") {
    return {
      minMinutes: 2,
      maxMinutes: 5,
    };
  }
  if (dangerLevel === "Tiger") {
    return {
      minMinutes: 10 / 60,
      maxMinutes: 20 / 60,
    };
  }

  return {
    minMinutes: 1 / 60,
    maxMinutes: 2 / 60,
  };
};

const generateRandomDate = (dangerLevel: DangerLevelProps) => {
  const currentDate = new Date();

  const { maxMinutes, minMinutes }: { minMinutes: number; maxMinutes: number } =
    rangeDate(dangerLevel);

  const randomMinutes =
    Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
  const futureDate = new Date(currentDate.getTime() + randomMinutes * 60000);

  return futureDate;
};

export { generateRandomDate };
