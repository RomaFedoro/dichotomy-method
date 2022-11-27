const calcIntegral = ({ start, end, precision, func, isNegative }) => {
  if (start === end) return 0;

  const count = (end - start) / precision;

  let result = 0;
  for (let i = 1; i <= count; i++) {
    result += func(start + precision * (i - 0.5));
  }
  result *= precision;

  if (isNegative) {
    result *= -1;
  }

  return result;
};

export default calcIntegral;
