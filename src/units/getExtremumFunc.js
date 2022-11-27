import getParamRectangles from "./getParamRectangles";

const getExtremumFunc = ({ start, end, precision, func }) => {
  let min = func(start);
  let max = func(start);

  const { numberRectangles, widthRectangle } = getParamRectangles(
    start,
    end,
    precision
  );

  for (let i = 1; i <= numberRectangles; i++) {
    const value = func(start + widthRectangle * i);
    if (min > value) {
      min = value;
    }
    if (max < value) {
      max = value;
    }
  }

  return { min, max };
};

export default getExtremumFunc;
