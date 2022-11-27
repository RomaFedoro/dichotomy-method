import { useEffect, useRef, useState } from "react";
import convertInputData from "../units/convertInputData";
import drawGraph from "../units/drawGraph";
import getParamRectangles from "../units/getParamRectangles";

export const useParams = (defaultValues, setSolutionVisible) => {
  const ref = useRef(null);
  const [params, setParams] = useState(defaultValues);
  const [numberRectangles, setNumberRectangles] = useState(1);

  useEffect(() => {
    if (!params) return;
    drawGraph(ref, convertInputData(params));
  }, []);

  useEffect(() => {
    if (!params) return;
    const data = convertInputData(params);
    const { start, end, precision } = data;
    const { numberRectangles } = getParamRectangles(start, end, precision);
    let n = 1;

    const intr = setInterval(function () {
      setNumberRectangles(n);
      drawGraph(ref, { ...data, numberRectangles: n });
      n *= 2;
      if (n >= numberRectangles) clearInterval(intr);
    }, 500);

    return () => {
      drawGraph(ref, { ...data, numberRectangles });
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
    setParams(value);
    setSolutionVisible(true);
  };

  return { params, numberRectangles, ref, handleSubmit };
};
