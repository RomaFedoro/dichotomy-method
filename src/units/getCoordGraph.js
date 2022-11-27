const getCoordGraph =
  ({ globalMin, globalMax, scale, func }) =>
  (x, y) => {
    const xAxis = (x - globalMin.x) * scale.x;
    const yAxis = ((y ?? func(x)) - globalMax.y) * scale.y;
    return { x: xAxis, y: yAxis };
  };

export default getCoordGraph;
