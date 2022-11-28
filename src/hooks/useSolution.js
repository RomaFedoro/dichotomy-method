import { useEffect, useRef, useState } from "react";
import convertInputData from "../units/convertInputData";
import findLocalMinimum from "../units/findLocalMinimum";
import findLocalMaximum from "../units/findLocalMaximum";
import drawGraph from "../units/drawGraph";

export const useSolution = (defaultValues, setSolutionVisible) => {
  const ref = useRef(null);
  const [params, setParams] = useState(defaultValues);
  const [result, setResult] = useState({});
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   if (!params) return;
  //   drawGraph(ref, params);
  // }, []);

  useEffect(() => {
    if (!params && params.func === undefined) return;

    const { start, end, precision, func, isMin } = params;

    let a = start;
    let b = end;
    drawGraph(ref, { ...params, a, b });

    setResult(() => ({ a, b }));

    const intr = setInterval(function () {
      if (Math.abs(b - a) < precision) {
        clearInterval(intr);
      }

      const result = (isMin ? findLocalMinimum : findLocalMaximum)({
        precision,
        func,
        a,
        b,
      });
      a = result.a;
      b = result.b;

      drawGraph(ref, { ...params, a, b });
      setResult(() => ({ a, b }));
      setTotal((prev) => prev + 1);
    }, 1000);

    return () => {
      // drawGraph(ref, { ...data, numberRectangles });
      setTotal(0);
      setResult({});
      clearInterval(intr);
    };
  }, [params]);

  const handleSubmit = (value) => {
    if (
      Object.keys({ ...params, ...value }).every(
        (key) => params[key] === value[key]
      )
    )
      return;
    setParams(convertInputData(value));
    setSolutionVisible(true);
  };

  return { total, params, result, ref, handleSubmit };
};

