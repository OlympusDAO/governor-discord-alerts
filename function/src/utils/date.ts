export const fromBlockTimestamp = (timestamp: number | string) => {
  return new Date(Number(timestamp) * 1000);
};

export const toBlockTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
