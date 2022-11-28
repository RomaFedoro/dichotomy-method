export const findLocalMaximum = ({ func, start, end, precision }) => {
  const x = (start + end) / 2;
  const f1 = func(x - precision);
  const f2 = func(x + precision);

  if (f1 < f2) return [x, end];
  return [start, x];
};
