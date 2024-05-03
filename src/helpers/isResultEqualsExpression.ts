const isResultEqualsExpression = (
  preloadResult: string,
  preloadExpression: string
) => {
  if (preloadResult === preloadExpression) return true;

  return false;
};

export default isResultEqualsExpression;
