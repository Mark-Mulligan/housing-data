export const extractSearchString = (url: string) => {
  let searchString = "";
  if (url.includes("?")) {
    const startingPoint = url.indexOf("?");
    searchString = url.slice(startingPoint);
  }

  return searchString;
};
