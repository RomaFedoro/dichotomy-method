const getParamRectangles = (start, end, precision) => {
  const numberRectangles = Math.ceil((end - start) / precision);

  return {
    numberRectangles,
    widthRectangle: (end - start) / numberRectangles,
  };
};

export default getParamRectangles;
