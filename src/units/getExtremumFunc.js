import { MAX_SCALE_Y } from "../constants/graph";

const getExtremumFunc = ({ start, end, precision, func }) => {
  let min = func(start);
  let max = func(start);

  const n = Math.ceil((end - start) / precision);

  for (let i = 1; i <= n; i++) {
    const x = start + i * precision;
    const y = func(x);

    if (y < min) min = y;
    if (y > max) max = y;
  }

  const maxValueY = end * MAX_SCALE_Y;

  return {
    min: Math.max(min, Math.min(-maxValueY, maxValueY)),
    max: Math.min(max, Math.max(-maxValueY, maxValueY)),
  };
};

export default getExtremumFunc;
