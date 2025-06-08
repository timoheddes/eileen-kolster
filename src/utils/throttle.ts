export const throttle = (func: () => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};
