export const dateNow = () => {
  const date = new Date();
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};
