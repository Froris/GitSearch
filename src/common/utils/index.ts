export const formatDate: (date: string) => string = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};
