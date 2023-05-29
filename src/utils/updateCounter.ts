const updateCounter = (targetDate?: Date) => {
  if (!targetDate) return;

  const currentDate = new Date();
  const elapsedTime = new Date(targetDate).getTime() - currentDate.getTime();

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);

  if (seconds < 0) {
    return "";
  }

  return `${hours}h ${minutes}m ${seconds}s`;
};

export { updateCounter };
