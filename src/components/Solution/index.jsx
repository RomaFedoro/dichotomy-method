import React from "react";
import convertInputData from "../../units/convertInputData";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import FUNCTIONS from "../../constants/func";
import Container from "../Container";
import styles from "./styles.module.css";

const Solution = ({ params }) => {
  const { start, end, precision, precisionCount, funcId, func, isNegative } =
    convertInputData(params);
  if (isNaN(start) || isNaN(end) || isNaN(precision)) return null;

  return (
    <Container label="Ответ" className={styles.math}>
      {/* <BlockMath>
        {`\\int_{\\text{${start}}}^{\\text{${end}}} ${
          FUNCTIONS[funcId].text
        }  dx ≈ {\\text{${result.toFixed(precisionCount)}}}`}
      </BlockMath> */}
    </Container>
  );
};

export default Solution;
