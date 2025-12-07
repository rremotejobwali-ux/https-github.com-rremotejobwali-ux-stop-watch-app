/**
 * Formats milliseconds into a time string structure.
 * @param ms - The time in milliseconds.
 * @returns Object containing formatted strings for minutes, seconds, and centiseconds.
 */
export const formatTimeParts = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    centiseconds: centiseconds.toString().padStart(2, '0'),
  };
};

/**
 * Formats milliseconds into a standard "MM:SS.ms" string.
 */
export const formatTimeFull = (ms: number): string => {
  const { minutes, seconds, centiseconds } = formatTimeParts(ms);
  return `${minutes}:${seconds}.${centiseconds}`;
};
