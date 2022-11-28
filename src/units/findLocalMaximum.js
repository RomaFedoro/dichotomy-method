const findLocalMaximum = ({ func, a, b, precision }) => {
  const x = (a + b) / 2;
  console.log(func);
  const f1 = func(x - precision);
  const f2 = func(x + precision);

  if (f1 < f2) return { a: x, b };
  return { a, b: x };
};

export default findLocalMaximum;
