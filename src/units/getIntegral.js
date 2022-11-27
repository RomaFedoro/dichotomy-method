const calcIntegral = ({ start, end, precision, func, isNegative }) => {
  if (start === end) return 0;

  const count = (end - start) / 0.0001;

  let result = 0;
  for (let i = 1; i <= count; i++) {
    result += func(start + 0.0001 * (i - 0.5));
  }
  result *= 0.0001;

  if (isNegative) {
    result *= -1;
  }

  return result;
};

export default calcIntegral;
