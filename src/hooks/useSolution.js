import { useEffect, useRef, useState } from "react";
import convertInputData from "../units/convertInputData";
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
    if (!params) return;

    const { start, end, isMin } = params;
    setResult(() => ({ a: start, b: end }));

    // const intr = setInterval(function () {
    //   setNumberRectangles(n);
    //   drawGraph(ref, { ...data, numberRectangles: n });
    //   n *= 2;
    //   if (n >= numberRectangles) clearInterval(intr);
    // }, 500);

    // return () => {
    //   drawGraph(ref, { ...data, numberRectangles });
    //   clearInterval(intr);
    // };
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

