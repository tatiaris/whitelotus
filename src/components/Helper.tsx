export const sum = (a: number, b: number): number => {
  return a + b;
};

export const navigatePath = (path: string): void => {
  location.href = path;
};
