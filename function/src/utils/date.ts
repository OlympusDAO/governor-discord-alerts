export const fromBlockTimestamp = (timestamp: number | string) => {
  return new Date(Number(timestamp) * 1000);
};
